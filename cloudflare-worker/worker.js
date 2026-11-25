/**
 * d4e.ai First-Party Telemetry & DIAD Pilot Registration Worker
 * Bindings:
 *   DB: D1Database
 *   LOGOS_BUCKET: R2Bucket
 *   ADMIN_TOKEN: secret string
 *   FORMSPREE_ENDPOINT: optional secret/var string (e.g. https://formspree.io/f/mvgzepkj)
 */

const ALLOWED_ORIGINS = new Set([
  "https://d4e.ai",
  "https://www.d4e.ai",
  "https://diad.d4e.ai",
  "https://dataforentrepreneurs.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
]);

const ALLOWED_LOGO_MIMES = new Set([
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "image/webp",
]);

const MAX_TRACK_BYTES = 64 * 1024;
const MAX_LOGO_BYTES = 5 * 1024 * 1024;
const MAX_REGISTER_BODY_BYTES = 7.5 * 1024 * 1024;

function getCorsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const headers = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function jsonResponse(data, status, request, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getCorsHeaders(request),
      ...extraHeaders,
    },
  });
}

function safeJsonParse(raw, fallback) {
  if (!raw || typeof raw !== "string") return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function sha256Hex(input) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function constantTimeEquals(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const hashA = new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(a))
  );
  const hashB = new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(b))
  );
  let diff = a.length ^ b.length;
  for (let i = 0; i < hashA.length; i += 1) {
    diff |= hashA[i] ^ hashB[i];
  }
  return diff === 0;
}

async function requireAdminAuth(request, env) {
  if (!env.ADMIN_TOKEN) {
    return false;
  }
  const authHeader = request.headers.get("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.slice(7).trim();
  if (!token) return false;
  return constantTimeEquals(token, env.ADMIN_TOKEN);
}

function extractCfGeo(request) {
  const cf = request.cf || {};
  return {
    country: typeof cf.country === "string" ? cf.country : "",
    city: typeof cf.city === "string" ? cf.city : "",
    region: typeof cf.region === "string" ? cf.region : "",
  };
}

function toNum(val, fallback = 0) {
  const n = Number(val);
  return Number.isFinite(n) ? n : fallback;
}

function decodeBase64DataUrl(dataUrl) {
  const match = dataUrl.match(/^data:([^;]+);base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;
  const mime = match[1].toLowerCase().trim();
  if (!ALLOWED_LOGO_MIMES.has(mime)) {
    return { error: "Unsupported image format" };
  }
  const binStr = atob(match[2]);
  const len = binStr.length;
  if (len > MAX_LOGO_BYTES) {
    return { error: "Logo exceeds 5MB limit" };
  }
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binStr.charCodeAt(i);
  }
  return { mime, bytes, sizeBytes: len };
}

function mimeToExt(mime) {
  switch (mime) {
    case "image/png":
      return "png";
    case "image/jpeg":
      return "jpg";
    case "image/svg+xml":
      return "svg";
    case "image/webp":
      return "webp";
    default:
      return "bin";
  }
}

async function handleTrack(request, env) {
  const contentLen = Number(request.headers.get("Content-Length") || 0);
  if (contentLen > MAX_TRACK_BYTES) {
    return jsonResponse({ ok: false, error: "Payload too large" }, 413, request);
  }

  const rawText = await request.text();
  if (new TextEncoder().encode(rawText).length > MAX_TRACK_BYTES) {
    return jsonResponse({ ok: false, error: "Payload too large" }, 413, request);
  }

  const body = safeJsonParse(rawText, null);
  if (!body || typeof body !== "object") {
    return jsonResponse({ ok: false, error: "Invalid JSON" }, 400, request);
  }

  const eventName = String(body.event_name || "").slice(0, 100);
  const sessionId = String(body.session_id || "").slice(0, 128);
  const visitorId = String(body.visitor_id || "").slice(0, 128);
  if (!eventName || !sessionId || !visitorId) {
    return jsonResponse({ ok: false, error: "Missing required fields" }, 400, request);
  }

  const nowIso =
    typeof body.timestamp === "string" && body.timestamp.length <= 40
      ? body.timestamp
      : new Date().toISOString();
  const pagePath = String(body.page_path || "/").slice(0, 300);
  const params = body.params && typeof body.params === "object" ? body.params : {};
  const attr = body.attribution && typeof body.attribution === "object" ? body.attribution : {};
  const geo = extractCfGeo(request);

  const sectionName = String(
    params.section_name || params.last_section_seen || ""
  ).slice(0, 120);
  const activeSec = toNum(params.active_seconds, 0);
  const totalSec = toNum(params.total_seconds, 0);
  const idleSec = toNum(params.idle_seconds, 0);
  const scrollPct = Math.max(
    0,
    Math.min(100, Math.round(toNum(params.max_scroll_percent ?? params.scroll_percent, 0)))
  );

  // 1. Insert raw event row
  await env.DB.prepare(
    `INSERT INTO events
      (created_at, session_id, visitor_id, event_name, page_path, section_name, active_sec, total_sec, payload_json, country, city)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      nowIso,
      sessionId,
      visitorId,
      eventName,
      pagePath,
      sectionName,
      activeSec,
      totalSec,
      JSON.stringify(params),
      geo.country,
      geo.city
    )
    .run();

  // 2. Load existing session (if any) and merge cumulative stats
  const existing = await env.DB.prepare(
    `SELECT * FROM sessions WHERE session_id = ?`
  )
    .bind(sessionId)
    .first();

  const sectionsSet = new Set(
    safeJsonParse(existing?.sections_viewed_json, [])
  );
  if (eventName === "section_viewed" && params.section_name) {
    sectionsSet.add(String(params.section_name));
  }
  if (typeof params.sections_viewed === "string" && params.sections_viewed) {
    for (const sec of params.sections_viewed.split(",")) {
      if (sec.trim()) sectionsSet.add(sec.trim());
    }
  }

  // Track per-page stats inside pages_visited_json so multi-page totals sum accurately
  const pagesData = safeJsonParse(existing?.pages_visited_json, {});
  const pagesMap =
    Array.isArray(pagesData) || typeof pagesData !== "object" || !pagesData
      ? {}
      : pagesData;
  const prevPage = pagesMap[pagePath] || {
    stay_sec: 0,
    active_sec: 0,
    idle_sec: 0,
    max_scroll: 0,
    last_section: "",
  };

  pagesMap[pagePath] = {
    stay_sec: Math.max(toNum(prevPage.stay_sec, 0), totalSec),
    active_sec: Math.max(toNum(prevPage.active_sec, 0), activeSec),
    idle_sec: Math.max(toNum(prevPage.idle_sec, 0), idleSec),
    max_scroll: Math.max(toNum(prevPage.max_scroll, 0), scrollPct),
    last_section:
      String(params.last_section_seen || prevPage.last_section || "") || "",
  };

  let sumStay = 0;
  let sumActive = 0;
  let sumIdle = 0;
  let maxScroll = existing ? toNum(existing.max_scroll_percent, 0) : 0;
  for (const p of Object.values(pagesMap)) {
    sumStay += toNum(p.stay_sec, 0);
    sumActive += toNum(p.active_sec, 0);
    sumIdle += toNum(p.idle_sec, 0);
    maxScroll = Math.max(maxScroll, toNum(p.max_scroll, 0));
  }

  const videosMap = safeJsonParse(existing?.videos_watched_json, {});
  if (eventName.startsWith("video_") && params.video_id) {
    const vid = String(params.video_id);
    const prevVid = videosMap[vid] || {
      max_percent: 0,
      last_time_sec: 0,
      duration_sec: 0,
      chapters: [],
    };
    const nextPct = Math.max(
      toNum(prevVid.max_percent, 0),
      toNum(params.progress_percent ?? params.percent_watched, 0)
    );
    const chaptersSet = new Set(Array.isArray(prevVid.chapters) ? prevVid.chapters : []);
    if (params.chapter_title) chaptersSet.add(String(params.chapter_title));
    if (params.active_chapter) chaptersSet.add(String(params.active_chapter));

    videosMap[vid] = {
      max_percent: eventName === "video_ended" ? 100 : nextPct,
      last_time_sec: toNum(params.current_time_sec, toNum(prevVid.last_time_sec, 0)),
      duration_sec: Math.max(
        toNum(prevVid.duration_sec, 0),
        toNum(params.duration_sec, 0)
      ),
      chapters: Array.from(chaptersSet),
    };
  }

  const lastSectionSeen =
    String(params.last_section_seen || params.section_name || "") ||
    (existing?.last_section_seen || "");

  let modalOpened = existing ? toNum(existing.modal_opened, 0) : 0;
  let modalAbandonedField = existing?.modal_abandoned_field || null;
  let converted = existing ? toNum(existing.converted, 0) : 0;

  if (eventName === "pilot_modal_open") {
    modalOpened = 1;
  } else if (eventName === "pilot_modal_abandon") {
    modalOpened = 1;
    if (!converted) {
      modalAbandonedField = String(params.last_field_touched || "none");
    }
  } else if (eventName === "pilot_registration_submit") {
    modalOpened = 1;
    converted = 1;
    modalAbandonedField = null;
  }

  await env.DB.prepare(
    `INSERT INTO sessions (
      session_id, visitor_id, started_at, last_seen_at,
      landing_page, exit_page, referrer,
      utm_source, utm_medium, utm_campaign, ref_tag,
      country, city, region, timezone, device_type, viewport,
      total_stay_sec, total_active_sec, total_idle_sec,
      max_scroll_percent, last_section_seen,
      sections_viewed_json, pages_visited_json, videos_watched_json,
      modal_opened, modal_abandoned_field, converted,
      pilot_email, lead_name, lead_brand
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(session_id) DO UPDATE SET
      last_seen_at = excluded.last_seen_at,
      exit_page = excluded.exit_page,
      total_stay_sec = excluded.total_stay_sec,
      total_active_sec = excluded.total_active_sec,
      total_idle_sec = excluded.total_idle_sec,
      max_scroll_percent = excluded.max_scroll_percent,
      last_section_seen = COALESCE(NULLIF(excluded.last_section_seen, ''), sessions.last_section_seen),
      sections_viewed_json = excluded.sections_viewed_json,
      pages_visited_json = excluded.pages_visited_json,
      videos_watched_json = excluded.videos_watched_json,
      modal_opened = MAX(sessions.modal_opened, excluded.modal_opened),
      modal_abandoned_field = excluded.modal_abandoned_field,
      converted = MAX(sessions.converted, excluded.converted)`
  )
    .bind(
      sessionId,
      visitorId,
      existing?.started_at || nowIso,
      nowIso,
      existing?.landing_page || String(attr.landing_page || pagePath).slice(0, 300),
      pagePath,
      existing?.referrer || String(attr.referrer || "").slice(0, 500),
      existing?.utm_source || String(attr.utm_source || "").slice(0, 120),
      existing?.utm_medium || String(attr.utm_medium || "").slice(0, 120),
      existing?.utm_campaign || String(attr.utm_campaign || "").slice(0, 120),
      existing?.ref_tag || String(attr.ref || "").slice(0, 120),
      existing?.country || geo.country,
      existing?.city || geo.city,
      existing?.region || geo.region,
      existing?.timezone || String(attr.timezone || "").slice(0, 80),
      existing?.device_type || String(attr.device_type || "").slice(0, 40),
      existing?.viewport || String(attr.viewport || "").slice(0, 40),
      Math.round(sumStay * 10) / 10,
      Math.round(sumActive * 10) / 10,
      Math.round(sumIdle * 10) / 10,
      maxScroll,
      lastSectionSeen,
      JSON.stringify(Array.from(sectionsSet)),
      JSON.stringify(pagesMap),
      JSON.stringify(videosMap),
      modalOpened,
      modalAbandonedField,
      converted,
      existing?.pilot_email || null,
      existing?.lead_name || null,
      existing?.lead_brand || null
    )
    .run();

  return jsonResponse({ ok: true }, 200, request);
}

async function handlePilotRegister(request, env, ctx) {
  const contentLen = Number(request.headers.get("Content-Length") || 0);
  if (contentLen > MAX_REGISTER_BODY_BYTES) {
    return jsonResponse({ ok: false, error: "Payload too large" }, 413, request);
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return jsonResponse({ ok: false, error: "Invalid JSON" }, 400, request);
  }

  const fullName = String(body.fullName || "").trim().slice(0, 200);
  const brandName = String(body.brandName || "").trim().slice(0, 200);
  const workEmail = String(body.workEmail || "").trim().slice(0, 250);
  const storeUrl = String(body.storeUrl || "").trim().slice(0, 400);
  const consentAccepted = Boolean(body.consentAccepted);

  if (!fullName || !brandName || !workEmail || !storeUrl || !consentAccepted) {
    return jsonResponse(
      { ok: false, error: "Missing required registration fields" },
      400,
      request
    );
  }

  const regId = `reg_${crypto.randomUUID()}`;
  const createdAt =
    typeof body.registeredAt === "string" && body.registeredAt.length <= 40
      ? body.registeredAt
      : new Date().toISOString();
  const sessionId = String(body.sessionId || "").slice(0, 128);
  const visitorId = String(body.visitorId || "").slice(0, 128);
  const attr = body.attribution && typeof body.attribution === "object" ? body.attribution : {};
  const geo = extractCfGeo(request);

  let hasLogo = 0;
  let logoR2Key = null;
  let logoFilename = body.logoFileName ? String(body.logoFileName).slice(0, 200) : null;
  let logoMime = null;
  let logoSizeBytes = null;
  let logoSaved = false;

  if (typeof body.logoDataUrl === "string" && body.logoDataUrl.startsWith("data:")) {
    const decoded = decodeBase64DataUrl(body.logoDataUrl);
    if (!decoded || decoded.error) {
      return jsonResponse(
        { ok: false, error: decoded?.error || "Invalid logo data URL" },
        400,
        request
      );
    }

    const ext = mimeToExt(decoded.mime);
    const safeBrand = brandName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "brand";
    logoR2Key = `logos/${regId}-${safeBrand}.${ext}`;
    logoMime = decoded.mime;
    logoSizeBytes = decoded.sizeBytes;
    hasLogo = 1;

    if (env.LOGOS_BUCKET) {
      await env.LOGOS_BUCKET.put(logoR2Key, decoded.bytes, {
        httpMetadata: { contentType: decoded.mime },
        customMetadata: {
          brandName,
          workEmail,
          registrationId: regId,
        },
      });
      logoSaved = true;
    }
  }

  const clientIp = request.headers.get("CF-Connecting-IP") || "";
  const ipHash = clientIp ? await sha256Hex(clientIp) : "";
  const userAgent = (request.headers.get("User-Agent") || "").slice(0, 400);

  await env.DB.prepare(
    `INSERT INTO pilot_registrations (
      id, created_at, full_name, brand_name, work_email, store_url,
      has_logo, logo_r2_key, logo_filename, logo_mime, logo_size_bytes,
      consent_accepted, session_id, visitor_id, utm_json,
      referrer, landing_page, country, city, region, ip_hash, user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      regId,
      createdAt,
      fullName,
      brandName,
      workEmail,
      storeUrl,
      hasLogo,
      logoR2Key,
      logoFilename,
      logoMime,
      logoSizeBytes,
      consentAccepted ? 1 : 0,
      sessionId,
      visitorId,
      JSON.stringify(attr),
      String(attr.referrer || "").slice(0, 500),
      String(attr.landing_page || "").slice(0, 300),
      geo.country,
      geo.city,
      geo.region,
      ipHash,
      userAgent
    )
    .run();

  if (sessionId) {
    await env.DB.prepare(
      `INSERT INTO sessions (
        session_id, visitor_id, started_at, last_seen_at,
        landing_page, exit_page, referrer,
        utm_source, utm_medium, utm_campaign, ref_tag,
        country, city, region, timezone, device_type, viewport,
        modal_opened, modal_abandoned_field, converted,
        pilot_email, lead_name, lead_brand
      ) VALUES (?, ?, ?, ?, ?, '/diad', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NULL, 1, ?, ?, ?)
      ON CONFLICT(session_id) DO UPDATE SET
        last_seen_at = excluded.last_seen_at,
        modal_opened = 1,
        modal_abandoned_field = NULL,
        converted = 1,
        pilot_email = excluded.pilot_email,
        lead_name = excluded.lead_name,
        lead_brand = excluded.lead_brand`
    )
      .bind(
        sessionId,
        visitorId || `vis_${regId}`,
        createdAt,
        createdAt,
        String(attr.landing_page || "/diad").slice(0, 300),
        String(attr.referrer || "").slice(0, 500),
        String(attr.utm_source || "").slice(0, 120),
        String(attr.utm_medium || "").slice(0, 120),
        String(attr.utm_campaign || "").slice(0, 120),
        String(attr.ref || "").slice(0, 120),
        geo.country,
        geo.city,
        geo.region,
        String(attr.timezone || "").slice(0, 80),
        String(attr.device_type || "").slice(0, 40),
        String(attr.viewport || "").slice(0, 40),
        workEmail,
        fullName,
        brandName
      )
      .run();
  }

  if (env.FORMSPREE_ENDPOINT) {
    ctx.waitUntil(
      fetch(env.FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `New DIAD Pilot Registration: ${brandName}`,
          form_type: "diad_pilot_registration_worker",
          id: regId,
          fullName,
          brandName,
          workEmail,
          storeUrl,
          hasLogo: Boolean(hasLogo),
          logoR2Key: logoR2Key || "",
          country: geo.country,
          city: geo.city,
          registeredAt: createdAt,
        }),
      }).catch(() => {})
    );
  }

  return jsonResponse(
    { ok: true, id: regId, logoSaved, channel: "cloudflare" },
    200,
    request
  );
}

async function handleAdminData(request, env) {
  if (!(await requireAdminAuth(request, env))) {
    return jsonResponse({ ok: false, error: "Unauthorized" }, 401, request);
  }

  const registrationsRes = await env.DB.prepare(
    `SELECT * FROM pilot_registrations ORDER BY created_at DESC LIMIT 100`
  ).all();

  const sessionsRes = await env.DB.prepare(
    `SELECT * FROM sessions ORDER BY last_seen_at DESC LIMIT 100`
  ).all();

  const dropoffsRes = await env.DB.prepare(
    `SELECT last_section_seen, COUNT(*) as sessions_count,
            AVG(total_active_sec) as avg_active_sec,
            AVG(max_scroll_percent) as avg_scroll
     FROM sessions
     GROUP BY last_section_seen
     ORDER BY sessions_count DESC
     LIMIT 30`
  ).all();

  const modalAbandonsRes = await env.DB.prepare(
    `SELECT modal_abandoned_field, COUNT(*) as count
     FROM sessions
     WHERE modal_opened = 1 AND converted = 0
     GROUP BY modal_abandoned_field
     ORDER BY count DESC`
  ).all();

  const onboardingTabsRes = await env.DB.prepare(
    `SELECT section_name as tab_name,
            COUNT(*) as visits,
            AVG(active_sec) as avg_active_sec,
            MAX(active_sec) as max_active_sec,
            AVG(total_sec) as avg_total_sec
     FROM events
     WHERE event_name = 'onboarding_tab_leave'
     GROUP BY section_name
     ORDER BY avg_active_sec DESC`
  ).all();

  const onboardingStepsRes = await env.DB.prepare(
    `SELECT section_name as step_name,
            COUNT(*) as runs,
            SUM(CASE WHEN event_name = 'onboarding_pipeline_step_complete' THEN 1 ELSE 0 END) as successes,
            SUM(CASE WHEN event_name = 'onboarding_pipeline_step_error' THEN 1 ELSE 0 END) as errors,
            AVG(active_sec) as avg_exec_sec
     FROM events
     WHERE event_name IN ('onboarding_pipeline_step_complete', 'onboarding_pipeline_step_error')
     GROUP BY section_name
     ORDER BY section_name ASC`
  ).all();

  const summary = await env.DB.prepare(
    `SELECT
       COUNT(*) as total_sessions,
       COUNT(DISTINCT visitor_id) as unique_visitors,
       SUM(converted) as total_conversions,
       SUM(modal_opened) as total_modal_opens,
       AVG(total_active_sec) as avg_active_sec,
       AVG(total_stay_sec) as avg_stay_sec
     FROM sessions`
  ).first();

  return jsonResponse(
    {
      ok: true,
      summary: summary || {},
      registrations: registrationsRes.results || [],
      sessions: sessionsRes.results || [],
      dropoffs: dropoffsRes.results || [],
      modalAbandons: modalAbandonsRes.results || [],
      onboardingTabs: onboardingTabsRes.results || [],
      onboardingSteps: onboardingStepsRes.results || [],
    },
    200,
    request
  );
}

async function handleAdminSessionDetail(request, env, sessionId) {
  if (!(await requireAdminAuth(request, env))) {
    return jsonResponse({ ok: false, error: "Unauthorized" }, 401, request);
  }

  const session = await env.DB.prepare(
    `SELECT * FROM sessions WHERE session_id = ?`
  )
    .bind(sessionId)
    .first();

  if (!session) {
    return jsonResponse({ ok: false, error: "Session not found" }, 404, request);
  }

  const eventsRes = await env.DB.prepare(
    `SELECT id, created_at, event_name, page_path, section_name, active_sec, total_sec, payload_json
     FROM events
     WHERE session_id = ?
     ORDER BY id ASC
     LIMIT 500`
  )
    .bind(sessionId)
    .all();

  return jsonResponse(
    {
      ok: true,
      session,
      events: eventsRes.results || [],
    },
    200,
    request
  );
}

async function handleAdminLogo(request, env, encodedKey) {
  if (!(await requireAdminAuth(request, env))) {
    return jsonResponse({ ok: false, error: "Unauthorized" }, 401, request);
  }

  const key = decodeURIComponent(encodedKey);
  if (!key.startsWith("logos/") || key.includes("..")) {
    return jsonResponse({ ok: false, error: "Invalid logo key" }, 400, request);
  }

  const obj = await env.LOGOS_BUCKET.get(key);
  if (!obj) {
    return jsonResponse({ ok: false, error: "Logo not found" }, 404, request);
  }

  const contentType =
    obj.httpMetadata?.contentType || "application/octet-stream";

  return new Response(obj.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "sandbox",
      "Cache-Control": "private, no-store",
      ...getCorsHeaders(request),
    },
  });
}

function renderAdminHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>d4e.ai Analytics & Pilot Registrations</title>
  <style>
    :root {
      --bg: #070b14;
      --card: #101727;
      --border: rgba(102, 252, 241, 0.22);
      --cyan: #66fcf1;
      --purple: #a855f7;
      --text: #f8fafc;
      --muted: #94a3b8;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, system-ui, -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 24px;
    }
    .container { max-width: 1280px; margin: 0 auto; }
    h1, h2, h3 { margin: 0 0 12px; }
    .header {
      display: flex; flex-wrap: wrap; justify-content: space-between;
      align-items: center; gap: 16px; margin-bottom: 24px;
      padding-bottom: 16px; border-bottom: 1px solid var(--border);
    }
    .badge {
      display: inline-block; padding: 4px 10px; border-radius: 999px;
      background: rgba(102, 252, 241, 0.12); color: var(--cyan);
      font-size: 12px; font-weight: 600;
    }
    .card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 14px; padding: 18px; margin-bottom: 20px;
    }
    .grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 14px; margin-bottom: 20px;
    }
    .stat-label { font-size: 12px; color: var(--muted); text-transform: uppercase; }
    .stat-val { font-size: 26px; font-weight: 800; color: var(--cyan); margin-top: 6px; }
    input, button {
      font: inherit; border-radius: 8px; padding: 9px 14px;
      border: 1px solid var(--border); background: #0b1120; color: var(--text);
    }
    button {
      background: var(--cyan); color: #070b14; font-weight: 700; cursor: pointer; border: none;
    }
    button.secondary { background: #1e293b; color: var(--text); border: 1px solid var(--border); }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td {
      text-align: left; padding: 10px 8px;
      border-bottom: 1px solid rgba(255,255,255,0.07); vertical-align: top;
    }
    th { color: var(--muted); font-size: 11px; text-transform: uppercase; }
    .scroll-x { overflow-x: auto; }
    .logo-thumb { width: 42px; height: 42px; object-fit: contain; background: #070b14; border-radius: 6px; padding: 3px; }
    .mono { font-family: ui-monospace, SFMono-Regular, monospace; font-size: 12px; }
    .modal-bg {
      position: fixed; inset: 0; background: rgba(0,0,0,0.75); display: none;
      align-items: center; justify-content: center; padding: 20px; z-index: 50;
    }
    .modal-box {
      background: var(--card); border: 1px solid var(--border); border-radius: 14px;
      max-width: 900px; width: 100%; max-height: 85vh; overflow-y: auto; padding: 20px;
    }
    .error { color: #fda4af; font-size: 13px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <span class="badge">d4e.ai Telemetry &amp; Pilot CRM</span>
        <h1>Visitor Intelligence &amp; Logo Capture Dashboard</h1>
      </div>
      <div id="auth-controls" style="display:flex; gap:8px; align-items:center;">
        <input id="token-input" type="password" placeholder="Enter ADMIN_TOKEN" />
        <button onclick="loadDashboard()">Unlock</button>
        <button class="secondary" onclick="logout()">Lock</button>
      </div>
    </div>
    <div id="err-box" class="error"></div>
    <div id="app" style="display:none;">
      <div class="grid" id="summary-grid"></div>

      <div class="card">
        <h2>DIAD Pilot Registrations &amp; Submitted Logos</h2>
        <div class="scroll-x">
          <table>
            <thead>
              <tr>
                <th>Date</th><th>Name</th><th>Brand</th><th>Email</th>
                <th>Store URL</th><th>Logo</th><th>Geo</th><th>Source</th>
              </tr>
            </thead>
            <tbody id="reg-tbody"></tbody>
          </table>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 16px;">
        <div class="card">
          <h3>Drop-Off by Last Section Seen</h3>
          <div class="scroll-x">
            <table>
              <thead><tr><th>Last Section</th><th>Sessions</th><th>Avg Active (s)</th><th>Avg Scroll %</th></tr></thead>
              <tbody id="drop-tbody"></tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <h3>Pilot Modal Abandonment by Last Field</h3>
          <div class="scroll-x">
            <table>
              <thead><tr><th>Last Field Touched</th><th>Abandoned Count</th></tr></thead>
              <tbody id="abandon-tbody"></tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Onboarding Dashboard Bottlenecks (Tabs 1–6 &amp; Pipeline Steps 1–8)</h2>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 16px;">
          <div class="scroll-x">
            <table>
              <thead><tr><th>Onboarding Tab (Slowest First)</th><th>Visits</th><th>Avg Active</th><th>Max Active</th><th>Avg Total</th></tr></thead>
              <tbody id="ob-tabs-tbody"></tbody>
            </table>
          </div>
          <div class="scroll-x">
            <table>
              <thead><tr><th>Pipeline Step</th><th>Runs</th><th>Success</th><th>Errors</th><th>Avg Exec</th></tr></thead>
              <tbody id="ob-steps-tbody"></tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Recent Visitor Sessions (Click Timeline to Inspect)</h2>
        <div class="scroll-x">
          <table>
            <thead>
              <tr>
                <th>Last Seen</th><th>Lead / Geo</th><th>Landing -&gt; Exit</th>
                <th>Active / Stay</th><th>Max Scroll</th><th>Last Section</th>
                <th>Modal</th><th>Timeline</th>
              </tr>
            </thead>
            <tbody id="ses-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div id="timeline-modal" class="modal-bg" onclick="if(event.target===this)this.style.display='none'">
    <div class="modal-box">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 id="modal-title">Session Timeline</h3>
        <button class="secondary" onclick="document.getElementById('timeline-modal').style.display='none'">Close</button>
      </div>
      <div id="modal-body" class="scroll-x"></div>
    </div>
  </div>

  <script>
    const TOKEN_KEY = "d4e_admin_token";
    const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

    function getToken() {
      const input = document.getElementById("token-input").value.trim();
      if (input) {
        sessionStorage.setItem(TOKEN_KEY, input);
        return input;
      }
      return sessionStorage.getItem(TOKEN_KEY) || "";
    }

    function logout() {
      sessionStorage.removeItem(TOKEN_KEY);
      document.getElementById("token-input").value = "";
      document.getElementById("app").style.display = "none";
    }

    async function fetchLogoPreview(key, imgId) {
      try {
        const res = await fetch("/api/admin/logo/" + encodeURIComponent(key), {
          headers: { Authorization: "Bearer " + getToken() }
        });
        if (!res.ok) return;
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const img = document.getElementById(imgId);
        if (img) img.src = url;
      } catch {}
    }

    async function downloadLogo(key, filename) {
      const res = await fetch("/api/admin/logo/" + encodeURIComponent(key), {
        headers: { Authorization: "Bearer " + getToken() }
      });
      if (!res.ok) return alert("Failed to download logo");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || key.split("/").pop() || "logo";
      a.click();
      URL.revokeObjectURL(url);
    }

    async function viewTimeline(sessionId) {
      const res = await fetch("/api/admin/session/" + encodeURIComponent(sessionId), {
        headers: { Authorization: "Bearer " + getToken() }
      });
      if (!res.ok) return alert("Unable to load session");
      const data = await res.json();
      document.getElementById("modal-title").textContent = "Session: " + sessionId;
      const rows = (data.events || []).map((ev) =>
        "<tr><td class='mono'>" + esc(ev.created_at) + "</td>" +
        "<td class='mono'>" + esc(ev.event_name) + "</td>" +
        "<td class='mono'>" + esc(ev.page_path) + "</td>" +
        "<td>" + esc(ev.section_name) + "</td>" +
        "<td class='mono'>" + esc(ev.active_sec) + "s / " + esc(ev.total_sec) + "s</td>" +
        "<td class='mono'>" + esc(ev.payload_json) + "</td></tr>"
      ).join("");
      document.getElementById("modal-body").innerHTML =
        "<table><thead><tr><th>Time</th><th>Event</th><th>Page</th><th>Section</th><th>Active/Total</th><th>Payload</th></tr></thead><tbody>" + rows + "</tbody></table>";
      document.getElementById("timeline-modal").style.display = "flex";
    }

    async function loadDashboard() {
      const errBox = document.getElementById("err-box");
      errBox.textContent = "";
      const token = getToken();
      if (!token) {
        errBox.textContent = "Please enter your ADMIN_TOKEN.";
        return;
      }
      const res = await fetch("/api/admin/data", {
        headers: { Authorization: "Bearer " + token }
      });
      if (!res.ok) {
        errBox.textContent = "Authentication failed (HTTP " + res.status + ").";
        return;
      }
      const data = await res.json();
      document.getElementById("app").style.display = "block";
      const s = data.summary || {};
      const avgMin = ((Number(s.avg_active_sec || 0)) / 60).toFixed(1);
      const stats = [
        ["Total Sessions", s.total_sessions || 0],
        ["Unique Visitors", s.unique_visitors || 0],
        ["Pilot Signups", s.total_conversions || 0],
        ["Modal Opens", s.total_modal_opens || 0],
        ["Avg Active Time", avgMin + " min"],
      ];
      document.getElementById("summary-grid").innerHTML = stats.map(([k, v]) =>
        "<div class='card' style='margin:0;'><div class='stat-label'>" + esc(k) + "</div><div class='stat-val'>" + esc(v) + "</div></div>"
      ).join("");

      const regs = data.registrations || [];
      document.getElementById("reg-tbody").innerHTML = regs.map((r, idx) => {
        const imgId = "logo-img-" + idx;
        const logoCell = r.logo_r2_key
          ? "<div style='display:flex;align-items:center;gap:8px;'><img id='" + imgId + "' class='logo-thumb' alt='Logo'/><button class='secondary' onclick=\\"downloadLogo('" + esc(r.logo_r2_key) + "','" + esc(r.logo_filename || "") + "')\\">Save</button></div>"
          : (r.has_logo ? "Metadata only" : "None");
        return "<tr><td class='mono'>" + esc(r.created_at) + "</td>" +
          "<td>" + esc(r.full_name) + "</td>" +
          "<td><strong>" + esc(r.brand_name) + "</strong></td>" +
          "<td class='mono'>" + esc(r.work_email) + "</td>" +
          "<td class='mono'>" + esc(r.store_url) + "</td>" +
          "<td>" + logoCell + "</td>" +
          "<td>" + esc([r.city, r.country].filter(Boolean).join(", ")) + "</td>" +
          "<td class='mono'>" + esc(r.landing_page) + "</td></tr>";
      }).join("") || "<tr><td colspan='8'>No pilot registrations yet.</td></tr>";

      regs.forEach((r, idx) => {
        if (r.logo_r2_key) fetchLogoPreview(r.logo_r2_key, "logo-img-" + idx);
      });

      document.getElementById("drop-tbody").innerHTML = (data.dropoffs || []).map((d) =>
        "<tr><td class='mono'>" + esc(d.last_section_seen || "unknown") + "</td>" +
        "<td>" + esc(d.sessions_count) + "</td>" +
        "<td>" + Math.round(Number(d.avg_active_sec || 0)) + "s</td>" +
        "<td>" + Math.round(Number(d.avg_scroll || 0)) + "%</td></tr>"
      ).join("") || "<tr><td colspan='4'>No data yet.</td></tr>";

      document.getElementById("abandon-tbody").innerHTML = (data.modalAbandons || []).map((a) =>
        "<tr><td class='mono'>" + esc(a.modal_abandoned_field || "none") + "</td><td>" + esc(a.count) + "</td></tr>"
      ).join("") || "<tr><td colspan='2'>No abandons yet.</td></tr>";

      document.getElementById("ob-tabs-tbody").innerHTML = (data.onboardingTabs || []).map((t) =>
        "<tr><td class='mono'>" + esc(t.tab_name || "unknown") + "</td>" +
        "<td>" + esc(t.visits) + "</td>" +
        "<td>" + Math.round(Number(t.avg_active_sec || 0)) + "s</td>" +
        "<td>" + Math.round(Number(t.max_active_sec || 0)) + "s</td>" +
        "<td>" + Math.round(Number(t.avg_total_sec || 0)) + "s</td></tr>"
      ).join("") || "<tr><td colspan='5'>No onboarding tab metrics yet.</td></tr>";

      document.getElementById("ob-steps-tbody").innerHTML = (data.onboardingSteps || []).map((st) =>
        "<tr><td class='mono'>" + esc(st.step_name || "unknown") + "</td>" +
        "<td>" + esc(st.runs) + "</td>" +
        "<td>" + esc(st.successes) + "</td>" +
        "<td>" + esc(st.errors) + "</td>" +
        "<td>" + Math.round(Number(st.avg_exec_sec || 0)) + "s</td></tr>"
      ).join("") || "<tr><td colspan='5'>No pipeline step metrics yet.</td></tr>";

      document.getElementById("ses-tbody").innerHTML = (data.sessions || []).map((ses) => {
        const leadInfo = ses.lead_brand ? (ses.lead_name + " (" + ses.lead_brand + ")") : "Anon";
        const geo = [ses.city, ses.country].filter(Boolean).join(", ");
        const modalStatus = ses.converted ? "Converted" : (ses.modal_opened ? ("Abandoned: " + (ses.modal_abandoned_field || "none")) : "No");
        return "<tr><td class='mono'>" + esc(ses.last_seen_at) + "</td>" +
          "<td><div>" + esc(leadInfo) + "</div><div class='mono' style='color:#94a3b8;'>" + esc(geo) + " • " + esc(ses.device_type) + "</div></td>" +
          "<td class='mono'>" + esc(ses.landing_page) + " -&gt; " + esc(ses.exit_page) + "</td>" +
          "<td class='mono'>" + Math.round(Number(ses.total_active_sec || 0)) + "s / " + Math.round(Number(ses.total_stay_sec || 0)) + "s</td>" +
          "<td>" + esc(ses.max_scroll_percent) + "%</td>" +
          "<td class='mono'>" + esc(ses.last_section_seen || "-") + "</td>" +
          "<td>" + esc(modalStatus) + "</td>" +
          "<td><button class='secondary' onclick=\\"viewTimeline('" + esc(ses.session_id) + "')\\">View</button></td></tr>";
      }).join("") || "<tr><td colspan='8'>No sessions recorded yet.</td></tr>";
    }

    if (sessionStorage.getItem(TOKEN_KEY)) {
      loadDashboard();
    }
  </script>
</body>
</html>`;
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: getCorsHeaders(request) });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (request.method === "POST" && path === "/api/track") {
        return await handleTrack(request, env);
      }

      if (request.method === "POST" && path === "/api/pilot-register") {
        return await handlePilotRegister(request, env, ctx);
      }

      if (request.method === "GET" && path === "/api/admin") {
        return new Response(renderAdminHtml(), {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
          },
        });
      }

      if (request.method === "GET" && path === "/api/admin/data") {
        return await handleAdminData(request, env);
      }

      if (request.method === "GET" && path.startsWith("/api/admin/session/")) {
        const sessionId = decodeURIComponent(path.slice("/api/admin/session/".length));
        return await handleAdminSessionDetail(request, env, sessionId);
      }

      if (request.method === "GET" && path.startsWith("/api/admin/logo/")) {
        const encodedKey = path.slice("/api/admin/logo/".length);
        return await handleAdminLogo(request, env, encodedKey);
      }

      return jsonResponse({ ok: false, error: "Not found" }, 404, request);
    } catch (err) {
      return jsonResponse(
        { ok: false, error: err instanceof Error ? err.message : "Internal error" },
        500,
        request
      );
    }
  },
};

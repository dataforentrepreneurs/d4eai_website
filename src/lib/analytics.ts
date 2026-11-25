export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-X4DDFJ95FQ";

export const CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "zj4jinms23";

export const TELEMETRY_ENDPOINT =
  process.env.NEXT_PUBLIC_TELEMETRY_ENDPOINT || "/api/track";

export const PILOT_REGISTER_ENDPOINT =
  process.env.NEXT_PUBLIC_PILOT_REGISTER_ENDPOINT || "/api/pilot-register";

export const FORMSPREE_FALLBACK_ENDPOINT = "https://formspree.io/f/mvgzepkj";

export interface YTPlayer {
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy?: () => void;
}

export interface YTPlayerEvent {
  target: YTPlayer;
}

export interface YTOnStateChangeEvent {
  target: YTPlayer;
  data: number;
}

export interface YTNamespace {
  Player: new (
    elementId: string,
    options: {
      events?: {
        onReady?: (event: YTPlayerEvent) => void;
        onStateChange?: (event: YTOnStateChangeEvent) => void;
      };
    }
  ) => YTPlayer;
  PlayerState?: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export type DeviceType = "mobile" | "tablet" | "desktop";

export interface AttributionData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  ref: string;
  gclid: string;
  fbclid: string;
  li_fat_id: string;
  referrer: string;
  landing_page: string;
  device_type: DeviceType;
  viewport: string;
  timezone: string;
  language: string;
}

export type EventParamValue = string | number | boolean | undefined;
export type EventParams = Record<string, EventParamValue>;

export interface TrackEventOptions {
  beacon?: boolean;
  skipFirstParty?: boolean;
}

export interface PilotRegistrationPayload {
  fullName: string;
  brandName: string;
  workEmail: string;
  storeUrl: string;
  logoDataUrl?: string;
  logoFileName?: string;
  logoMimeType?: string;
  consentAccepted: boolean;
  registeredAt: string;
  triggerSource?: string;
}

export interface PilotRegistrationResult {
  ok: boolean;
  channel: "cloudflare" | "formspree" | "local_only";
  logoSaved: boolean;
}

const VISITOR_KEY = "d4e_visitor_id";
const SESSION_KEY = "d4e_session_id";
const ATTRIBUTION_KEY = "d4e_attribution";
const FIRST_TOUCH_KEY = "d4e_first_touch";

const PII_BLOCKED_KEYS = new Set([
  "email",
  "workemail",
  "work_email",
  "fullname",
  "full_name",
  "logodataurl",
  "logo_data_url",
  "phone",
  "message",
  "contact_name",
  "user_name",
]);

const CLARITY_EVENT_PREFIXES = [
  "pilot_",
  "video_",
  "contact_",
  "installer_",
  "cost_calculator_",
  "chatbot_preview_",
  "trust_center_",
  "rage_click",
];

const CLARITY_KEY_EVENTS = new Set([
  "cta_click",
  "outbound_click",
  "file_download",
  "scroll_milestone",
  "section_viewed",
  "api_snippet_copied",
  "diad_ps_command_copy",
  "resources_filter_select",
  "book_toc_toggle",
  "book_store_click",
]);

const activeVideos = new Set<string>();
let pageVideoWatchSec = 0;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function generateId(prefix: string): string {
  if (isBrowser() && typeof window.crypto?.randomUUID === "function") {
    return `${prefix}_${window.crypto.randomUUID()}`;
  }
  const rand = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}_${rand}`;
}

export function getVisitorId(): string {
  if (!isBrowser()) return "srv_visitor";
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const created = generateId("vis");
    window.localStorage.setItem(VISITOR_KEY, created);
    return created;
  } catch {
    return generateId("vis");
  }
}

export function getSessionId(): string {
  if (!isBrowser()) return "srv_session";
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const created = generateId("ses");
    window.sessionStorage.setItem(SESSION_KEY, created);
    return created;
  } catch {
    return generateId("ses");
  }
}

function detectDeviceType(): DeviceType {
  if (!isBrowser()) return "desktop";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export function getOrCaptureAttribution(): AttributionData {
  const empty: AttributionData = {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    ref: "",
    gclid: "",
    fbclid: "",
    li_fat_id: "",
    referrer: "",
    landing_page: "/",
    device_type: "desktop",
    viewport: "",
    timezone: "",
    language: "",
  };

  if (!isBrowser()) return empty;

  try {
    const cached = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (cached) {
      return JSON.parse(cached) as AttributionData;
    }
  } catch {
    // Ignore storage access errors
  }

  const searchParams = new URLSearchParams(window.location.search);
  let timezone = "";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    timezone = "";
  }

  const captured: AttributionData = {
    utm_source: searchParams.get("utm_source") || "",
    utm_medium: searchParams.get("utm_medium") || "",
    utm_campaign: searchParams.get("utm_campaign") || "",
    utm_term: searchParams.get("utm_term") || "",
    utm_content: searchParams.get("utm_content") || "",
    ref: searchParams.get("ref") || "",
    gclid: searchParams.get("gclid") || "",
    fbclid: searchParams.get("fbclid") || "",
    li_fat_id: searchParams.get("li_fat_id") || "",
    referrer: document.referrer || "",
    landing_page: `${window.location.pathname}${window.location.search}`,
    device_type: detectDeviceType(),
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    timezone,
    language: navigator.language || "",
  };

  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(captured));
    if (!window.localStorage.getItem(FIRST_TOUCH_KEY)) {
      window.localStorage.setItem(
        FIRST_TOUCH_KEY,
        JSON.stringify({ ...captured, first_seen_at: new Date().toISOString() })
      );
    }
  } catch {
    // Ignore storage access errors
  }

  return captured;
}

export function setVideoPlayingState(videoId: string, isPlaying: boolean): void {
  if (isPlaying) {
    activeVideos.add(videoId);
  } else {
    activeVideos.delete(videoId);
  }
}

export function hasActiveVideoPlaying(): boolean {
  return activeVideos.size > 0;
}

export function addVideoWatchSeconds(seconds: number): void {
  if (Number.isFinite(seconds) && seconds > 0) {
    pageVideoWatchSec += seconds;
  }
}

export function getPageVideoWatchSeconds(): number {
  return Math.round(pageVideoWatchSec * 10) / 10;
}

export function consumePageVideoWatchSeconds(): number {
  const value = getPageVideoWatchSeconds();
  pageVideoWatchSec = 0;
  activeVideos.clear();
  return value;
}

function cleanParams(
  params?: EventParams
): Record<string, string | number | boolean> {
  const cleaned: Record<string, string | number | boolean> = {};
  if (!params) return cleaned;
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

function stripPiiForGa(
  params: Record<string, string | number | boolean>
): Record<string, string | number | boolean> {
  const safe: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (PII_BLOCKED_KEYS.has(key.toLowerCase())) {
      continue;
    }
    safe[key] = value;
  }
  return safe;
}

function shouldForwardToClarity(eventName: string): boolean {
  if (CLARITY_KEY_EVENTS.has(eventName)) return true;
  return CLARITY_EVENT_PREFIXES.some((prefix) => eventName.startsWith(prefix));
}

function sendToFirstParty(
  payload: Record<string, unknown>,
  useBeacon: boolean
): void {
  if (!isBrowser()) return;
  const body = JSON.stringify(payload);

  try {
    if (useBeacon && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      const sent = navigator.sendBeacon(TELEMETRY_ENDPOINT, blob);
      if (sent) return;
    }

    void fetch(TELEMETRY_ENDPOINT, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body,
    }).catch(() => {
      // Silently ignore network or undeployed endpoint errors
    });
  } catch {
    // Never interrupt user experience
  }
}

export function trackEvent(
  eventName: string,
  params?: EventParams,
  options?: TrackEventOptions
): void {
  if (!isBrowser()) return;

  const cleaned = cleanParams(params);
  const gaSafeParams = stripPiiForGa(cleaned);

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        ...gaSafeParams,
        ...(options?.beacon ? { transport_type: "beacon" } : {}),
      });
    }
  } catch {
    // Ignore gtag failure
  }

  try {
    if (
      typeof window.clarity === "function" &&
      shouldForwardToClarity(eventName)
    ) {
      window.clarity("event", eventName);
    }
  } catch {
    // Ignore Clarity failure
  }

  if (options?.skipFirstParty) return;

  const attribution = getOrCaptureAttribution();
  sendToFirstParty(
    {
      event_name: eventName,
      session_id: getSessionId(),
      visitor_id: getVisitorId(),
      page_path: window.location.pathname,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
      attribution,
      params: cleaned,
    },
    Boolean(options?.beacon)
  );
}

export function trackPageView(pagePath: string): void {
  if (!isBrowser()) return;

  const attribution = getOrCaptureAttribution();
  const pageTitle = document.title || "Data for Entrepreneurs";

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_title: pageTitle,
        page_path: pagePath,
        page_location: window.location.href,
        utm_source: attribution.utm_source || undefined,
        utm_medium: attribution.utm_medium || undefined,
        utm_campaign: attribution.utm_campaign || undefined,
        ref_tag: attribution.ref || undefined,
        device_type: attribution.device_type,
      });
    }
  } catch {
    // Ignore gtag failure
  }

  sendToFirstParty(
    {
      event_name: "page_view",
      session_id: getSessionId(),
      visitor_id: getVisitorId(),
      page_path: pagePath,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
      attribution,
      params: {
        page_title: pageTitle,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        ref_tag: attribution.ref,
        device_type: attribution.device_type,
        referrer: attribution.referrer,
      },
    },
    false
  );
}

export async function submitPilotRegistration(
  payload: PilotRegistrationPayload
): Promise<PilotRegistrationResult> {
  if (!isBrowser()) {
    return { ok: false, channel: "local_only", logoSaved: false };
  }

  const attribution = getOrCaptureAttribution();
  const sessionId = getSessionId();
  const visitorId = getVisitorId();
  const pageUrl = window.location.href;

  // 1. Primary capture: Cloudflare Worker (/api/pilot-register) -> D1 + R2 Logo Bucket
  try {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4500);
    const res = await fetch(PILOT_REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...payload,
        sessionId,
        visitorId,
        attribution,
        pageUrl,
      }),
      signal: controller.signal,
    });
    window.clearTimeout(timeoutId);

    const contentType = res.headers.get("content-type") || "";
    if (res.ok && contentType.includes("application/json")) {
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; logoSaved?: boolean }
        | null;
      if (data && data.ok !== false) {
        return {
          ok: true,
          channel: "cloudflare",
          logoSaved: Boolean(data.logoSaved ?? payload.logoDataUrl),
        };
      }
    }
  } catch {
    // Fall back cleanly to Formspree
  }

  // 2. Automatic fallback: Formspree email alert with text registration details
  try {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4000);
    const res = await fetch(FORMSPREE_FALLBACK_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _subject: `New DIAD Pilot Registration: ${payload.brandName}`,
        form_type: "diad_pilot_registration",
        fullName: payload.fullName,
        brandName: payload.brandName,
        workEmail: payload.workEmail,
        storeUrl: payload.storeUrl,
        hasLogo: Boolean(payload.logoDataUrl),
        logoFileName: payload.logoFileName || "",
        consentAccepted: payload.consentAccepted,
        registeredAt: payload.registeredAt,
        triggerSource: payload.triggerSource || "",
        sessionId,
        visitorId,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        ref: attribution.ref,
        referrer: attribution.referrer,
      }),
      signal: controller.signal,
    });
    window.clearTimeout(timeoutId);

    if (res.ok) {
      return { ok: true, channel: "formspree", logoSaved: false };
    }
  } catch {
    // Continue even if offline or blocked
  }

  return { ok: false, channel: "local_only", logoSaved: false };
}

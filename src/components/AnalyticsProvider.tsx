"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  getPageVideoWatchSeconds,
  consumePageVideoWatchSeconds,
  hasActiveVideoPlaying,
  trackEvent,
  trackPageView,
} from "@/lib/analytics";

const SCROLL_MILESTONES = [10, 25, 50, 75, 90, 100] as const;
const FIXED_HEARTBEATS = [15, 30, 60, 120, 180, 300] as const;
const ACTIVE_WINDOW_MS = 30_000;

interface PageSessionMetrics {
  pagePath: string;
  startedAt: number;
  totalSeconds: number;
  visibleSeconds: number;
  activeSeconds: number;
  lastInteractionAt: number;
  maxScrollPercent: number;
  firedScrollMilestones: Set<number>;
  firedHeartbeats: Set<number>;
  sectionsViewed: string[];
  sectionsViewedSet: Set<string>;
  sectionDwellSec: Record<string, number>;
  visibleSections: Set<string>;
  lastSectionSeen: string;
  interactionsCount: number;
  flushedForCurrentPage: boolean;
}

function createInitialMetrics(pagePath: string): PageSessionMetrics {
  return {
    pagePath,
    startedAt: Date.now(),
    totalSeconds: 0,
    visibleSeconds: 0,
    activeSeconds: 0,
    lastInteractionAt: Date.now(),
    maxScrollPercent: 0,
    firedScrollMilestones: new Set<number>(),
    firedHeartbeats: new Set<number>(),
    sectionsViewed: [],
    sectionsViewedSet: new Set<string>(),
    sectionDwellSec: {},
    visibleSections: new Set<string>(),
    lastSectionSeen: "",
    interactionsCount: 0,
    flushedForCurrentPage: false,
  };
}

function computeScrollPercent(): number {
  const doc = document.documentElement;
  const body = document.body;
  const scrollTop =
    window.scrollY || doc.scrollTop || (body ? body.scrollTop : 0) || 0;
  const scrollHeight = Math.max(
    doc.scrollHeight,
    body ? body.scrollHeight : 0
  );
  const clientHeight = doc.clientHeight || window.innerHeight;
  const maxScrollable = scrollHeight - clientHeight;
  if (maxScrollable <= 0) return 100;
  const pct = Math.round(((scrollTop + clientHeight) / scrollHeight) * 100);
  return Math.max(0, Math.min(100, pct));
}

function findSectionName(el: Element | null): string {
  const sectionEl = el?.closest("[data-track-section]");
  return sectionEl?.getAttribute("data-track-section") || "";
}

function isHeartbeatSecond(sec: number): boolean {
  if ((FIXED_HEARTBEATS as readonly number[]).includes(sec)) {
    return true;
  }
  return sec > 300 && sec <= 3600 && sec % 60 === 0;
}

export default function AnalyticsProvider() {
  const pathname = usePathname() || "/";
  const metricsRef = useRef<PageSessionMetrics>(createInitialMetrics(pathname));
  const rageTrackerRef = useRef<{
    target: EventTarget | null;
    timestamps: number[];
  }>({ target: null, timestamps: [] });

  useEffect(() => {
    const currentPath = pathname || window.location.pathname || "/";
    const metrics = createInitialMetrics(currentPath);
    metricsRef.current = metrics;

    // Fire page view for SPA navigation and initial load
    trackPageView(currentPath);

    // Helper to resolve lowest visible section in DOM order
    const updateLastVisibleSection = () => {
      if (metrics.visibleSections.size === 0) return;
      const allSections = Array.from(
        document.querySelectorAll("[data-track-section]")
      );
      let candidate = "";
      for (const el of allSections) {
        const name = el.getAttribute("data-track-section");
        if (name && metrics.visibleSections.has(name)) {
          if ((metrics.sectionDwellSec[name] || 0) >= 1) {
            candidate = name;
          }
        }
      }
      if (candidate) {
        metrics.lastSectionSeen = candidate;
      }
    };

    const flushPageSummary = (resetVideoCounter: boolean) => {
      if (metrics.flushedForCurrentPage) return;
      metrics.flushedForCurrentPage = true;

      const totalSec = metrics.totalSeconds;
      const activeSec = metrics.activeSeconds;
      const visibleSec = metrics.visibleSeconds;
      const idleSec = Math.max(0, visibleSec - activeSec);
      const videoWatchSec = resetVideoCounter
        ? consumePageVideoWatchSeconds()
        : getPageVideoWatchSeconds();

      trackEvent(
        "page_engagement_summary",
        {
          page_path: metrics.pagePath,
          total_seconds: totalSec,
          active_seconds: activeSec,
          visible_seconds: visibleSec,
          idle_seconds: idleSec,
          active_minutes: Math.round((activeSec / 60) * 100) / 100,
          total_minutes: Math.round((totalSec / 60) * 100) / 100,
          max_scroll_percent: metrics.maxScrollPercent,
          sections_viewed_count: metrics.sectionsViewed.length,
          sections_viewed: metrics.sectionsViewed.join(","),
          last_section_seen: metrics.lastSectionSeen || "top_of_page",
          section_dwell_json: JSON.stringify(metrics.sectionDwellSec),
          interactions_count: metrics.interactionsCount,
          video_watch_seconds: videoWatchSec,
        },
        { beacon: true }
      );
    };

    // 1. 1-second active vs total stay timer
    const intervalId = window.setInterval(() => {
      metrics.totalSeconds += 1;

      if (document.visibilityState === "visible") {
        metrics.visibleSeconds += 1;

        for (const sectionName of metrics.visibleSections) {
          metrics.sectionDwellSec[sectionName] =
            (metrics.sectionDwellSec[sectionName] || 0) + 1;
        }
        updateLastVisibleSection();

        const recentlyInteracted =
          Date.now() - metrics.lastInteractionAt <= ACTIVE_WINDOW_MS;
        if (recentlyInteracted || hasActiveVideoPlaying()) {
          metrics.activeSeconds += 1;
        }

        const sec = metrics.activeSeconds;
        if (isHeartbeatSecond(sec) && !metrics.firedHeartbeats.has(sec)) {
          metrics.firedHeartbeats.add(sec);
          const idleSec = Math.max(0, metrics.visibleSeconds - sec);
          trackEvent("engagement_heartbeat", {
            active_seconds: sec,
            total_seconds: metrics.totalSeconds,
            visible_seconds: metrics.visibleSeconds,
            idle_seconds: idleSec,
            active_minutes: Math.round((sec / 60) * 100) / 100,
            total_minutes: Math.round((metrics.totalSeconds / 60) * 100) / 100,
            max_scroll_percent: metrics.maxScrollPercent,
            last_section_seen: metrics.lastSectionSeen || "top_of_page",
            video_watch_seconds: getPageVideoWatchSeconds(),
          });
        }
      }
    }, 1000);

    // 2. Scroll milestone tracking (throttled)
    let scrollTimer: number | null = null;
    const evaluateScroll = () => {
      const pct = computeScrollPercent();
      if (pct > metrics.maxScrollPercent) {
        metrics.maxScrollPercent = pct;
      }
      for (const milestone of SCROLL_MILESTONES) {
        if (
          pct >= milestone &&
          !metrics.firedScrollMilestones.has(milestone)
        ) {
          metrics.firedScrollMilestones.add(milestone);
          trackEvent("scroll_milestone", {
            scroll_percent: milestone,
            active_seconds: metrics.activeSeconds,
            total_seconds: metrics.totalSeconds,
            last_section_seen: metrics.lastSectionSeen || "top_of_page",
          });
        }
      }
    };

    const handleScroll = () => {
      metrics.lastInteractionAt = Date.now();
      if (scrollTimer !== null) return;
      scrollTimer = window.setTimeout(() => {
        scrollTimer = null;
        evaluateScroll();
      }, 200);
    };

    // 3. Interaction listeners
    let lastMouseMoveAt = 0;
    const handleMouseMove = () => {
      const now = Date.now();
      if (now - lastMouseMoveAt >= 1000) {
        lastMouseMoveAt = now;
        metrics.lastInteractionAt = now;
      }
    };

    const handleActivePing = () => {
      metrics.lastInteractionAt = Date.now();
    };

    const handleKeyDown = () => {
      metrics.lastInteractionAt = Date.now();
      metrics.interactionsCount += 1;
    };

    // 4. Delegated click listener (CTAs, outbound links, downloads, mailto, rage clicks)
    const handleClick = (event: MouseEvent) => {
      const now = Date.now();
      metrics.lastInteractionAt = now;
      metrics.interactionsCount += 1;

      const targetEl = event.target instanceof Element ? event.target : null;
      if (!targetEl) return;

      const sectionName = findSectionName(targetEl) || "unknown";

      // Rage click detection (3+ clicks on same target within 1000ms)
      const rageState = rageTrackerRef.current;
      if (rageState.target === event.target) {
        rageState.timestamps = rageState.timestamps.filter(
          (ts) => now - ts <= 1000
        );
        rageState.timestamps.push(now);
        if (rageState.timestamps.length === 3) {
          trackEvent("rage_click", {
            element_tag: targetEl.tagName.toLowerCase(),
            element_text: (targetEl.textContent || "").trim().slice(0, 60),
            section_name: sectionName,
          });
        }
      } else {
        rageState.target = event.target;
        rageState.timestamps = [now];
      }

      // CTA clicks via data-track-cta
      const ctaEl = targetEl.closest("[data-track-cta]");
      if (ctaEl) {
        const ctaName = ctaEl.getAttribute("data-track-cta") || "unknown_cta";
        const ctaLocation =
          ctaEl.getAttribute("data-track-cta-location") || sectionName;
        trackEvent("cta_click", {
          cta_name: ctaName,
          cta_location: ctaLocation,
          section_name: sectionName,
        });
      }

      // Anchor tracking: mailto, downloads, outbound
      const anchor = targetEl.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href") || "";
        const linkText = (anchor.textContent || "").trim().slice(0, 80);

        if (href.startsWith("mailto:")) {
          trackEvent("mailto_click", {
            link_url: href,
            link_text: linkText,
            section_name: sectionName,
          });
          return;
        }

        if (/\.(bat|zip|pdf)(\?.*)?$/i.test(href)) {
          trackEvent("file_download", {
            file_url: href,
            file_name: href.split("/").pop()?.split("?")[0] || href,
            link_text: linkText,
            section_name: sectionName,
          });
        }

        if (/^https?:\/\//i.test(href)) {
          try {
            const parsed = new URL(href);
            if (parsed.hostname !== window.location.hostname) {
              trackEvent("outbound_click", {
                link_url: href,
                link_domain: parsed.hostname,
                link_text: linkText,
                section_name: sectionName,
              });
            }
          } catch {
            // Ignore invalid URL
          }
        }
      }
    };

    // 5. Section IntersectionObserver + MutationObserver for dynamic sections
    const observedElements = new WeakSet<Element>();
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionName =
            entry.target.getAttribute("data-track-section") || "";
          if (!sectionName) continue;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            metrics.visibleSections.add(sectionName);
            if (!metrics.sectionsViewedSet.has(sectionName)) {
              metrics.sectionsViewedSet.add(sectionName);
              metrics.sectionsViewed.push(sectionName);
              if (!metrics.lastSectionSeen) {
                metrics.lastSectionSeen = sectionName;
              }
              trackEvent("section_viewed", {
                section_name: sectionName,
                section_order: metrics.sectionsViewed.length,
                active_seconds: metrics.activeSeconds,
                total_seconds: metrics.totalSeconds,
              });
            }
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.25) {
            metrics.visibleSections.delete(sectionName);
          }
        }
      },
      { threshold: [0, 0.25, 0.5] }
    );

    const scanSections = () => {
      const elements = document.querySelectorAll("[data-track-section]");
      elements.forEach((el) => {
        if (!observedElements.has(el)) {
          observedElements.add(el);
          intersectionObserver.observe(el);
        }
      });
    };

    const initialScanTimer = window.setTimeout(() => {
      scanSections();
      evaluateScroll();
    }, 150);

    const mainEl = document.querySelector("main") || document.body;
    const mutationObserver = new MutationObserver(() => {
      scanSections();
    });
    if (mainEl) {
      mutationObserver.observe(mainEl, { childList: true, subtree: true });
    }

    // 6. Lifecycle flush listeners
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushPageSummary(false);
      } else if (document.visibilityState === "visible") {
        metrics.flushedForCurrentPage = false;
        metrics.lastInteractionAt = Date.now();
      }
    };

    const handlePageHide = () => {
      flushPageSummary(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointerdown", handleActivePing, { passive: true });
    window.addEventListener("touchstart", handleActivePing, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(initialScanTimer);
      if (scrollTimer !== null) window.clearTimeout(scrollTimer);
      intersectionObserver.disconnect();
      mutationObserver.disconnect();

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointerdown", handleActivePing);
      window.removeEventListener("touchstart", handleActivePing);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);

      flushPageSummary(true);
    };
  }, [pathname]);

  return null;
}

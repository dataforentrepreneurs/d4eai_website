"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  PlayCircle,
  Clock,
  Video,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import {
  addVideoWatchSeconds,
  setVideoPlayingState,
  trackEvent,
  type YTPlayer,
} from "@/lib/analytics";

interface Chapter {
  time: number;
  timeStr: string;
  title: string;
}

interface DiadVideo {
  id: string;
  youtubeId: string;
  title: string;
  shortLabel: string;
  durationLabel: string;
  badge: string;
  overview: string;
  chapters: Chapter[];
}

const DIAD_VIDEOS: DiadVideo[] = [
  {
    id: "diad_executive_pitch",
    youtubeId: "0aymTkZTppM",
    title: "Data in a Day (DIAD) — Executive Pitch & Architecture Overview",
    shortLabel: "Executive Pitch & Architecture",
    durationLabel: "7:26",
    badge: "Architecture & Value Prop",
    overview:
      "How DIAD brings structured e-commerce data and unstructured business docs into your own Google Cloud environment in a single day to power isolated Customer Support & Executive BI assistants.",
    chapters: [
      { time: 0, timeStr: "00:00", title: "Introduction: Turning E-Commerce Data into Reliable Answers" },
      { time: 37, timeStr: "00:37", title: "The Problem: Fragmented Exports vs. Third-Party Lock-In" },
      { time: 109, timeStr: "01:49", title: "Universal Auto-Mappers & Format Guardrails" },
      { time: 140, timeStr: "02:20", title: "How the Architecture Works (Structured + Unstructured Ingestion)" },
      { time: 185, timeStr: "03:05", title: "BigQuery Two-Layer Security Split (Canonical vs. Raw Vault)" },
      { time: 212, timeStr: "03:32", title: "Two Specialized AI Assistants (Storefront Bot vs. Executive Advisor)" },
      { time: 261, timeStr: "04:21", title: "Data Governance, PII Redaction & Hard Query Caps" },
      { time: 285, timeStr: "04:45", title: "The Guided 4-Stage Rollout & Serverless GCP Scaling" },
      { time: 363, timeStr: "06:03", title: "Private Beta Offer (First 5 Partner Brands) & Product Roadmap" },
    ],
  },
  {
    id: "diad_setup_walkthrough",
    youtubeId: "HLOK-dCTJvw",
    title: "How to Set Up DIAD in 4.5 Minutes | Client-Owned Data Stack",
    shortLabel: "4.5-Min Live Setup Walkthrough",
    durationLabel: "4:21",
    badge: "Live Screen Walkthrough",
    overview:
      "End-to-end screen walkthrough on a live demo store (The Diamante Collections): 1-click installer on localhost:8000, GCP service account & Secret Manager, Drive/Notion/Confluence sync, BigQuery pipeline, Cloud Scheduler, and live bot testing.",
    chapters: [
      { time: 0, timeStr: "00:00", title: "Demo Storefront Preview & Downloading the 1-Click Installer" },
      { time: 9, timeStr: "00:09", title: "Launching the Local DIAD Onboarding Suite (localhost:8000)" },
      { time: 16, timeStr: "00:16", title: "Step 1: Creating a GCP Project, Service Account & Uploading JSON Key" },
      { time: 31, timeStr: "00:31", title: "Step 2: Connecting Knowledge Base (Google Drive, Notion & Confluence)" },
      { time: 63, timeStr: "01:03", title: "Configuring Multi-LLM API Keys & Syncing to GCP Secret Manager" },
      { time: 98, timeStr: "01:38", title: "Step 3: Uploading Store Exports & Linking GA4 / Firebase to BigQuery" },
      { time: 137, timeStr: "02:17", title: "Step 4: Executing the Automated BigQuery & Vector Pipeline" },
      { time: 144, timeStr: "02:24", title: "Step 5: Testing the Storefront Support Bot & Internal Executive Advisor" },
      { time: 188, timeStr: "03:08", title: "Downloading the Client Integration Package & Embed Snippet" },
      { time: 194, timeStr: "03:14", title: "Step 6: Deploying Automated Cloud Scheduler Sync Jobs" },
      { time: 217, timeStr: "03:37", title: "Verifying Live Cloud Scheduler Jobs & BigQuery Datasets in GCP" },
      { time: 238, timeStr: "03:58", title: "Live Storefront Chat Widget Demo (Order Status & Return Policy)" },
    ],
  },
];

const YOUTUBE_MILESTONES = [10, 25, 50, 75, 90, 100] as const;

export default function DiadVideoShowcase() {
  const [activeVideoId, setActiveVideoId] = useState<string>(DIAD_VIDEOS[0].id);
  const [activeChapter, setActiveChapter] = useState<Chapter>(DIAD_VIDEOS[0].chapters[0]);

  const activeVideo =
    DIAD_VIDEOS.find((v) => v.id === activeVideoId) || DIAD_VIDEOS[0];

  const playerRef = useRef<YTPlayer | null>(null);
  const playerReadyRef = useRef<boolean>(false);
  const pendingSeekRef = useRef<number | null>(null);
  const ytStartedRef = useRef<Record<string, boolean>>({});
  const ytMilestonesRef = useRef<Record<string, Set<number>>>({});
  const ytPollRef = useRef<number | null>(null);
  const activeChapterRef = useRef<Chapter>(activeChapter);
  const activeVideoRef = useRef<DiadVideo>(activeVideo);

  useEffect(() => {
    activeChapterRef.current = activeChapter;
  }, [activeChapter]);

  useEffect(() => {
    activeVideoRef.current = activeVideo;
  }, [activeVideo]);

  useEffect(() => {
    const video =
      DIAD_VIDEOS.find((v) => v.id === activeVideoId) || DIAD_VIDEOS[0];
    let cancelled = false;

    const clearPoll = () => {
      if (ytPollRef.current !== null) {
        window.clearInterval(ytPollRef.current);
        ytPollRef.current = null;
      }
    };

    const getPlayerMetrics = (player: YTPlayer | null) => {
      try {
        const current = player ? Math.round(player.getCurrentTime() * 10) / 10 : 0;
        const duration = player ? Math.round(player.getDuration() * 10) / 10 : 0;
        const pct = duration > 0 ? Math.min(100, Math.round((current / duration) * 100)) : 0;
        return { current, duration, pct };
      } catch {
        return { current: 0, duration: 0, pct: 0 };
      }
    };

    const checkMilestones = (player: YTPlayer | null) => {
      const { current, duration, pct } = getPlayerMetrics(player);
      if (!ytMilestonesRef.current[video.id]) {
        ytMilestonesRef.current[video.id] = new Set<number>();
      }
      const fired = ytMilestonesRef.current[video.id];
      for (const milestone of YOUTUBE_MILESTONES) {
        if (pct >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          trackEvent("video_progress", {
            video_id: video.id,
            video_title: video.title,
            progress_percent: milestone,
            current_time_sec: current,
            duration_sec: duration,
            active_chapter: activeChapterRef.current.title,
          });
        }
      }
    };

    const attachPlayer = () => {
      if (cancelled || !window.YT?.Player) return;
      const iframeId = `diad-yt-player-${video.id}`;
      const iframeEl = document.getElementById(iframeId);
      if (!iframeEl) return;

      playerReadyRef.current = false;
      const player = new window.YT.Player(iframeId, {
        events: {
          onReady: (ev) => {
            if (cancelled) return;
            playerRef.current = ev.target;
            playerReadyRef.current = true;
            if (pendingSeekRef.current !== null) {
              const targetTime = pendingSeekRef.current;
              pendingSeekRef.current = null;
              ev.target.seekTo(targetTime, true);
              ev.target.playVideo();
            }
          },
          onStateChange: (ev) => {
            if (cancelled) return;
            const state = ev.data;
            const { current, duration, pct } = getPlayerMetrics(ev.target);

            // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            if (state === 1) {
              setVideoPlayingState(video.id, true);
              if (!ytStartedRef.current[video.id]) {
                ytStartedRef.current[video.id] = true;
                trackEvent("video_start", {
                  video_id: video.id,
                  video_title: video.title,
                  duration_sec: duration,
                  active_chapter: activeChapterRef.current.title,
                });
              } else {
                trackEvent("video_play", {
                  video_id: video.id,
                  video_title: video.title,
                  current_time_sec: current,
                  duration_sec: duration,
                  percent_watched: pct,
                  active_chapter: activeChapterRef.current.title,
                });
              }

              clearPoll();
              ytPollRef.current = window.setInterval(() => {
                addVideoWatchSeconds(1);
                checkMilestones(playerRef.current);
              }, 1000);
            } else if (state === 2) {
              clearPoll();
              setVideoPlayingState(video.id, false);
              trackEvent("video_pause", {
                video_id: video.id,
                video_title: video.title,
                current_time_sec: current,
                duration_sec: duration,
                percent_watched: pct,
                active_chapter: activeChapterRef.current.title,
              });
            } else if (state === 0) {
              clearPoll();
              setVideoPlayingState(video.id, false);
              checkMilestones(ev.target);
              trackEvent("video_ended", {
                video_id: video.id,
                video_title: video.title,
                duration_sec: duration,
              });
            }
          },
        },
      });
      playerRef.current = player;
    };

    if (window.YT?.Player) {
      attachPlayer();
    } else {
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevReady === "function") prevReady();
        attachPlayer();
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        document.head.appendChild(tag);
      }
    }

    return () => {
      cancelled = true;
      clearPoll();
      setVideoPlayingState(video.id, false);
      playerReadyRef.current = false;
      try {
        playerRef.current?.destroy?.();
      } catch {
        // Ignore teardown issues
      }
      playerRef.current = null;
    };
  }, [activeVideoId]);

  const handleSelectVideo = (video: DiadVideo) => {
    if (video.id === activeVideoId) return;
    setVideoPlayingState(activeVideoId, false);
    trackEvent("video_switch", {
      from_video: activeVideoId,
      to_video: video.id,
    });
    pendingSeekRef.current = null;
    setActiveVideoId(video.id);
    setActiveChapter(video.chapters[0]);
  };

  const handleSelectChapter = (ch: Chapter) => {
    setActiveChapter(ch);
    trackEvent("video_chapter_select", {
      video_id: activeVideo.id,
      video_title: activeVideo.title,
      chapter_time: ch.time,
      chapter_title: ch.title,
    });
    if (playerReadyRef.current && playerRef.current) {
      try {
        playerRef.current.seekTo(ch.time, true);
        playerRef.current.playVideo();
        return;
      } catch {
        // Fallback to pending seek
      }
    }
    pendingSeekRef.current = ch.time;
  };

  const iframeSrc = `https://www.youtube.com/embed/${activeVideo.youtubeId}?enablejsapi=1&rel=0`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="glass-card p-6 sm:p-10 max-w-6xl mx-auto mb-20 border-electric-cyan/30 relative overflow-hidden shadow-2xl"
    >
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-electric-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header + Video Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Product Demos &amp; Architecture Walkthrough
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            See DIAD in Action Before You Deploy
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
            {activeVideo.overview}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-shrink-0">
          {DIAD_VIDEOS.map((vid) => {
            const isSelected = vid.id === activeVideo.id;
            return (
              <button
                key={vid.id}
                type="button"
                onClick={() => handleSelectVideo(vid)}
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer min-w-[220px] ${
                  isSelected
                    ? "bg-electric-cyan/15 border-electric-cyan text-white shadow-lg shadow-electric-cyan/15"
                    : "bg-obsidian/70 border-slate/80 text-gray-300 hover:border-electric-cyan/40 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[0.65rem] font-mono uppercase tracking-wider text-electric-cyan">
                    {vid.badge}
                  </span>
                  <span className="text-[0.68rem] font-mono px-2 py-0.5 rounded bg-slate text-gray-200">
                    {vid.durationLabel}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-electric-cyan flex-shrink-0" />
                  <span>{vid.shortLabel}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Player + Clickable Chapters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-electric-cyan/30 bg-obsidian">
            <iframe
              key={activeVideo.id}
              id={`diad-yt-player-${activeVideo.id}`}
              className="w-full h-full"
              src={iframeSrc}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-obsidian/70 border border-electric-cyan/20">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-electric-cyan"></span>
              </span>
              <span className="text-[0.7rem] text-gray-400 uppercase tracking-wider font-mono flex-shrink-0">
                Chapter:
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white truncate">
                [{activeChapter.timeStr}] {activeChapter.title}
              </span>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-electric-cyan hover:underline flex-shrink-0"
            >
              Watch on YouTube
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Clickable Chapter Timeline */}
        <div className="lg:col-span-4 glass rounded-2xl p-4 border border-electric-cyan/20 flex flex-col h-[420px]">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Clock className="w-4 h-4 text-electric-cyan" />
              Interactive Chapters
            </div>
            <span className="text-xs text-gray-400 font-mono">
              {activeVideo.chapters.length} Segments
            </span>
          </div>

          <div className="overflow-y-auto space-y-2 pr-1 custom-scrollbar flex-1">
            {activeVideo.chapters.map((ch, idx) => {
              const isCurrent = activeChapter.time === ch.time;
              return (
                <button
                  key={`${activeVideo.id}-${ch.time}-${idx}`}
                  type="button"
                  onClick={() => handleSelectChapter(ch)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                    isCurrent
                      ? "bg-electric-cyan/20 border border-electric-cyan text-white shadow-[0_0_15px_rgba(102,252,241,0.2)]"
                      : "hover:bg-slate/70 text-gray-300 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`text-[0.7rem] font-mono font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${
                        isCurrent
                          ? "bg-electric-cyan text-obsidian"
                          : "bg-slate text-electric-cyan-dim"
                      }`}
                    >
                      {ch.timeStr}
                    </span>
                    <span className="text-xs leading-snug font-medium">
                      {ch.title}
                    </span>
                  </div>
                  <PlayCircle
                    className={`w-4 h-4 flex-shrink-0 ${
                      isCurrent ? "text-electric-cyan" : "text-gray-500 opacity-60"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

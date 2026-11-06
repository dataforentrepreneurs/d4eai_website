"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  BookOpen,
  ArrowRight,
  Zap,
  Gamepad2,
} from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Attempt auto-play on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted if unmuted
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-electric-cyan/15 via-electric-violet/20 to-neon-purple/20 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass border border-electric-cyan/40 text-electric-cyan text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-[0_0_20px_rgba(102,252,241,0.2)]"
        >
          <Sparkles className="w-4 h-4 text-electric-cyan" />
          <span>Data for Entrepreneurs • Next-Gen AI & Strategy</span>
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl mx-auto leading-[1.1]"
        >
          <span className="text-white">Turn raw data into </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-electric-violet-light to-neon-purple">
            intelligent agents instantly
          </span>
        </motion.h1>
        
        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
        >
          Visualize, architect, and deploy production-grade AI pipelines and autonomous agents in minutes. Zero vendor lock-in, founder-first engineering.
        </motion.p>
        
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <Link
            href="/diad"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-electric-cyan to-electric-cyan-dim text-obsidian font-bold text-base hover:shadow-[0_0_30px_rgba(102,252,241,0.5)] hover:scale-[1.02] transition-all"
          >
            <Zap className="w-5 h-5 fill-current" />
            Explore DIAD Platform
          </Link>

          <Link
            href="/resources"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/20 text-white font-semibold text-base hover:bg-white/10 hover:border-white/40 transition-all"
          >
            <BookOpen className="w-5 h-5 text-electric-cyan" />
            Founder Books & Video
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </motion.div>

        {/* BRAND VIDEO SHOWCASE (LOADS & AUTOPLAYS ON MOUNT) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-4xl mx-auto w-full group"
        >
          {/* Ambient Glow Aura */}
          <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan via-electric-violet to-neon-purple rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition duration-700 animate-pulse" />

          {/* Video Container Box */}
          <div className="relative glass-card rounded-2xl md:rounded-3xl overflow-hidden border border-electric-cyan/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-slate/90">
            
            {/* Top Brand Tag Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[rgba(102,252,241,0.15)] bg-obsidian/70">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-electric-cyan"></span>
                </span>
                <span className="text-xs font-mono font-bold tracking-widest text-electric-cyan uppercase">
                  Brand Film • Data For Entrepreneurs
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <span>1080p HD</span>
                <span className="w-1 h-1 rounded-full bg-gray-500" />
                <span className="text-electric-cyan">Auto-Loaded</span>
              </div>
            </div>

            {/* Video Element */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src="/brand_video.mp4"
                autoPlay
                muted
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
              />

              {/* Center Play Overlay when paused */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full glass bg-obsidian/80 border border-electric-cyan text-electric-cyan flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(102,252,241,0.5)]"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              )}

              {/* Bottom Control Bar on Hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 opacity-95 transition-opacity">
                {/* Progress bar */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-electric-cyan to-neon-purple transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-lg hover:bg-white/20 text-electric-cyan transition-colors"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-4 h-4 text-electric-cyan" />
                          <span>Sound Off (Click to unmute)</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-electric-cyan" />
                          <span>Sound On</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleRestart}
                      className="p-1.5 rounded-lg hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                      title="Replay from beginning"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleFullscreen}
                      className="p-1.5 rounded-lg hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Video Footer Caption */}
            <div className="px-4 sm:px-6 py-3 bg-obsidian/80 border-t border-[rgba(102,252,241,0.1)] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
              <span className="text-gray-300">
                Experience how <strong className="text-white">d4e.ai</strong> automates startup data architectures and customer-facing intelligence.
              </span>
              <Link
                href="/resources#build_ai_chatbot_at_no_invest"
                className="text-electric-cyan hover:underline flex items-center gap-1 font-medium whitespace-nowrap"
              >
                Watch full 22-min tutorial <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

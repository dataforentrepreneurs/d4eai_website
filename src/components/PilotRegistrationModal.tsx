"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { submitPilotRegistration, trackEvent } from "@/lib/analytics";
import {
  X,
  ShieldCheck,
  Download,
  Check,
  Copy,
  Sparkles,
  Building2,
  Mail,
  User,
  Globe,
  UploadCloud,
  ImageIcon,
  Loader2
} from "lucide-react";

export interface RegistrationData {
  fullName: string;
  brandName: string;
  workEmail: string;
  storeUrl: string;
  logoDataUrl?: string;
}

interface PilotRegistrationModalProps {
  isOpen: boolean;
  triggerSource?: string;
  onClose: () => void;
  onSuccess?: (data: RegistrationData) => void;
}

interface SavedRegistrationDefaults {
  fullName: string;
  brandName: string;
  workEmail: string;
  storeUrl: string;
  logoDataUrl: string;
  logoFileName: string;
  logoMimeType: string;
  hadPrefilledLead: boolean;
}

function readSavedRegistrationDefaults(): SavedRegistrationDefaults {
  const empty: SavedRegistrationDefaults = {
    fullName: "",
    brandName: "",
    workEmail: "",
    storeUrl: "",
    logoDataUrl: "",
    logoFileName: "",
    logoMimeType: "",
    hadPrefilledLead: false,
  };
  if (typeof window === "undefined") return empty;

  try {
    const saved = JSON.parse(localStorage.getItem("diad_pilot_lead") || "{}");
    const hasPrefill = Boolean(
      saved.fullName || saved.brandName || saved.workEmail || saved.storeUrl
    );
    const savedLogo = localStorage.getItem("diad_pilot_logo") || "";
    const match = savedLogo.match(/^data:([^;]+);/);
    return {
      fullName: saved.fullName ? String(saved.fullName) : "",
      brandName: saved.brandName ? String(saved.brandName) : "",
      workEmail: saved.workEmail ? String(saved.workEmail) : "",
      storeUrl: saved.storeUrl ? String(saved.storeUrl) : "",
      logoDataUrl: savedLogo,
      logoFileName: savedLogo ? "Uploaded Brand Logo" : "",
      logoMimeType: match?.[1] || "",
      hadPrefilledLead: hasPrefill,
    };
  } catch (err) {
    console.warn("Could not read saved lead from localStorage", err);
    return empty;
  }
}

function PilotRegistrationModalContent({
  triggerSource = "unknown",
  onClose,
  onSuccess
}: Omit<PilotRegistrationModalProps, "isOpen">) {
  const [defaults] = useState<SavedRegistrationDefaults>(() =>
    readSavedRegistrationDefaults()
  );
  const [fullName, setFullName] = useState(defaults.fullName);
  const [brandName, setBrandName] = useState(defaults.brandName);
  const [workEmail, setWorkEmail] = useState(defaults.workEmail);
  const [storeUrl, setStoreUrl] = useState(defaults.storeUrl);
  const [logoDataUrl, setLogoDataUrl] = useState<string>(defaults.logoDataUrl);
  const [logoFileName, setLogoFileName] = useState<string>(defaults.logoFileName);
  const [logoMimeType, setLogoMimeType] = useState<string>(defaults.logoMimeType);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [captureNote, setCaptureNote] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Funnel & abandon tracking refs
  const modalOpenedAtRef = useRef<number>(0);
  const touchedFieldsRef = useRef<Set<string>>(new Set());
  const lastFieldTouchedRef = useRef<string>("");
  const submittedRef = useRef<boolean>(false);
  const snapshotRef = useRef({
    fullName: defaults.fullName,
    brandName: defaults.brandName,
    workEmail: defaults.workEmail,
    storeUrl: defaults.storeUrl,
    logoDataUrl: defaults.logoDataUrl,
    agreed: false,
    triggerSource,
  });

  useEffect(() => {
    snapshotRef.current = {
      fullName,
      brandName,
      workEmail,
      storeUrl,
      logoDataUrl,
      agreed,
      triggerSource,
    };
  }, [fullName, brandName, workEmail, storeUrl, logoDataUrl, agreed, triggerSource]);

  const trackAbandonIfNeeded = useCallback(() => {
    if (submittedRef.current || modalOpenedAtRef.current === 0) return;
    const snap = snapshotRef.current;
    const completed: string[] = [];
    if (snap.fullName.trim()) completed.push("full_name");
    if (snap.brandName.trim()) completed.push("brand_name");
    if (snap.workEmail.trim()) completed.push("work_email");
    if (snap.storeUrl.trim()) completed.push("store_url");
    if (snap.logoDataUrl) completed.push("logo_upload");
    if (snap.agreed) completed.push("terms_consent");

    const timeInModalSec =
      Math.round(((Date.now() - modalOpenedAtRef.current) / 1000) * 10) / 10;

    trackEvent(
      "pilot_modal_abandon",
      {
        last_field_touched: lastFieldTouchedRef.current || "none",
        fields_completed: completed.join(","),
        fields_completed_count: completed.length,
        had_logo: Boolean(snap.logoDataUrl),
        had_consent: snap.agreed,
        time_in_modal_sec: timeInModalSec,
        trigger_source: snap.triggerSource,
      },
      { beacon: true }
    );
    modalOpenedAtRef.current = 0;
  }, []);

  useEffect(() => {
    modalOpenedAtRef.current = Date.now();
    touchedFieldsRef.current = new Set();
    lastFieldTouchedRef.current = "";
    submittedRef.current = false;

    trackEvent("pilot_modal_open", {
      trigger_source: triggerSource,
      had_prefilled_lead: defaults.hadPrefilledLead,
    });

    const handlePageHide = () => {
      trackAbandonIfNeeded();
    };
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [triggerSource, defaults.hadPrefilledLead, trackAbandonIfNeeded]);

  const markFieldTouched = (fieldName: string) => {
    lastFieldTouchedRef.current = fieldName;
    if (!touchedFieldsRef.current.has(fieldName)) {
      touchedFieldsRef.current.add(fieldName);
      trackEvent("pilot_field_interacted", {
        field_name: fieldName,
        trigger_source: triggerSource,
      });
    }
  };

  // Generate dynamic tailored PowerShell command
  const dynamicPsCommand = brandName.trim()
    ? `$env:DIAD_BIZ="${brandName.trim()}"; $env:DIAD_URL="${storeUrl.trim()}"; irm https://raw.githubusercontent.com/dataforentrepreneurs/DIAD_Scaffold/main/setup.ps1 | iex`
    : `irm https://raw.githubusercontent.com/dataforentrepreneurs/DIAD_Scaffold/main/setup.ps1 | iex`;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (PNG, SVG, or JPG).");
      trackEvent("pilot_logo_error", { reason: "invalid_type" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Logo image must be smaller than 5MB.");
      trackEvent("pilot_logo_error", { reason: "file_too_large" });
      return;
    }

    setLogoFileName(file.name);
    setLogoMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setLogoDataUrl(result);
      setErrorMsg("");
      trackEvent("pilot_logo_selected", {
        file_type: file.type,
        file_size_kb: Math.round(file.size / 1024),
      });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoDataUrl("");
    setLogoFileName("");
    setLogoMimeType("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    trackEvent("pilot_logo_removed", { trigger_source: triggerSource });
  };

  const triggerBatDownload = () => {
    const cleanBiz = brandName.replace(/["^&|<>]/g, "");
    const cleanUrl = storeUrl.replace(/["^&|<>]/g, "");
    const cleanEmail = workEmail.replace(/["^&|<>]/g, "");

    const batContent = `@echo off
title DIAD Onboarding Launcher
echo ==============================================================
echo        DIAD - AI Data Platform for Entrepreneurs             
echo        One-Click Onboarding Launcher for ${cleanBiz}
echo ==============================================================
echo.

:: 1. If running directly inside a DIAD project directory, launch immediately!
if exist "scripts\\onboarding_dashboard.py" (
    echo [INFO] Running from current DIAD directory: %CD%
    powershell -ExecutionPolicy Bypass -File .\\setup.ps1 -BusinessName "${cleanBiz}" -WebsiteUrl "${cleanUrl}" -ContactEmail "${cleanEmail}"
    if errorlevel 1 pause
    exit /b
)

:: 2. Handle download or auto-upgrade if older release is cached
if not exist "%USERPROFILE%\\DIAD\\scripts\\onboarding_dashboard.py" goto do_download
findstr /c:"v1.0.8" "%USERPROFILE%\\DIAD\\scripts\\onboarding_dashboard.py" >nul 2>&1
if errorlevel 1 goto do_download
goto run_setup

:do_download
echo [INFO] Downloading latest DIAD release package from d4e.ai...
powershell -ExecutionPolicy Bypass -Command "$ProgressPreference='SilentlyContinue'; [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://d4e.ai/DIAD_release_v1.0.zip' -OutFile ($env:TEMP + '\\DIAD_release.zip'); Expand-Archive -Path ($env:TEMP + '\\DIAD_release.zip') -DestinationPath ($env:USERPROFILE + '\\DIAD') -Force; Remove-Item ($env:TEMP + '\\DIAD_release.zip') -Force; Write-Host '[SUCCESS] DIAD updated to latest release.' -ForegroundColor Green"

:run_setup
cd /d "%USERPROFILE%\\DIAD"

echo.
echo [INFO] Launching DIAD setup engine for ${cleanBiz}...
powershell -ExecutionPolicy Bypass -File .\\setup.ps1 -BusinessName "${cleanBiz}" -WebsiteUrl "${cleanUrl}" -ContactEmail "${cleanEmail}"
if errorlevel 1 (
    echo.
    echo [ERROR] Setup encountered an issue. See details above.
    pause
)
`;

    const blob = new Blob([batContent], { type: "application/x-msdos-program" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "setup.bat";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!fullName.trim() || !brandName.trim() || !workEmail.trim() || !storeUrl.trim()) {
      setErrorMsg("Please complete all required fields.");
      return;
    }
    if (!agreed) {
      setErrorMsg("Please accept the Free Community License and Pilot Agreement.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    const registeredAt = new Date().toISOString();
    const leadData: RegistrationData = {
      fullName: fullName.trim(),
      brandName: brandName.trim(),
      workEmail: workEmail.trim(),
      storeUrl: storeUrl.trim(),
      logoDataUrl
    };

    try {
      localStorage.setItem(
        "diad_pilot_lead",
        JSON.stringify({
          ...leadData,
          registeredAt,
          consentAccepted: true
        })
      );
      if (logoDataUrl) {
        localStorage.setItem("diad_pilot_logo", logoDataUrl);
      }
    } catch { }

    const timeInModalSec =
      modalOpenedAtRef.current > 0
        ? Math.round(((Date.now() - modalOpenedAtRef.current) / 1000) * 10) / 10
        : 0;

    const captureResult = await submitPilotRegistration({
      ...leadData,
      logoFileName: logoFileName || undefined,
      logoMimeType: logoMimeType || undefined,
      consentAccepted: true,
      registeredAt,
      triggerSource,
    });

    submittedRef.current = true;
    setCaptureNote(
      captureResult.channel === "cloudflare"
        ? "Pilot license & brand profile registered."
        : captureResult.channel === "formspree"
          ? "Pilot registration recorded."
          : ""
    );

    trackEvent("pilot_registration_submit", {
      has_logo: Boolean(logoDataUrl),
      logo_file_type: logoMimeType || "none",
      time_in_modal_sec: timeInModalSec,
      trigger_source: triggerSource,
      capture_channel: captureResult.channel,
      logo_saved_server: captureResult.logoSaved,
    });

    trackEvent("generate_lead", {
      lead_type: "diad_pilot",
      has_logo: Boolean(logoDataUrl),
      capture_channel: captureResult.channel,
    });

    trackEvent("installer_download", {
      filename: "setup.bat",
      download_type: "initial",
      has_logo: Boolean(logoDataUrl),
    });

    triggerBatDownload();

    setIsSubmitting(false);
    setIsSubmitted(true);
    if (onSuccess) {
      onSuccess(leadData);
    }
  };

  const handleDownloadAgain = () => {
    triggerBatDownload();
    trackEvent("installer_download_again", {
      filename: "setup.bat",
    });
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(dynamicPsCommand);
    setCopied(true);
    trackEvent("ps_command_copied_post_signup", {
      has_custom_biz: Boolean(brandName.trim()),
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleReset = () => {
    if (!isSubmitted) {
      trackAbandonIfNeeded();
    }
    setIsSubmitted(false);
    setCaptureNote("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-obsidian/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl glass-card border border-electric-cyan/40 bg-obsidian/95 shadow-2xl p-6 sm:p-8 rounded-2xl z-10 text-white my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate/50 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Free Pilot Activation
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                  Activate Your Free DIAD License
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  DIAD is 100% free (S$0 software licensing fee) and runs completely inside your own Google Cloud account. Please confirm your details below to unlock your personalized setup kit.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-electric-cyan" />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onFocus={() => markFieldTouched("full_name")}
                      onChange={(e) => {
                        markFieldTouched("full_name");
                        setFullName(e.target.value);
                      }}
                      placeholder="e.g. Alex Tan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate/40 border border-slate focus:border-electric-cyan focus:outline-none text-sm text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-electric-cyan" />
                      Store / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={brandName}
                      onFocus={() => markFieldTouched("brand_name")}
                      onChange={(e) => {
                        markFieldTouched("brand_name");
                        setBrandName(e.target.value);
                      }}
                      placeholder="e.g. Acme Lifestyle"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate/40 border border-slate focus:border-electric-cyan focus:outline-none text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-electric-cyan" />
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onFocus={() => markFieldTouched("work_email")}
                      onChange={(e) => {
                        markFieldTouched("work_email");
                        setWorkEmail(e.target.value);
                      }}
                      placeholder="alex@acmelifestyle.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate/40 border border-slate focus:border-electric-cyan focus:outline-none text-sm text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-electric-cyan" />
                      Store Website URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={storeUrl}
                      onFocus={() => markFieldTouched("store_url")}
                      onChange={(e) => {
                        markFieldTouched("store_url");
                        setStoreUrl(e.target.value);
                      }}
                      placeholder="https://acmelifestyle.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate/40 border border-slate focus:border-electric-cyan focus:outline-none text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Company Logo Upload */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-electric-cyan" />
                    Company Logo (PNG, SVG, or JPG)
                    <span className="text-gray-500 font-normal">(Recommended)</span>
                  </label>

                  {!logoDataUrl ? (
                    <div
                      onClick={() => {
                        markFieldTouched("logo_upload");
                        trackEvent("pilot_logo_picker_click", {
                          trigger_source: triggerSource,
                        });
                        fileInputRef.current?.click();
                      }}
                      className="border border-dashed border-slate hover:border-electric-cyan/60 rounded-xl p-3.5 text-center cursor-pointer bg-slate/20 hover:bg-slate/30 transition-colors flex items-center justify-center gap-3"
                    >
                      <UploadCloud className="w-5 h-5 text-electric-cyan" />
                      <div className="text-left">
                        <p className="text-xs font-medium text-gray-200">
                          Click to upload your brand logo
                        </p>
                        <p className="text-[0.7rem] text-gray-400">
                          Used to personalize your chatbots &amp; feature your store as a partner
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate/40 border border-electric-cyan/40">
                      <div className="flex items-center gap-3">
                        <img
                          src={logoDataUrl}
                          alt="Brand Logo"
                          className="w-10 h-10 object-contain rounded-lg bg-obsidian p-1 border border-slate"
                        />
                        <div>
                          <p className="text-xs font-medium text-white truncate max-w-[200px]">
                            {logoFileName || "Brand Logo"}
                          </p>
                          <span className="text-[0.65rem] text-emerald-400 font-mono">
                            ✓ Logo ready
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="text-xs text-rose-400 hover:text-rose-300 p-1.5 hover:bg-rose-500/10 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg,image/webp"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 p-3.5 rounded-xl bg-electric-cyan/5 border border-electric-cyan/20 cursor-pointer hover:bg-electric-cyan/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        markFieldTouched("terms_consent");
                        setAgreed(e.target.checked);
                      }}
                      className="mt-1 w-4 h-4 rounded border-slate text-electric-cyan focus:ring-0 focus:outline-none cursor-pointer"
                    />
                    <span className="text-xs text-gray-300 leading-relaxed">
                      I agree to the{" "}
                      <Link
                        href="/diad/terms"
                        target="_blank"
                        onClick={() =>
                          trackEvent("pilot_legal_link_click", { target: "terms" })
                        }
                        className="text-electric-cyan underline hover:text-white"
                      >
                        DIAD Free Community Terms
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/diad/privacy"
                        target="_blank"
                        onClick={() =>
                          trackEvent("pilot_legal_link_click", { target: "privacy" })
                        }
                        className="text-electric-cyan underline hover:text-white"
                      >
                        Privacy Policy
                      </Link>
                      . In exchange for free self-hosted platform access, I grant Data for Entrepreneurs permission to display our brand name and logo on d4e.ai as an early pilot partner.
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!agreed || isSubmitting}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${agreed && !isSubmitting
                    ? "bg-gradient-to-r from-electric-cyan to-emerald-400 text-obsidian hover:opacity-95 shadow-electric-cyan/20 cursor-pointer"
                    : "bg-slate/50 text-gray-500 cursor-not-allowed border border-slate"
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Activating &amp; Preparing Setup Kit...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Agree &amp; Download Setup Kit (.bat)
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Success State */
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Setup Kit Ready for {brandName}!
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                Your personalized <code className="text-electric-cyan font-mono">setup.bat</code> has been downloaded. Follow the 3 steps below to launch your onboarding suite.
                {captureNote ? (
                  <span className="block text-emerald-400 text-[0.72rem] font-mono mt-1.5">
                    ✓ {captureNote}
                  </span>
                ) : null}
              </p>

              {/* Onboarding Instructions */}
              <div className="text-left bg-obsidian p-4 rounded-xl border border-electric-cyan/20 mb-6 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-electric-cyan/20 text-electric-cyan flex items-center justify-center font-bold flex-shrink-0 text-[0.7rem]">1</span>
                  <span>Double-click the downloaded <strong>setup.bat</strong> file (or run in PowerShell).</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-electric-cyan/20 text-electric-cyan flex items-center justify-center font-bold flex-shrink-0 text-[0.7rem]">2</span>
                  <span>The script configures your environment and opens <code className="text-electric-cyan font-mono">http://localhost:8000</code> in your browser.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-electric-cyan/20 text-electric-cyan flex items-center justify-center font-bold flex-shrink-0 text-[0.7rem]">3</span>
                  <span>Your business name is automatically prefilled. Upload your GCP Service Account key to connect your pipeline!</span>
                </div>
              </div>

              {/* Direct Command Alternative */}
              <div className="mb-6">
                <p className="text-xs text-gray-400 mb-2 font-mono text-left">Or paste directly into PowerShell:</p>
                <div className="bg-obsidian border border-slate rounded-xl p-3 flex items-center justify-between gap-3 text-left">
                  <code className="text-electric-cyan font-mono text-xs break-all">
                    {dynamicPsCommand}
                  </code>
                  <button
                    onClick={handleCopyCommand}
                    className="flex-shrink-0 p-2 rounded-lg bg-electric-violet/30 text-white hover:bg-electric-violet/50 border border-electric-violet/40 transition-colors"
                    title="Copy Command"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownloadAgain}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate hover:bg-slate/80 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Again
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-electric-cyan text-obsidian font-bold text-xs hover:bg-electric-cyan/90 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function PilotRegistrationModal({
  isOpen,
  triggerSource = "unknown",
  onClose,
  onSuccess
}: PilotRegistrationModalProps) {
  if (!isOpen) return null;
  return (
    <PilotRegistrationModalContent
      triggerSource={triggerSource}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}

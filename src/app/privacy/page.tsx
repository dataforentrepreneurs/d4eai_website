import type { Metadata } from "next";
import DiadPrivacyPage from "../diad/privacy/page";

export const metadata: Metadata = {
  title: "Commercial Privacy Policy | d4e.ai",
  description: "Commercial Privacy Policy and Self-Hosted Software Zero-Telemetry Guarantee for d4e.ai and DIAD.",
  alternates: {
    canonical: "/diad/privacy",
  },
};

export default function PrivacyPage() {
  return <DiadPrivacyPage />;
}

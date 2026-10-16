import type { Metadata } from "next";
import DiadTermsPage from "../diad/terms/page";

export const metadata: Metadata = {
  title: "Terms of Service & License Agreement | d4e.ai",
  description: "Master Services Agreement, Self-Hosted Software License, and Free Community Terms for DIAD.",
  alternates: {
    canonical: "/diad/terms",
  },
};

export default function TermsPage() {
  return <DiadTermsPage />;
}

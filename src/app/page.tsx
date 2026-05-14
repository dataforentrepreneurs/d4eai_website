import ThreeBackground from "@/components/ThreeBackground";
import Hero from "@/components/Hero";
import ApiSnippet from "@/components/ApiSnippet";
import FeatureCards from "@/components/FeatureCards";

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <div className="relative">
        <Hero />
        <FeatureCards />
        <ApiSnippet />
      </div>
    </>
  );
}

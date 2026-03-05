import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";

// Lazy load below-the-fold sections
const ProofBar = dynamic(() => import("@/components/sections/ProofBar"));
const ProblemTeaser = dynamic(() => import("@/components/sections/ProblemTeaser"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const WhyVeyla = dynamic(() => import("@/components/sections/WhyVeyla"));
const CallToAction = dynamic(() => import("@/components/sections/CallToAction"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

import { Noise } from "@/components/Noise";
import { PixelGrid } from "@/components/PixelGrid";
import { MagneticCursor } from "@/components/effects/MagneticCursor";

export default function Home() {
  return (
    <main className="layout-wrapper">
      <PixelGrid />
      <Noise />
      <MagneticCursor />
      <Navbar />
      <Hero />

      <div className="manifesto-layer relative">
        <ProofBar />
        <ProblemTeaser />
        <HowItWorks />
        <WhyVeyla />
        <CallToAction />
        <Footer />
      </div>
    </main>
  );
}

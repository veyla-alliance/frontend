import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";

// Lazy load below-the-fold sections
const ProofBar = dynamic(() => import("@/components/sections/ProofBar"));
const ProblemTeaser = dynamic(() => import("@/components/sections/ProblemTeaser"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const WhyVeyla = dynamic(() => import("@/components/sections/WhyVeyla"));
const UnderTheHood = dynamic(() => import("@/components/sections/UnderTheHood"));
const CallToAction = dynamic(() => import("@/components/sections/CallToAction"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

import { Noise } from "@/components/Noise";
import { PixelGrid } from "@/components/PixelGrid";
import { MagneticCursor } from "@/components/effects/MagneticCursor";

export default function Home() {
  return (
    <main className="relative w-screen min-h-screen overflow-hidden bg-[var(--veyla-dark)]">
      <PixelGrid />
      <Noise />
      <MagneticCursor />
      <Navbar />
      <Hero />

      <div className="relative z-[2] w-full bg-[var(--veyla-dark)]">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 pt-10 sm:pt-16">
          <ProofBar />
        </div>
        <ProblemTeaser />
        <HowItWorks />
        <WhyVeyla />
        <UnderTheHood />
        <CallToAction />
        <Footer />
      </div>
    </main>
  );
}

import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";

// Lazy load below-the-fold sections — reduces initial JS bundle significantly
const Problem = dynamic(() => import("@/components/sections/Problem"));
const Answer = dynamic(() => import("@/components/sections/Answer"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const TheStack = dynamic(() => import("@/components/sections/TheStack"));
const TheVision = dynamic(() => import("@/components/sections/TheVision"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

import { Noise } from "@/components/Noise";
import { PixelGrid } from "@/components/PixelGrid";

export default function Home() {
  return (
    <main className="layout-wrapper">
      <PixelGrid />
      <Noise />
      <Navbar />
      <Hero />

      {/* ===== TEXT MANIFESTO ===== */}
      <div className="manifesto-layer relative">
        <Problem />
        <Answer />
        <HowItWorks />
        <TheStack />
        <TheVision />
        <Footer />
      </div>
    </main>
  );
}

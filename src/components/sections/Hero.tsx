"use client";

import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden" id="hero">
            {/* Video background */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_60%,#1a0840_0%,#0a0520_40%,var(--veyla-dark)_100%)]">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover object-center">
                    <source src="/hero-video.webm" type="video/webm" />
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.3)_0%,rgba(5,5,5,0.7)_70%,rgba(5,5,5,0.95)_100%),linear-gradient(to_bottom,transparent_0%,transparent_60%,var(--veyla-dark)_100%)]" />
            </div>

            {/* Center content */}
            <div className="relative z-[2] flex flex-col items-center text-center max-w-[800px] px-6">
                <FadeIn>
                    <h1 className="[font-family:var(--font-geist-pixel-square),monospace] text-[120px] font-medium tracking-[24px] text-white [text-shadow:0_0_80px_rgba(123,57,252,0.35),0_0_160px_rgba(123,57,252,0.1)] m-0 max-[1024px]:text-[100px] max-[1024px]:tracking-[20px] max-[768px]:text-[56px] max-[768px]:tracking-[10px] max-[480px]:text-[40px] max-[480px]:tracking-[6px]">
                        VEYLA
                    </h1>
                </FadeIn>
                <FadeIn delay={0.15}>
                    <p className="[font-family:'Instrument_Serif',serif] italic text-[28px] font-normal text-white/85 mt-6 leading-[1.4] max-[1024px]:text-[24px] max-[768px]:text-[22px] max-[480px]:text-[20px]">
                        Your assets, routed for maximum yield.
                    </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                    <p className="text-[16px] leading-[1.7] text-[var(--veyla-text-muted)] mt-4 max-w-[520px] max-[768px]:text-[14px]">
                        Deposit into one vault on Polkadot Hub. Veyla finds and captures
                        the best yields across every chain — automatically.
                    </p>
                </FadeIn>
                <FadeIn delay={0.45}>
                    <div className="flex gap-4 items-center mt-10 max-[768px]:flex-col max-[768px]:w-full max-[768px]:max-w-[280px]">
                        <Button variant="primary" shimmer>
                            Start Earning
                            <ArrowRight size={16} />
                        </Button>
                        <Button variant="secondary" href="#">Read Docs</Button>
                    </div>
                </FadeIn>
            </div>

            {/* Scroll indicator */}
            <FadeIn delay={0.7} className="absolute bottom-12 z-[2]">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] font-semibold tracking-[4px] uppercase text-[var(--veyla-text-dim)]">
                        Scroll
                    </span>
                    <div className="scroll-line" />
                </div>
            </FadeIn>
        </section>
    );
}

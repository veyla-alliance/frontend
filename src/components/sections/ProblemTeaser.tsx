"use client";

import { FadeIn } from "@/components/FadeIn";

export default function ProblemTeaser() {
    return (
        <section className="w-full px-20 py-20 flex flex-col items-center text-center max-md:px-6 max-md:py-15">
            <FadeIn>
                <span className="block text-[11px] font-semibold tracking-[3px] uppercase text-[var(--veyla-text-dim)] mb-6">
                    The Challenge
                </span>
            </FadeIn>
            <FadeIn delay={0.1}>
                <h2 className="[font-family:'Instrument_Serif',serif] italic text-[clamp(28px,4vw,48px)] font-normal leading-[1.25] tracking-[-0.5px] text-[var(--veyla-text-main)] max-w-[700px] mx-auto">
                    Yield is everywhere across Polkadot.{" "}
                    <span className="text-gradient">The problem is capturing it.</span>
                </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
                <p className="mt-5 text-[18px] leading-[1.7] text-[var(--veyla-text-muted)] max-w-[520px]">
                    Every parachain has its own pools, rates, and mechanics.
                    Managing them manually means bridge risk, idle capital, and constant overhead.
                </p>
            </FadeIn>
        </section>
    );
}

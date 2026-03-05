"use client";

import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const badge = "text-[11px] font-semibold tracking-[1.5px] uppercase text-[var(--veyla-text-dim)] bg-white/[0.03] border border-white/[0.07] px-[14px] py-[6px] rounded-full";

export default function CallToAction() {
    return (
        <section className="cta-section w-full px-4 sm:px-8 md:px-20 py-[120px] md:py-[160px] flex flex-col items-center text-center relative overflow-hidden" id="cta">
            <div className="cta-wordmark-bg" aria-hidden="true">VEYLA</div>

            <FadeIn>
                <h2 className="[font-family:'Instrument_Serif',serif] italic text-[clamp(32px,8vw,60px)] font-normal leading-[1.2] tracking-[clamp(-1px,-0.1vw,-0.5px)] text-[var(--veyla-text-main)] mb-10 max-w-[640px] relative z-10">
                    Ready to put your assets to work?
                </h2>
            </FadeIn>
            <FadeIn delay={0.15} className="relative z-10">
                <Button variant="primary" shimmer>
                    Launch App
                    <ArrowRight size={16} />
                </Button>
            </FadeIn>
            <FadeIn delay={0.3}>
                <div className="flex gap-3 items-center mt-12 flex-wrap justify-center relative z-10 max-md:gap-2">
                    <span className={badge}>Built on Polkadot</span>
                    <span className={badge}>Audited</span>
                    <span className={badge}>Open Source</span>
                </div>
            </FadeIn>
        </section>
    );
}

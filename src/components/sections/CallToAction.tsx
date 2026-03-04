"use client";

import { FadeIn } from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="cta-section" id="cta">
            <FadeIn>
                <h2 className="cta-heading">
                    Ready to put your assets to work?
                </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
                <button className="btn-primary btn-shimmer">
                    <span>Launch App</span>
                    <ArrowRight size={16} />
                </button>
            </FadeIn>
            <FadeIn delay={0.3}>
                <div className="cta-badges">
                    <span className="cta-badge">Built on Polkadot</span>
                    <div className="cta-badge-dot" />
                    <span className="cta-badge">Audited</span>
                    <div className="cta-badge-dot" />
                    <span className="cta-badge">Open Source</span>
                </div>
            </FadeIn>
        </section>
    );
}

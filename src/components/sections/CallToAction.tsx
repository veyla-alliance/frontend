"use client";

import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="cta-section" id="cta">
            <div className="cta-wordmark-bg" aria-hidden="true">VEYLA</div>

            <FadeIn>
                <h2 className="cta-heading">
                    Ready to put your assets to work?
                </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
                <Button variant="primary" shimmer>
                    Launch App
                    <ArrowRight size={16} />
                </Button>
            </FadeIn>
            <FadeIn delay={0.3}>
                <div className="cta-badges">
                    <span className="cta-badge">Built on Polkadot</span>
                    <span className="cta-badge">Audited</span>
                    <span className="cta-badge">Open Source</span>
                </div>
            </FadeIn>
        </section>
    );
}

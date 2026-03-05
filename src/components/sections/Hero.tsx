"use client";

import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="hero-cinematic" id="hero">
            <div className="hero-video-container">
                <video autoPlay loop muted playsInline className="hero-video" poster="/hero-placeholder.jpg">
                    <source src="/hero-video.webm" type="video/webm" />
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="hero-video-overlay" />
            </div>

            <div className="hero-center-content">
                <FadeIn>
                    <h1 className="hero-wordmark">VEYLA</h1>
                </FadeIn>
                <FadeIn delay={0.15}>
                    <p className="hero-headline">
                        Your assets, routed for maximum yield.
                    </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                    <p className="hero-subtitle">
                        Deposit into one vault on Polkadot Hub. Veyla finds and captures
                        the best yields across every chain — automatically.
                    </p>
                </FadeIn>
                <FadeIn delay={0.45}>
                    <div className="hero-ctas">
                        <Button variant="primary" shimmer>
                            Start Earning
                            <ArrowRight size={16} />
                        </Button>
                        <Button variant="secondary" href="#">Read Docs</Button>
                    </div>
                </FadeIn>
            </div>

            <FadeIn delay={0.7} className="scroll-indicator-container">
                <div className="scroll-indicator">
                    <span className="scroll-text">Scroll</span>
                    <div className="scroll-line" />
                </div>
            </FadeIn>
        </section>
    );
}

"use client";

import { FadeIn } from "@/components/FadeIn";

export default function ProblemTeaser() {
    return (
        <section className="problem-teaser">
            <FadeIn>
                <span className="problem-teaser-label">The Challenge</span>
            </FadeIn>
            <FadeIn delay={0.1}>
                <h2 className="problem-teaser-heading">
                    Yield is everywhere across Polkadot.{" "}
                    <span className="text-gradient">The problem is capturing it.</span>
                </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
                <p className="problem-teaser-body">
                    Every parachain has its own pools, rates, and mechanics.
                    Managing them manually means bridge risk, idle capital, and constant overhead.
                </p>
            </FadeIn>
        </section>
    );
}

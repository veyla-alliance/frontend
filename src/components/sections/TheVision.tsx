import { FadeIn } from "@/components/FadeIn";

export default function TheVision() {
    return (
        <section className="manifesto-section vision relative" id="the-vision">
            <div className="glow-blob glow-neon" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.1 }} />

            <FadeIn>
                <span className="section-label relative z-10">05 — The Vision</span>
            </FadeIn>
            <FadeIn delay={0.1}>
                <blockquote className="vision-quote relative z-10">
                    Building a future where managing assets across a thousand blockchains is as effortless as managing a single bank account.
                </blockquote>
            </FadeIn>
            <FadeIn delay={0.2}>
                <p className="vision-attribution relative z-10">— The Veyla Alliance</p>
            </FadeIn>
        </section>
    );
}

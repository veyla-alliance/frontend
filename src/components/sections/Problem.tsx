import { FadeIn } from "@/components/FadeIn";

export default function Problem() {
    return (
        <>
            <section className="manifesto-section relative" id="the-problem">
                {/* Ambient Glow */}
                <div className="glow-blob glow-neon" style={{ top: '-10%', left: '-5%' }} />

                <FadeIn>
                    <span className="section-label">01 — The Problem</span>
                </FadeIn>
                <FadeIn delay={0.1}>
                    <h2 className="manifesto-heading relative z-10">
                        Liquidity is <em>scattered</em><br />
                        across a thousand chains.
                    </h2>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <p className="manifesto-body relative z-10">
                        Every new parachain fragments the ecosystem further. Users are forced to manually hunt for the best yields, bridge assets through risky third-party protocols, and constantly monitor shifting APYs across dozens of platforms.
                    </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                    <p className="manifesto-body muted relative z-10">
                        The result? Billions in idle capital. Missed opportunities. Unnecessary complexity for the people who actually build and use DeFi.
                    </p>
                </FadeIn>
            </section>
            <div className="manifesto-divider" />
        </>
    );
}

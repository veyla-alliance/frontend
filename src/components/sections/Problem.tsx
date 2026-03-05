import { FadeIn } from "@/components/FadeIn";
import { TextReveal } from "@/components/TextReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Coins, AlertTriangle, Blocks } from "lucide-react";

/* Pre-generated positions to avoid SSR ↔ client hydration mismatch */
const DOT_POSITIONS = [
    { left: '18%', bottom: '32%', delay: '0.4s', opacity: 0.35 },
    { left: '72%', bottom: '58%', delay: '1.1s', opacity: 0.55 },
    { left: '33%', bottom: '15%', delay: '0.7s', opacity: 0.28 },
    { left: '85%', bottom: '42%', delay: '1.8s', opacity: 0.48 },
    { left: '51%', bottom: '78%', delay: '0.2s', opacity: 0.62 },
    { left: '12%', bottom: '65%', delay: '1.5s', opacity: 0.33 },
    { left: '67%', bottom: '22%', delay: '0.9s', opacity: 0.42 },
    { left: '28%', bottom: '88%', delay: '1.3s', opacity: 0.52 },
    { left: '90%', bottom: '72%', delay: '0.6s', opacity: 0.38 },
    { left: '45%', bottom: '45%', delay: '1.7s', opacity: 0.55 },
    { left: '58%', bottom: '12%', delay: '0.1s', opacity: 0.30 },
    { left: '22%', bottom: '52%', delay: '1.0s', opacity: 0.45 },
    { left: '78%', bottom: '35%', delay: '1.6s', opacity: 0.60 },
    { left: '40%', bottom: '82%', delay: '0.5s', opacity: 0.25 },
    { left: '62%', bottom: '28%', delay: '1.4s', opacity: 0.50 },
];

export default function Problem() {
    return (
        <>
            <section className="manifesto-section relative overflow-hidden" id="the-problem">
                {/* Ambient Glow */}
                <div className="glow-blob glow-neon" style={{ top: '-10%', left: '-5%' }} />

                <div className="relative z-10" style={{ textAlign: "left", marginBottom: "64px" }}>
                    <SectionHeader
                        label="01 — The Problem"
                        title={
                            <TextReveal delay={0.1}>
                                <span>
                                    Liquidity is <em className="text-gradient">scattered</em><br />
                                    across a thousand chains.
                                </span>
                            </TextReveal>
                        }
                        labelClassName="section-label"
                        titleClassName="manifesto-heading"
                    />
                </div>

                {/* BENTO GRID */}
                <div className="bento-grid relative z-10">
                    <FadeIn delay={0.2} className="bento-item bento-tall">
                        <div className="bento-icon-wrapper">
                            <Blocks className="text-gradient" size={24} color="#a06dfa" />
                        </div>
                        <h3 className="bento-title">Fragmented Ecosystem</h3>
                        <p className="bento-desc">
                            Every new parachain fragments the ecosystem further. Users are forced to manually hunt for the best yields across dozens of platforms.
                        </p>
                        <div className="bento-visual">
                            <div className="fake-dots-container">
                                {DOT_POSITIONS.map((dot, i) => (
                                    <div
                                        key={i}
                                        className="fake-dot"
                                        style={{
                                            left: dot.left,
                                            bottom: dot.bottom,
                                            animationDelay: dot.delay,
                                            opacity: dot.opacity,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3} className="bento-item">
                        <div className="bento-icon-wrapper">
                            <AlertTriangle size={24} color="#f87171" />
                        </div>
                        <h3 className="bento-title">Risky Bridging</h3>
                        <p className="bento-desc">
                            Bridge assets through risky third-party protocols, constantly tracking APYs and maintaining multiple wallets.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.4} className="bento-item">
                        <div className="bento-icon-wrapper">
                            <Coins size={24} color="#86868b" />
                        </div>
                        <h3 className="bento-title">Idle Capital</h3>
                        <p className="bento-desc">
                            Billions in idle capital. Missed opportunities. Unnecessary complexity for the people building DeFi.
                        </p>
                    </FadeIn>
                </div>
            </section>
            <div className="manifesto-divider" />
        </>
    );
}

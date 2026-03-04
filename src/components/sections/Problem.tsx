import { FadeIn } from "@/components/FadeIn";
import { TextReveal } from "@/components/TextReveal";
import { Coins, AlertTriangle, Blocks } from "lucide-react";

export default function Problem() {
    return (
        <>
            <section className="manifesto-section relative overflow-hidden" id="the-problem">
                {/* Ambient Glow */}
                <div className="glow-blob glow-neon" style={{ top: '-10%', left: '-5%' }} />

                <FadeIn>
                    <span className="section-label">01 — The Problem</span>
                </FadeIn>
                <TextReveal delay={0.1}>
                    <h2 className="manifesto-heading relative z-10" style={{ marginBottom: "64px" }}>
                        Liquidity is <em className="text-gradient">scattered</em><br />
                        across a thousand chains.
                    </h2>
                </TextReveal>

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
                                {[...Array(15)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="fake-dot"
                                        style={{
                                            left: `${Math.random() * 80 + 10}%`,
                                            bottom: `${Math.random() * 80 + 10}%`,
                                            animationDelay: `${Math.random() * 2}s`,
                                            opacity: Math.random() * 0.5 + 0.2
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

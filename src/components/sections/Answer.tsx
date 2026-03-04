import { FadeIn } from "@/components/FadeIn";
import { TextReveal } from "@/components/TextReveal";
import { Lock } from "lucide-react";

export default function Answer() {
    return (
        <>
            <section className="manifesto-section relative overflow-hidden" id="the-answer">
                {/* Ambient Glow */}
                <div className="glow-blob glow-purple" style={{ top: '20%', right: '-15%' }} />

                <FadeIn>
                    <span className="section-label">02 — The Answer</span>
                </FadeIn>
                <TextReveal delay={0.1}>
                    <h2 className="manifesto-heading-hero relative z-10">
                        One deposit.<br />
                        <span className="text-gradient-purple">Every chain.</span><br />
                        Maximum yield.
                    </h2>
                </TextReveal>

                <div className="bento-grid relative z-10" style={{ marginTop: "64px" }}>
                    <FadeIn delay={0.2} className="bento-item bento-col-span-2 bento-no-padding">
                        <div className="vault-container">
                            <div className="vault-orbit" />
                            <div className="vault-orbit" style={{ width: "400px", height: "400px", animationDirection: "reverse", animationDuration: "30s" }} />

                            {/* Particles flowing to center */}
                            {[...Array(8)].map((_, i) => (
                                <div key={i} style={{
                                    position: 'absolute',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: 'white',
                                    opacity: 0.4,
                                    filter: 'blur(1px)',
                                    top: '50%', left: '50%',
                                    transformOrigin: `${150 + Math.random() * 100}px center`,
                                    transform: `rotate(${i * 45}deg) translateX(-50%)`,
                                    animation: `spin-slow ${10 + Math.random() * 5}s linear infinite`
                                }}
                                />
                            ))}

                            <div className="vault-core">
                                <Lock size={32} color="#fff" />
                            </div>
                        </div>

                        <div className="vault-overlay">
                            <h3 className="vault-overlay-title">The Veyla Vault</h3>
                            <p className="vault-overlay-desc">
                                Veyla acts as your personal executive — you deposit once into the Vault on Polkadot Hub, and our automated routing engine continuously rebalances your assets across all chains. No bridges. No manual rebalancing.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>
            <div className="manifesto-divider" />
        </>
    );
}

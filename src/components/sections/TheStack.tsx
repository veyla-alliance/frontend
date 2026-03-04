import { FadeIn } from "@/components/FadeIn";
import { GlowingCard } from "@/components/GlowingCard";
import { Layers, Shield, Zap } from "lucide-react";

export default function TheStack() {
    return (
        <>
            <section className="manifesto-section relative overflow-hidden" id="the-stack">
                {/* Glow blob */}
                <div className="glow-blob glow-purple" style={{ bottom: '-15%', right: '-10%' }} />

                <FadeIn>
                    <span className="section-label relative z-10">04 — The Stack</span>
                </FadeIn>
                <FadeIn delay={0.1}>
                    <h2 className="manifesto-heading relative z-10">
                        Not just a DeFi app.<br />
                        A <em>core infrastructure</em> layer.
                    </h2>
                </FadeIn>

                <div className="stack-list relative z-10">
                    <FadeIn delay={0.15}>
                        <GlowingCard className="stack-item">
                            <div className="stack-header" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div className="web3-icon-wrap" style={{ marginBottom: 0 }}><Zap className="web3-icon" size={24} /></div>
                                <div>
                                    <span className="stack-tag">PVM</span>
                                    <h3 className="stack-title" style={{ marginTop: '8px' }}>PolkaVM Optimized</h3>
                                </div>
                            </div>
                            <p className="stack-desc" style={{ marginTop: '16px' }}>
                                The protocol utilizes precompiled contracts on PolkaVM for heavy routing calculations — making every asset transition computationally superior, with minimal gas fees and high-speed finality.
                            </p>
                        </GlowingCard>
                    </FadeIn>
                    <FadeIn delay={0.25}>
                        <GlowingCard className="stack-item">
                            <div className="stack-header" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div className="web3-icon-wrap" style={{ marginBottom: 0 }}><Layers className="web3-icon" size={24} /></div>
                                <div>
                                    <span className="stack-tag">XCM</span>
                                    <h3 className="stack-title" style={{ marginTop: '8px' }}>Native Interoperability</h3>
                                </div>
                            </div>
                            <p className="stack-desc" style={{ marginTop: '16px' }}>
                                Veyla bypasses third-party bridges entirely. All cross-chain operations rely solely on Polkadot&apos;s native XCM messaging — inheriting the relay chain&apos;s full security guarantees.
                            </p>
                        </GlowingCard>
                    </FadeIn>
                    <FadeIn delay={0.35}>
                        <GlowingCard className="stack-item">
                            <div className="stack-header" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div className="web3-icon-wrap" style={{ marginBottom: 0 }}><Shield className="web3-icon" size={24} /></div>
                                <div>
                                    <span className="stack-tag">OSS</span>
                                    <h3 className="stack-title" style={{ marginTop: '8px' }}>Open-Source Integrity</h3>
                                </div>
                            </div>
                            <p className="stack-desc" style={{ marginTop: '16px' }}>
                                Fully transparent codebase. Verified on-chain identity. Built in compliance with the Polkadot ecosystem&apos;s open standards and hackathon requirements.
                            </p>
                        </GlowingCard>
                    </FadeIn>
                </div>
            </section>
            <div className="manifesto-divider" />
        </>
    );
}

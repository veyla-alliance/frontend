import { FadeIn } from "@/components/FadeIn";
import { GlowingCard } from "@/components/GlowingCard";
import { TextReveal } from "@/components/TextReveal";
import { Search, Route, Wallet, Activity } from "lucide-react";

export default function HowItWorks() {
    return (
        <>
            <section className="manifesto-section relative overflow-hidden" id="how-it-works">
                {/* Glow Blob */}
                <div className="glow-blob glow-neon" style={{ top: '30%', left: '-15%' }} />

                <FadeIn>
                    <span className="section-label relative z-10">03 — How It Works</span>
                </FadeIn>
                <TextReveal delay={0.1}>
                    <h2 className="manifesto-heading relative z-10">
                        A simple workflow for the user.<br />
                        <em className="text-gradient">Sophisticated</em> under the hood.
                    </h2>
                </TextReveal>

                <div className="workflow-container relative z-10">
                    <div className="workflow-circuit-line">
                        <div className="workflow-particle" />
                    </div>

                    <FadeIn delay={0.15} className="workflow-step-wrapper">
                        <div className="workflow-node" />
                        <GlowingCard className="workflow-card">
                            <div className="workflow-icon-group">
                                <div className="web3-icon-wrap" style={{ marginBottom: 0 }}><Wallet className="web3-icon" size={24} /></div>
                                <span className="step-number" style={{ marginBottom: 0 }}>01</span>
                            </div>
                            <div className="workflow-content">
                                <h3 className="step-title">Deposit</h3>
                                <p className="step-desc">
                                    Users deposit assets — DOT, USDT, USDC — into a single gateway: the Veyla Vault on Polkadot Hub. One transaction. One entry point.
                                </p>
                            </div>
                        </GlowingCard>
                    </FadeIn>

                    <FadeIn delay={0.25} className="workflow-step-wrapper">
                        <div className="workflow-node" />
                        <GlowingCard className="workflow-card">
                            <div className="workflow-icon-group">
                                <div className="web3-icon-wrap" style={{ marginBottom: 0 }}><Search className="web3-icon" size={24} /></div>
                                <span className="step-number" style={{ marginBottom: 0 }}>02</span>
                            </div>
                            <div className="workflow-content">
                                <h3 className="step-title">Discover</h3>
                                <p className="step-desc">
                                    Veyla&apos;s backend intelligence continuously monitors staking, lending, and liquidity opportunities across every connected parachain — in real-time.
                                </p>
                            </div>
                        </GlowingCard>
                    </FadeIn>

                    <FadeIn delay={0.35} className="workflow-step-wrapper">
                        <div className="workflow-node" />
                        <GlowingCard className="workflow-card">
                            <div className="workflow-icon-group">
                                <div className="web3-icon-wrap" style={{ marginBottom: 0 }}><Route className="web3-icon" size={24} /></div>
                                <span className="step-number" style={{ marginBottom: 0 }}>03</span>
                            </div>
                            <div className="workflow-content">
                                <h3 className="step-title">Route</h3>
                                <p className="step-desc">
                                    Using XCM cross-chain messaging, Veyla automatically routes your liquidity to the parachain offering the highest risk-adjusted yield. No manual intervention needed.
                                </p>
                            </div>
                        </GlowingCard>
                    </FadeIn>

                    <FadeIn delay={0.45} className="workflow-step-wrapper">
                        <div className="workflow-node" />
                        <GlowingCard className="workflow-card">
                            <div className="workflow-icon-group">
                                <div className="web3-icon-wrap" style={{ marginBottom: 0 }}><Activity className="web3-icon" size={24} /></div>
                                <span className="step-number" style={{ marginBottom: 0 }}>04</span>
                            </div>
                            <div className="workflow-content">
                                <h3 className="step-title">Earn</h3>
                                <p className="step-desc">
                                    Yields are compounded and rebalanced automatically. As market conditions shift, Veyla re-routes to maintain optimal positioning. You earn more by doing less.
                                </p>
                            </div>
                        </GlowingCard>
                    </FadeIn>
                </div>
            </section>
            <div className="manifesto-divider" />
        </>
    );
}

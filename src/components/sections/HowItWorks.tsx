import { FadeIn } from "@/components/FadeIn";
import { GlowingCard } from "@/components/GlowingCard";
import { Search, Route, Wallet, Activity } from "lucide-react";

export default function HowItWorks() {
    return (
        <>
            <section className="manifesto-section relative" id="how-it-works">
                {/* Glow Blob */}
                <div className="glow-blob glow-neon" style={{ top: '30%', left: '-15%' }} />

                <FadeIn>
                    <span className="section-label relative z-10">03 — How It Works</span>
                </FadeIn>
                <FadeIn delay={0.1}>
                    <h2 className="manifesto-heading relative z-10">
                        A simple workflow for the user.<br />
                        <em>Sophisticated</em> under the hood.
                    </h2>
                </FadeIn>

                <div className="steps-grid relative z-10">
                    <FadeIn delay={0.15}>
                        <GlowingCard className="step-item">
                            <div className="web3-icon-wrap"><Wallet className="web3-icon" size={24} /></div>
                            <span className="step-number">01</span>
                            <h3 className="step-title">Deposit</h3>
                            <p className="step-desc">
                                Users deposit assets — DOT, USDT, USDC — into a single gateway: the Veyla Vault on Polkadot Hub. One transaction. One entry point.
                            </p>
                        </GlowingCard>
                    </FadeIn>
                    <FadeIn delay={0.25}>
                        <GlowingCard className="step-item">
                            <div className="web3-icon-wrap"><Search className="web3-icon" size={24} /></div>
                            <span className="step-number">02</span>
                            <h3 className="step-title">Discover</h3>
                            <p className="step-desc">
                                Veyla&apos;s backend intelligence continuously monitors staking, lending, and liquidity opportunities across every connected parachain — in real-time.
                            </p>
                        </GlowingCard>
                    </FadeIn>
                    <FadeIn delay={0.35}>
                        <GlowingCard className="step-item">
                            <div className="web3-icon-wrap"><Route className="web3-icon" size={24} /></div>
                            <span className="step-number">03</span>
                            <h3 className="step-title">Route</h3>
                            <p className="step-desc">
                                Using XCM cross-chain messaging, Veyla automatically routes your liquidity to the parachain offering the highest risk-adjusted yield. No manual intervention needed.
                            </p>
                        </GlowingCard>
                    </FadeIn>
                    <FadeIn delay={0.45}>
                        <GlowingCard className="step-item">
                            <div className="web3-icon-wrap"><Activity className="web3-icon" size={24} /></div>
                            <span className="step-number">04</span>
                            <h3 className="step-title">Earn</h3>
                            <p className="step-desc">
                                Yields are compounded and rebalanced automatically. As market conditions shift, Veyla re-routes to maintain optimal positioning. You earn more by doing less.
                            </p>
                        </GlowingCard>
                    </FadeIn>
                </div>
            </section>
            <div className="manifesto-divider" />
        </>
    );
}

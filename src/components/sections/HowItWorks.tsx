"use client";

import { FadeIn } from "@/components/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Wallet, Repeat, TrendingUp } from "lucide-react";

export default function HowItWorks() {
    return (
        <>
            <section className="flow-section relative" id="how-it-works">
                <div
                    className="glow-blob glow-purple"
                    style={{ top: "30%", right: "-15%" }}
                />

                <SectionHeader
                    label="How It Works"
                    title="Three steps. Zero complexity."
                    labelClassName="flow-section-label"
                    titleClassName="flow-section-heading"
                />

                <div className="flow-grid">
                    {/* Card 1: Deposit */}
                    <FadeIn delay={0.15} className="flow-card">
                        <div className="flow-card-icon">
                            <Wallet size={28} color="#c4a1ff" />
                        </div>
                        <span className="flow-card-number">01</span>
                        <h3 className="flow-card-title">Deposit</h3>
                        <p className="flow-card-desc">
                            Drop your assets into the Veyla Vault on Polkadot Hub.
                            One transaction. One entry point.
                        </p>
                    </FadeIn>

                    {/* Arrow 1 → */}
                    <FadeIn delay={0.3} className="flow-arrow">
                        <div className="flow-arrow-line">
                            <div className="flow-arrow-particle" />
                        </div>
                    </FadeIn>

                    {/* Card 2: Route */}
                    <FadeIn delay={0.35} className="flow-card">
                        <div className="flow-card-icon">
                            <Repeat size={28} color="#c4a1ff" />
                        </div>
                        <span className="flow-card-number">02</span>
                        <h3 className="flow-card-title">Route</h3>
                        <p className="flow-card-desc">
                            Veyla&apos;s engine finds the best yields across all
                            connected chains and routes your liquidity — automatically.
                        </p>
                    </FadeIn>

                    {/* Arrow 2 → */}
                    <FadeIn delay={0.5} className="flow-arrow">
                        <div className="flow-arrow-line">
                            <div
                                className="flow-arrow-particle"
                                style={{ animationDelay: "1.2s" }}
                            />
                        </div>
                    </FadeIn>

                    {/* Card 3: Earn */}
                    <FadeIn delay={0.55} className="flow-card">
                        <div className="flow-card-icon">
                            <TrendingUp size={28} color="#c4a1ff" />
                        </div>
                        <span className="flow-card-number">03</span>
                        <h3 className="flow-card-title">Earn</h3>
                        <p className="flow-card-desc">
                            Yields auto-compound and rebalance 24/7. Market shifts?
                            Veyla re-routes. You earn more by doing nothing.
                        </p>
                    </FadeIn>
                </div>
            </section>
            <div className="manifesto-divider" />
        </>
    );
}

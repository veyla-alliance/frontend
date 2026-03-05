"use client";

import { FadeIn } from "@/components/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shield, Zap, Code } from "lucide-react";

const BENEFITS = [
    {
        icon: Shield,
        title: "No Bridges",
        desc: "Zero third-party bridge risk. Everything runs on Polkadot\u2019s native XCM protocol \u2014 the most secure cross-chain messaging in crypto.",
    },
    {
        icon: Zap,
        title: "Fully Automated",
        desc: "Set it and forget it. Veyla monitors, rebalances, and re-routes your positions 24/7 as market conditions shift.",
    },
    {
        icon: Code,
        title: "Open Source",
        desc: "Every line of code is public. Built on PolkaVM for maximum transparency. Don\u2019t trust \u2014 verify.",
    },
];

export default function WhyVeyla() {
    return (
        <section className="why-section" id="why-veyla">
            <SectionHeader
                label="Why Veyla"
                title="Built different. By design."
                labelClassName="why-section-label"
                titleClassName="why-section-heading"
            />

            <div className="why-grid">
                {/* Tall card — No Bridges */}
                <FadeIn delay={0.15} className="why-card-tall">
                    <div className="why-card h-full">
                        <div className="why-card-icon">
                            <Shield size={24} color="#c4a1ff" />
                        </div>
                        <h3 className="why-card-title">No Bridges</h3>
                        <p className="why-card-desc">
                            {BENEFITS[0].desc}
                        </p>
                        <div className="xcm-visual">
                            <div className="xcm-hub">HUB</div>
                            <div className="xcm-line">
                                <span className="xcm-line-label">XCM</span>
                            </div>
                            <div className="xcm-chains">
                                <div className="xcm-chain">DOT</div>
                                <div className="xcm-chain">ASTR</div>
                                <div className="xcm-chain">HDX</div>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Right column — normal cards */}
                <FadeIn delay={0.25}>
                    <div className="why-card">
                        <div className="why-card-icon">
                            <Zap size={24} color="#c4a1ff" />
                        </div>
                        <h3 className="why-card-title">Fully Automated</h3>
                        <p className="why-card-desc">{BENEFITS[1].desc}</p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.35}>
                    <div className="why-card">
                        <div className="why-card-icon">
                            <Code size={24} color="#c4a1ff" />
                        </div>
                        <h3 className="why-card-title">Open Source</h3>
                        <p className="why-card-desc">{BENEFITS[2].desc}</p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

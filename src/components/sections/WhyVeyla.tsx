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
                {BENEFITS.map((benefit, i) => (
                    <FadeIn delay={0.15 + i * 0.1} key={i}>
                        <div className="why-card">
                            <div className="why-card-icon">
                                <benefit.icon size={24} color="#c4a1ff" />
                            </div>
                            <h3 className="why-card-title">{benefit.title}</h3>
                            <p className="why-card-desc">{benefit.desc}</p>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}

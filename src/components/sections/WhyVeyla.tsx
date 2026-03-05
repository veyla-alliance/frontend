"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shield, Zap, Code, type LucideIcon } from "lucide-react";

interface Benefit {
    icon: LucideIcon;
    title: string;
    description: string;
}

const BENEFITS: Benefit[] = [
    {
        icon: Shield,
        title: "No Bridges",
        description: "Zero third-party bridge risk. Everything runs on Polkadot\u2019s native XCM protocol \u2014 the most secure cross-chain messaging in crypto.",
    },
    {
        icon: Zap,
        title: "Fully Automated",
        description: "Set it and forget it. Veyla monitors, rebalances, and re-routes your positions 24/7 as market conditions shift.",
    },
    {
        icon: Code,
        title: "Open Source",
        description: "Every line of code is public. Built on PolkaVM for maximum transparency. Don\u2019t trust \u2014 verify.",
    },
];

const styles = {
    card: "p-10 flex flex-col gap-5 rounded-3xl bg-white/[0.02] border border-white/[0.06] transition-all duration-300 hover:bg-white/[0.04] hover:border-[rgba(123,57,252,0.2)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(123,57,252,0.12)] group",
    iconBox: "w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-[rgba(123,57,252,0.12)] to-[rgba(123,57,252,0.04)] border border-[rgba(123,57,252,0.15)] flex items-center justify-center transition-all duration-300 group-hover:border-[rgba(123,57,252,0.35)] group-hover:shadow-[0_0_24px_rgba(123,57,252,0.15)]",
    title: "text-[24px] font-semibold text-[var(--veyla-text-main)] tracking-[-0.3px] transition-colors duration-300 group-hover:text-white",
    description: "text-[17px] leading-[1.7] text-[var(--veyla-text-muted)]",
};

export default function WhyVeyla() {
    return (
        <section
            className="why-section w-full px-20 py-[160px] flex flex-col items-center max-lg:px-4 sm:px-6 max-lg:py-[100px]"
            id="why-veyla"
        >
            <SectionHeader
                label="Why Veyla"
                title="Built different. By design."
                labelClassName="block text-[14px] font-semibold tracking-[3px] uppercase text-[var(--veyla-purple)] mb-6"
                titleClassName="[font-family:'Instrument_Serif',serif] italic text-[clamp(36px,5vw,56px)] max-lg:mb-12"
            />

            <div className="grid grid-cols-2 gap-4 max-w-[1100px] w-full max-md:grid-cols-1">
                {/* Tall card — No Bridges + XCM Visual */}
                <FadeIn delay={0.15} className="row-span-2 max-md:row-span-1">
                    {(() => {
                        const { icon: Icon, title, description } = BENEFITS[0];
                        return (
                            <div className={cn(styles.card, "h-full")}>
                                <div className={styles.iconBox}>
                                    <Icon size={24} color="#c4a1ff" />
                                </div>
                                <h3 className={styles.title}>{title}</h3>
                                <p className={styles.description}>{description}</p>
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
                        );
                    })()}
                </FadeIn>

                {/* Standard cards */}
                {BENEFITS.slice(1).map(({ icon: Icon, title, description }, i) => (
                    <FadeIn key={title} delay={0.25 + i * 0.1}>
                        <div className={styles.card}>
                            <div className={styles.iconBox}>
                                <Icon size={24} color="#c4a1ff" />
                            </div>
                            <h3 className={styles.title}>{title}</h3>
                            <p className={styles.description}>{description}</p>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}

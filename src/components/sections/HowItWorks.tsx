"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Wallet, Repeat, TrendingUp } from "lucide-react";

const styles = {
    iconBox: "w-[72px] h-[72px] rounded-[20px] bg-gradient-to-br from-[rgba(123,57,252,0.1)] to-[rgba(123,57,252,0.02)] border border-[rgba(123,57,252,0.15)] flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:border-[rgba(123,57,252,0.35)] group-hover:shadow-[0_0_30px_rgba(123,57,252,0.15)] group-hover:-translate-y-0.5",
    stepNumber: "text-[15px] font-semibold text-[var(--veyla-text-dim)] tracking-[2px] mb-4 block",
    title: "text-[26px] font-semibold text-[var(--veyla-text-main)] mb-3 tracking-[-0.3px] transition-colors duration-300 group-hover:text-white",
    description: "text-[17px] leading-[1.7] text-[var(--veyla-text-muted)] max-w-[300px] mx-auto",
    card: "text-center px-4 group max-lg:max-w-[400px] max-lg:w-full",
    arrow: "flex items-center justify-center pt-9 max-lg:hidden",
    glowBlob: "absolute rounded-full pointer-events-none z-0 bg-[conic-gradient(from_180deg_at_50%_50%,#7b39fc_0deg,#3a1a7c_360deg)] w-[600px] h-[600px] blur-[120px] opacity-[0.15] max-md:hidden",
    previewBox: "mt-7 pt-5 border-t border-white/[0.05] flex flex-col items-center gap-2.5",
    previewLabel: "text-[12px] font-semibold tracking-[2px] uppercase text-[var(--veyla-text-dim)]",
    previewAmount: "text-[22px] font-bold text-[#4ade80] tracking-[-0.5px]",
    previewChains: "flex items-center justify-center gap-1.5",
    previewChain: "flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] py-1.5 px-2.5 rounded-[8px]",
    previewChainActive: "flex items-center gap-1.5 bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.25)] py-1.5 px-2.5 rounded-[8px]",
    previewChainText: "[font-family:var(--font-geist-pixel-square),monospace] text-[10px] tracking-[0.5px] text-[var(--veyla-text-dim)]",
    previewChainTextActive: "[font-family:var(--font-geist-pixel-square),monospace] text-[10px] tracking-[0.5px] text-[var(--veyla-cyan)]",
    previewChainLine: "w-[16px] h-px bg-white/10",
    previewApy: "text-[26px] font-extrabold text-[var(--veyla-cyan)] tracking-[-1px]",
};

export default function HowItWorks() {
    return (
        <>
            <section
                className="w-full px-4 sm:px-8 md:px-12 lg:px-20 py-[100px] md:py-[160px] flex flex-col items-center bg-[var(--veyla-dark)] relative"
                id="how-it-works"
            >
                <div className={styles.glowBlob} style={{ top: "30%", right: "-15%" }} />

                <SectionHeader
                    label="How It Works"
                    title="Three steps. Zero complexity."
                    labelClassName="block text-[14px] font-semibold tracking-[3px] uppercase text-[var(--veyla-purple)] mb-6"
                    titleClassName="[font-family:'Instrument_Serif',serif] italic text-[clamp(36px,5vw,56px)] max-lg:mb-12"
                />

                <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start w-full max-w-[1100px] max-lg:flex max-lg:flex-col max-lg:gap-10 max-lg:items-center">
                    {/* Step 1: Deposit */}
                    <FadeIn delay={0.15} className={styles.card}>
                        <div className={styles.iconBox}>
                            <Wallet size={28} color="#c4a1ff" />
                        </div>
                        <span className={styles.stepNumber}>01</span>
                        <h3 className={styles.title}>Deposit</h3>
                        <p className={styles.description}>
                            Drop your assets into the Veyla Vault on Polkadot Hub.
                            One transaction. One entry point.
                        </p>
                        <div className={styles.previewBox}>
                            <span className={styles.previewLabel}>Vault deposit</span>
                            <span className={styles.previewAmount}>+$1,000.00</span>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3} className={styles.arrow}>
                        <div className="flow-arrow-line">
                            <div className="flow-arrow-particle" />
                        </div>
                    </FadeIn>

                    {/* Step 2: Route */}
                    <FadeIn delay={0.35} className={styles.card}>
                        <div className={styles.iconBox}>
                            <Repeat size={28} color="#c4a1ff" />
                        </div>
                        <span className={styles.stepNumber}>02</span>
                        <h3 className={styles.title}>Route</h3>
                        <p className={styles.description}>
                            Veyla&apos;s engine finds the best yields across all
                            connected chains and routes your liquidity — automatically.
                        </p>
                        <div className={styles.previewBox}>
                            <span className={styles.previewLabel}>Best yield found</span>
                            <div className={styles.previewChains}>
                                <div className={styles.previewChain}>
                                    <div className="relative w-4 h-4 rounded-sm overflow-hidden shrink-0">
                                        <Image src="/polkadot.jpg" alt="Polkadot" fill className="object-cover" />
                                    </div>
                                    <span className={styles.previewChainText}>DOT</span>
                                </div>
                                <div className={styles.previewChainLine} />
                                <div className={styles.previewChainActive}>
                                    <div className="relative w-4 h-4 rounded-sm bg-white overflow-hidden shrink-0 border border-white/20">
                                        <Image src="/astar.jpg" alt="Astar" fill className="object-contain p-[1.5px]" />
                                    </div>
                                    <span className={styles.previewChainTextActive}>ASTR</span>
                                </div>
                                <div className={styles.previewChainLine} />
                                <div className={styles.previewChain}>
                                    <div className="relative w-4 h-4 rounded-sm overflow-hidden shrink-0">
                                        <Image src="/hydration.jpg" alt="Hydration" fill className="object-cover" />
                                    </div>
                                    <span className={styles.previewChainText}>HDX</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.5} className={styles.arrow}>
                        <div className="flow-arrow-line">
                            <div className="flow-arrow-particle" style={{ animationDelay: "1.2s" }} />
                        </div>
                    </FadeIn>

                    {/* Step 3: Earn */}
                    <FadeIn delay={0.55} className={styles.card}>
                        <div className={styles.iconBox}>
                            <TrendingUp size={28} color="#c4a1ff" />
                        </div>
                        <span className={styles.stepNumber}>03</span>
                        <h3 className={styles.title}>Earn</h3>
                        <p className={styles.description}>
                            Yields auto-compound and rebalance 24/7. Market shifts?
                            Veyla re-routes. You earn more by doing nothing.
                        </p>
                        <div className={styles.previewBox}>
                            <span className={styles.previewLabel}>Current APY</span>
                            <span className={styles.previewApy}>12.4%</span>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20">
                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </div>
        </>
    );
}

"use client";

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
};

export default function HowItWorks() {
    return (
        <>
            <section
                className="w-full px-4 sm:px-8 md:px-12 lg:px-20 py-[100px] md:py-[160px] flex flex-col items-center bg-[var(--veyla-dark)] relative"
                id="how-it-works"
            >
                <div className="glow-blob glow-purple" style={{ top: "30%", right: "-15%" }} />

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
                        <div className="flow-card-preview">
                            <span className="flow-preview-label">Vault deposit</span>
                            <span className="flow-preview-amount">+$1,000.00</span>
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
                        <div className="flow-card-preview">
                            <span className="flow-preview-label">Best yield found</span>
                            <div className="flow-preview-chains">
                                <div className="flow-preview-chain">DOT</div>
                                <div className="flow-preview-chain-line" />
                                <div className="flow-preview-chain flow-preview-chain-active">ASTR</div>
                                <div className="flow-preview-chain-line" />
                                <div className="flow-preview-chain">HDX</div>
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
                        <div className="flow-card-preview">
                            <span className="flow-preview-label">Current APY</span>
                            <span className="flow-preview-apy">12.4%</span>
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

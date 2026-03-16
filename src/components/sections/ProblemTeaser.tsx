"use client";

import { FadeIn } from "@/components/FadeIn";

export default function ProblemTeaser() {
    return (
        <section className="w-full px-4 sm:px-8 md:px-12 lg:px-20 py-16 md:py-32 flex flex-col items-center text-center">
            <FadeIn>
                <span className="block text-[11px] font-semibold tracking-[3px] uppercase text-[var(--veyla-text-dim)] mb-6">
                    The Challenge
                </span>
            </FadeIn>
            <FadeIn delay={0.1}>
                <h2 className="[font-family:'Instrument_Serif',serif] italic text-[clamp(28px,4vw,48px)] font-normal leading-[1.25] tracking-[-0.5px] text-[var(--veyla-text-main)] max-w-[700px] mx-auto">
                    Yield is everywhere across Polkadot.{" "}
                    <span className="text-gradient">The problem is capturing it.</span>
                </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
                <p className="mt-5 text-[18px] leading-[1.7] text-[var(--veyla-text-muted)] max-w-[520px]">
                    Every parachain has its own pools, rates, and mechanics.
                    Managing them manually means bridge risk, idle capital, and constant overhead.
                </p>
            </FadeIn>
            <FadeIn delay={0.3}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {[
                        { label: "XCM Native", desc: "No bridges" },
                        { label: "PolkaVM", desc: "Solidity \u2192 Rust" },
                        { label: "Shared Security", desc: "Relay chain" },
                    ].map(({ label, desc }) => (
                        <div
                            key={label}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.07]"
                        >
                            <span className="text-[13px] font-semibold text-[var(--veyla-text-main)]">{label}</span>
                            <span className="text-[11px] text-[var(--veyla-text-dim)]">{desc}</span>
                        </div>
                    ))}
                </div>
            </FadeIn>
            <FadeIn delay={0.4}>
                <div className="mt-12 grid grid-cols-2 gap-3 max-w-[600px] w-full max-sm:grid-cols-1">
                    {/* Left: Traditional */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="block text-[11px] font-semibold tracking-[2px] uppercase text-[#f87171] mb-4">
                            Traditional Aggregator
                        </span>
                        <ul className="space-y-2.5 text-[14px] text-[var(--veyla-text-dim)] leading-[1.6]">
                            <li className="flex items-start gap-2">
                                <span className="text-[#f87171] shrink-0 mt-0.5">&times;</span>
                                <span>Bridge-dependent routing</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#f87171] shrink-0 mt-0.5">&times;</span>
                                <span>Wrapped/synthetic tokens</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#f87171] shrink-0 mt-0.5">&times;</span>
                                <span>Off-chain keeper bots</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#f87171] shrink-0 mt-0.5">&times;</span>
                                <span>Fork of Yearn/Beefy</span>
                            </li>
                        </ul>
                    </div>
                    {/* Right: Veyla */}
                    <div className="p-5 rounded-2xl bg-[rgba(123,57,252,0.04)] border border-[rgba(123,57,252,0.15)]">
                        <span className="block text-[11px] font-semibold tracking-[2px] uppercase text-[var(--veyla-purple-soft)] mb-4">
                            Veyla Protocol
                        </span>
                        <ul className="space-y-2.5 text-[14px] text-[var(--veyla-text-muted)] leading-[1.6]">
                            <li className="flex items-start gap-2">
                                <span className="text-[#4ade80] shrink-0 mt-0.5">✓</span>
                                <span>XCM native — zero bridge risk</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#4ade80] shrink-0 mt-0.5">✓</span>
                                <span>Native assets via precompiles</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#4ade80] shrink-0 mt-0.5">✓</span>
                                <span>On-chain yield accounting</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#4ade80] shrink-0 mt-0.5">✓</span>
                                <span>Built from scratch on PolkaVM</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}

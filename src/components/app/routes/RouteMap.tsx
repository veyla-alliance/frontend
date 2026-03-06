"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CHAINS, ChainNode } from "./ChainNode";

// Y positions (0–100) for each chain line endpoint in SVG space.
// Approximates the vertical center of each compact ChainNode row
// (node height ~40px, gap 12px → total 196px → centers at ~10%, 37%, 63%, 90%).
const CHAIN_YS = [10, 37, 63, 90] as const;

interface ParticleProps {
    toY: number;
    active: boolean;
    delay: number;
}

function Particle({ toY, active, delay }: ParticleProps) {
    return (
        <motion.circle
            r={active ? 1.2 : 0.8}
            fill={active ? "#00d4ff" : "rgba(255,255,255,0.4)"}
            style={active ? { filter: "drop-shadow(0 0 2px #00d4ff)" } : undefined}
            animate={{
                cx: [0, 100],
                cy: [50, toY],
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                duration: active ? 2.5 : 4.5,
                delay,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.1, 0.9, 1],
            }}
        />
    );
}

export function RouteMap() {
    const [tabVisible, setTabVisible] = useState(true);

    useEffect(() => {
        const handler = () => setTabVisible(!document.hidden);
        document.addEventListener("visibilitychange", handler);
        return () => document.removeEventListener("visibilitychange", handler);
    }, []);

    return (
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
                <div>
                    <h2 className="text-[16px] font-semibold text-[var(--veyla-text-main)]">
                        Live Routing Map
                    </h2>
                    <p className="text-[14px] text-[var(--veyla-text-dim)] mt-0.5">
                        Real-time XCM route selection
                    </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(74,222,128,0.08)] border border-[rgba(74,222,128,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                    <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] text-[#4ade80] tracking-[1px]">
                        LIVE
                    </span>
                </div>
            </div>

            <div className="p-5">
                {/* Mobile: simple stacked list */}
                <div className="flex flex-col gap-2 md:hidden">
                    {CHAINS.map((chain) => (
                        <ChainNode key={chain.id} chain={chain} />
                    ))}
                </div>

                {/* Desktop: hub-and-spoke visualization */}
                <div
                    className="hidden md:grid gap-5"
                    style={{ gridTemplateColumns: "auto 1fr auto" }}
                >
                    {/* HUB node — vertically centered via flex */}
                    <div className="flex items-center">
                        <div className="relative">
                            {/* Purple glow behind */}
                            <div className="absolute inset-0 rounded-xl bg-[rgba(123,57,252,0.25)] blur-2xl -z-10 scale-[1.6]" />
                            <div className="px-3 py-2 rounded-xl bg-[rgba(123,57,252,0.1)] border border-[rgba(123,57,252,0.3)]">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-8 h-8 flex items-center justify-center">
                                        <Image src="/veyla-purple-icon.svg" alt="Veyla Logo" fill />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SVG connecting area — stretches to chain column height */}
                    <div className="relative self-stretch min-h-[160px]">
                        <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            {CHAINS.map((chain, i) => (
                                <g key={chain.id}>
                                    {/* Connecting line */}
                                    <line
                                        x1={0}
                                        y1={50}
                                        x2={100}
                                        y2={CHAIN_YS[i]}
                                        stroke={
                                            chain.active
                                                ? "#00d4ff"
                                                : "rgba(255,255,255,0.2)"
                                        }
                                        strokeWidth={chain.active ? 0.5 : 0.4}
                                        strokeDasharray={
                                            chain.active ? undefined : "2 2"
                                        }
                                    />
                                    {/* Animated particle — unmounted when tab is hidden to save CPU */}
                                    {tabVisible && (
                                        <Particle
                                            toY={CHAIN_YS[i]}
                                            active={chain.active}
                                            delay={i * 0.9}
                                        />
                                    )}
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Chain nodes column */}
                    <div className="flex flex-col gap-3 min-w-[220px]">
                        {CHAINS.map((chain) => (
                            <ChainNode key={chain.id} chain={chain} compact />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

interface Stat {
    value: number;
    suffix: string;
    prefix: string;
    label: string;
    decimals: number;
}

const STATS: Stat[] = [
    { value: 2.4, suffix: "M", prefix: "$", label: "TVL", decimals: 1 },
    { value: 12.4, suffix: "%", prefix: "", label: "AVG APY", decimals: 1 },
    { value: 6, suffix: "", prefix: "", label: "CHAINS", decimals: 0 },
    { value: 99.9, suffix: "%", prefix: "", label: "UPTIME", decimals: 1 },
];

const COUNTER_DURATION_MS = 2_000;

function AnimatedCounter({ value, suffix, prefix, decimals, shouldAnimate }: Stat & { shouldAnimate: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldAnimate) return;

        const startTime = performance.now();
        const animate = (now: number) => {
            const progress = Math.min((now - startTime) / COUNTER_DURATION_MS, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * value);
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [shouldAnimate, value]);

    return (
        <span className="text-[clamp(28px,4vw,32px)] font-bold text-[var(--veyla-cyan)] tracking-[-0.5px]">
            {prefix}{count.toFixed(decimals)}{suffix}
        </span>
    );
}

export default function ProofBar() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <section
            ref={ref}
            className="w-full max-w-7xl mx-auto relative z-10 border border-white/[0.08] rounded-[20px] bg-[rgba(8,8,14,0.75)] backdrop-blur-[24px] p-6 sm:p-9 md:p-12 shadow-[0_0_0_1px_rgba(123,57,252,0.1),0_32px_64px_rgba(0,0,0,0.45),0_0_80px_rgba(123,57,252,0.07)]"
        >
            <div className="grid grid-cols-4 gap-8 max-[768px]:grid-cols-2 max-[768px]:gap-7">
                {STATS.map((stat, i) => (
                    <div className="flex flex-col items-center text-center gap-2" key={stat.label}>
                        <AnimatedCounter {...stat} shouldAnimate={isInView} />
                        <span className="text-[11px] font-semibold tracking-[3px] uppercase text-[var(--veyla-text-dim)]">
                            {stat.label}
                        </span>
                        <div className="w-12 h-[2px] bg-[rgba(0,212,255,0.1)] rounded-[2px] overflow-hidden mt-1">
                            <div
                                className="proof-stat-bar-fill"
                                style={{
                                    animationDelay: `${i * 0.2}s`,
                                    animationPlayState: isInView ? "running" : "paused",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

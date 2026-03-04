"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";

const STATS = [
    { value: 2.4, suffix: "M", prefix: "$", label: "TVL", decimals: 1 },
    { value: 12.4, suffix: "%", prefix: "", label: "AVG APY", decimals: 1 },
    { value: 6, suffix: "", prefix: "", label: "CHAINS", decimals: 0 },
    { value: 99.9, suffix: "%", prefix: "", label: "UPTIME", decimals: 1 },
];

function AnimatedCounter({
    value,
    suffix,
    prefix,
    decimals,
    shouldAnimate,
}: {
    value: number;
    suffix: string;
    prefix: string;
    decimals: number;
    shouldAnimate: boolean;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldAnimate) return;

        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * value);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [shouldAnimate, value]);

    return (
        <span className="proof-stat-value">
            {prefix}
            {count.toFixed(decimals)}
            {suffix}
        </span>
    );
}

export default function ProofBar() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <section className="proof-bar" ref={ref}>
            <div className="proof-bar-inner">
                {STATS.map((stat, i) => (
                    <div className="proof-stat" key={i}>
                        <AnimatedCounter {...stat} shouldAnimate={isInView} />
                        <span className="proof-stat-label">{stat.label}</span>
                        <div className="proof-stat-bar">
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

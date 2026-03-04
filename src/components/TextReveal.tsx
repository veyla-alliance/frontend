"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const TextReveal = ({ children, className = "", delay = 0 }: TextRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <div ref={ref} className={`text-reveal-wrapper ${className}`}>
            <motion.div
                initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
                animate={isInView ? { y: 0, opacity: 1, filter: "blur(0px)" } : { y: 30, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
};

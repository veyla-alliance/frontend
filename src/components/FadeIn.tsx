"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

const DESKTOP_TRANSITION = {
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1],
} as const;

const MOBILE_TRANSITION = {
    duration: 0.4,
    ease: [0.16, 1, 0.3, 1],
} as const;

export const FadeIn = ({ children, delay = 0, className }: FadeInProps) => {
    const prefersReducedMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    const transition = isMobile ? MOBILE_TRANSITION : DESKTOP_TRANSITION;
    const mobileDelay = Math.min(delay, 0.1);

    return (
        <motion.div
            initial={{ opacity: 0, y: isMobile ? 12 : 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...transition, delay: isMobile ? mobileDelay : delay }}
            style={{ willChange: "opacity, transform" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

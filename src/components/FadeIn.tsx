"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

const TRANSITION = {
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1] as const,
};

export const FadeIn = ({ children, delay = 0, className }: FadeInProps) => {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...TRANSITION, delay }}
            style={{ willChange: "opacity, transform" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

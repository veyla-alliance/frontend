"use client";

import { motion } from "framer-motion";

export const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "opacity, transform" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

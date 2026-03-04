"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GlowingCardProps {
    children: React.ReactNode;
    className?: string;
}

export const GlowingCard = ({ children, className = "" }: GlowingCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`glowing-card-wrapper ${className}`}
        >
            <div
                className="glowing-card-border"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(
                        600px circle at ${mousePosition.x}px ${mousePosition.y}px,
                        var(--veyla-purple),
                        transparent 40%
                    )`,
                }}
            />
            <div
                className="glowing-card-inner-glow"
                style={{
                    opacity: isHovered ? window.innerWidth > 768 ? 1 : 0 : 0, // only show inner glow on hover (and desktop) to not clash with mobile tap
                    background: `radial-gradient(
                        400px circle at ${mousePosition.x}px ${mousePosition.y}px,
                        var(--veyla-purple-glow),
                        transparent 50%
                    )`,
                }}
            />
            <div className="glowing-card-content">
                {children}
            </div>
        </motion.div>
    );
};

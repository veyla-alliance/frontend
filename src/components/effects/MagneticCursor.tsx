"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const MagneticCursor = () => {
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useSpring(0, { damping: 25, stiffness: 120, mass: 0.5 });
    const cursorY = useSpring(0, { damping: 25, stiffness: 120, mass: 0.5 });

    useEffect(() => {
        // Only show on desktop
        if (window.innerWidth <= 768) return;

        const moveCursor = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            cursorX.set(e.clientX - 200); // offset by half the width
            cursorY.set(e.clientY - 200); // offset by half the height
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <motion.div
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                x: cursorX,
                y: cursorY,
                width: 400,
                height: 400,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(123, 57, 252, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
                pointerEvents: "none",
                zIndex: 0,
                filter: "blur(40px)",
                willChange: "transform",
            }}
        />
    );
};

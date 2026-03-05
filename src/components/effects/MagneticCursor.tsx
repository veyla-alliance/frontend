"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const SIZE = 400;
const OFFSET = SIZE / 2;
const MOBILE_BREAKPOINT = 768;
const SPRING_CONFIG = { damping: 25, stiffness: 120, mass: 0.5 };

export const MagneticCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useSpring(0, SPRING_CONFIG);
    const cursorY = useSpring(0, SPRING_CONFIG);

    useEffect(() => {
        if (window.innerWidth <= MOBILE_BREAKPOINT) return;

        const onMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            cursorX.set(e.clientX - OFFSET);
            cursorY.set(e.clientY - OFFSET);
        };
        const hide = () => setIsVisible(false);
        const show = () => setIsVisible(true);

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseleave", hide);
        document.addEventListener("mouseenter", show);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", hide);
            document.removeEventListener("mouseenter", show);
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
                width: SIZE,
                height: SIZE,
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

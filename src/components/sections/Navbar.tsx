"use client";

import { Button } from "@/components/ui/Button";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export default function Navbar() {
    const { scrollY } = useScroll();

    // Transform values based on scroll position (0px to 50px)
    const background = useTransform(scrollY, [0, 50], ["rgba(5, 5, 8, 0)", "rgba(5, 5, 8, 0.8)"]);
    const backdropBlur = useTransform(scrollY, [0, 50], [0, 20]);
    const borderColor = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.06)"]);

    // Create a composite property for the backdrop filter
    const filter = useMotionTemplate`blur(${backdropBlur}px)`;

    return (
        <motion.div
            className="navbar-wrapper"
            style={{
                background,
                backdropFilter: filter,
                WebkitBackdropFilter: filter,
                borderBottomColor: borderColor
            }}
        >
            <header className="navbar-new">
                <a href="#" className="nav-logo" aria-label="Veyla Home">VEYLA</a>
                <div className="nav-right">
                    <a href="#" className="nav-link">Docs</a>
                    <Button variant="navbar" shimmer>Launch App</Button>
                </div>
            </header>
        </motion.div>
    );
}

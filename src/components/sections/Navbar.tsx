"use client";

import { Button } from "@/components/ui/Button";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export default function Navbar() {
    const { scrollY } = useScroll();

    const background = useTransform(scrollY, [0, 50], ["rgba(5, 5, 8, 0)", "rgba(5, 5, 8, 0.8)"]);
    const backdropBlur = useTransform(scrollY, [0, 50], [0, 20]);
    const borderColor = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.06)"]);

    const filter = useMotionTemplate`blur(${backdropBlur}px)`;

    return (
        <motion.div
            className="fixed top-0 left-0 w-full z-[100] py-5 border-b border-transparent"
            style={{
                background,
                backdropFilter: filter,
                WebkitBackdropFilter: filter,
                borderBottomColor: borderColor
            }}
        >
            <header className="w-full max-w-[1400px] mx-auto px-12 flex justify-between items-center max-[768px]:px-5">
                <a
                    href="#"
                    className="[font-family:var(--font-geist-pixel-square),monospace] text-[15px] font-medium text-white/70 tracking-[4px] no-underline transition-colors duration-300 hover:text-white"
                    aria-label="Veyla Home"
                >
                    VEYLA
                </a>
                <div className="flex gap-7 items-center">
                    <a
                        href="#"
                        className="text-[15px] text-white/50 no-underline transition-colors duration-300 hover:text-white"
                    >
                        Docs
                    </a>
                    <Button variant="navbar" shimmer>Launch App</Button>
                </div>
            </header>
        </motion.div>
    );
}

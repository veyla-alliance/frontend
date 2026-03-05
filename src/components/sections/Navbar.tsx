"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

const SCROLL_RANGE = [0, 50] as const;

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const background = useTransform(scrollY, [...SCROLL_RANGE], ["rgba(5, 5, 8, 0)", isMobile ? "rgba(5, 5, 8, 0.95)" : "rgba(5, 5, 8, 0.8)"]);
    const backdropBlur = useTransform(scrollY, [...SCROLL_RANGE], [0, isMobile ? 0 : 20]);
    const borderColor = useTransform(scrollY, [...SCROLL_RANGE], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.06)"]);
    const filter = useMotionTemplate`blur(${backdropBlur}px)`;

    return (
        <motion.div
            className="fixed top-0 left-0 w-full z-[100] py-5 border-b border-transparent"
            style={{
                background,
                backdropFilter: filter,
                WebkitBackdropFilter: filter,
                borderBottomColor: borderColor,
            }}
        >
            <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center max-[768px]:px-5 max-[480px]:px-4">
                <Link
                    href="/"
                    className="[font-family:var(--font-geist-pixel-square),monospace] text-[15px] font-medium text-white/70 tracking-[4px] no-underline transition-colors duration-300 hover:text-white max-[480px]:text-[12px] max-[320px]:text-[10px]"
                    aria-label="Veyla Home"
                >
                    VEYLA
                </Link>
                <div className="flex gap-7 items-center max-[480px]:gap-4">
                    <a
                        href="#"
                        className="text-[15px] text-white/50 no-underline transition-colors duration-300 hover:text-white"
                    >
                        Docs
                    </a>
                    <Button variant="navbar" href="/app" shimmer>Launch App</Button>
                </div>
            </header>
        </motion.div>
    );
}

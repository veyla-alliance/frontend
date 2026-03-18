"use client";

import { useEffect, useRef } from "react";

const SECTIONS = [
    "hero",
    "problem",
    "how-it-works",
    "under-the-hood",
    "cta",
];

/**
 * Demo recording helper — press Tab to smooth-scroll to the next section.
 * Shift+Tab goes back. Delete this component after recording.
 */
export function DemoScroller() {
    const indexRef = useRef(0);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key !== "Tab") return;
            e.preventDefault();

            if (e.shiftKey) {
                indexRef.current = Math.max(0, indexRef.current - 1);
            } else {
                indexRef.current = Math.min(SECTIONS.length - 1, indexRef.current + 1);
            }

            const id = SECTIONS[indexRef.current];
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return null;
}

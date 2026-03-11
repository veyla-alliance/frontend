"use client";

import Image from "next/image";
import Link from "next/link";
import { Wrench } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// 🔧 MAINTENANCE MODE
// Set to `true` to block all /app routes and show the maintenance screen.
// Set back to `false` when the fix is deployed.
// ─────────────────────────────────────────────────────────────────────────────
export const MAINTENANCE_MODE = false;

// ─────────────────────────────────────────────────────────────────────────────

function MaintenancePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[var(--veyla-dark)] px-6 text-center relative overflow-hidden">
            {/* Glow blobs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[rgba(123,57,252,0.08)] blur-[120px]" />
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-[rgba(0,212,255,0.05)] blur-[100px]" />
            </div>

            {/* Icon badge */}
            <div className="relative mb-8 flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(123,57,252,0.1)] border border-[rgba(123,57,252,0.2)]">
                <Wrench size={28} className="text-[var(--veyla-purple-soft)]" />
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mb-8 no-underline group">
                <div className="relative w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                    <Image src="/veyla-icon.svg" alt="Veyla" fill />
                </div>
                <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[16px] tracking-[4px] text-white/50 group-hover:text-white/80 transition-colors duration-200">
                    VEYLA
                </span>
            </Link>

            <h1 className="text-[28px] md:text-[36px] font-bold text-[var(--veyla-text-main)] tracking-[-0.5px] mb-3">
                Under Maintenance
            </h1>
            <p className="text-[16px] text-[var(--veyla-text-dim)] max-w-[420px] leading-[1.7] mb-10">
                We&apos;re patching a deposit issue to make sure your funds are always handled correctly.
                The app will be back shortly — no funds are at risk.
            </p>

            {/* Status pill */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[rgba(250,204,21,0.06)] border border-[rgba(250,204,21,0.2)] mb-8">
                <span className="w-2 h-2 rounded-full bg-[#facc15] animate-pulse shrink-0" />
                <span className="text-[13px] font-medium text-[#facc15] tracking-[0.3px]">
                    Fix in progress
                </span>
            </div>

            <Link
                href="/"
                className="text-[14px] text-[var(--veyla-text-dim)] hover:text-[var(--veyla-text-muted)] transition-colors duration-150 underline underline-offset-4"
            >
                ← Back to homepage
            </Link>
        </div>
    );
}

export function MaintenanceGuard({ children }: { children: React.ReactNode }) {
    if (MAINTENANCE_MODE) {
        return <MaintenancePage />;
    }
    return <>{children}</>;
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Vault, Route, History } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/app", icon: LayoutDashboard },
    { label: "Vault", href: "/app/vault", icon: Vault },
    { label: "Routes", href: "/app/routes", icon: Route },
    { label: "History", href: "/app/history", icon: History },
] as const;

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[240px] shrink-0 h-screen flex flex-col bg-[#07070d] border-r border-white/[0.06] max-lg:hidden">
            {/* Logo */}
            <div className="px-6 py-5 border-b border-white/[0.05]">
                <Link
                    href="/"
                    className="flex items-center gap-3 group [font-family:var(--font-geist-pixel-square),monospace] text-[15px] font-medium text-white/70 tracking-[4px] no-underline transition-all duration-200 hover:text-white"
                >
                    <div className="relative w-6 h-6 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                        <Image src="/veyla-icon.svg" alt="Veyla Logo" fill />
                    </div>
                    VEYLA
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
                {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 no-underline group relative",
                                isActive
                                    ? "bg-[rgba(123,57,252,0.1)] text-white border border-[rgba(123,57,252,0.15)]"
                                    : "text-[var(--veyla-text-muted)] hover:text-white hover:bg-white/[0.04] border border-transparent"
                            )}
                        >
                            <Icon
                                size={16}
                                className={cn(
                                    "shrink-0 transition-colors duration-150",
                                    isActive ? "text-[var(--veyla-purple-soft)]" : "text-[var(--veyla-text-dim)] group-hover:text-[var(--veyla-text-muted)]"
                                )}
                            />
                            {label}
                            {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--veyla-purple)] rounded-r-full" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Network badge */}
            <div className="px-4 py-4 border-t border-white/[0.05]">
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] shrink-0" />
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] font-semibold text-[var(--veyla-text-muted)] tracking-[0.5px]">
                            Passet Hub
                        </span>
                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] text-[var(--veyla-text-dim)] tracking-[1px]">
                            TESTNET
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

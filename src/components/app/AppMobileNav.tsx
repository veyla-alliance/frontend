"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Vault, Route, History, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/app", icon: LayoutDashboard },
    { label: "Vault", href: "/app/vault", icon: Vault },
    { label: "Routes", href: "/app/routes", icon: Route },
    { label: "History", href: "/app/history", icon: History },
] as const;

export function AppMobileNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Close on route change
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--veyla-text-muted)] hover:text-white hover:bg-white/[0.06] transition-all duration-150"
                aria-label="Toggle navigation"
            >
                {open ? <X size={18} /> : <Menu size={18} />}
            </button>

            {open && (
                <>
                    <div
                        className="fixed inset-0 z-[90] bg-black/50"
                        onClick={() => setOpen(false)}
                    />
                    <nav className="fixed top-16 left-0 right-0 z-[91] bg-[#07070d] border-b border-white/[0.06] p-3 flex flex-col gap-0.5">
                        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] font-medium transition-all duration-150 no-underline",
                                        isActive
                                            ? "bg-[rgba(123,57,252,0.1)] text-white border border-[rgba(123,57,252,0.15)]"
                                            : "text-[var(--veyla-text-muted)] hover:text-white hover:bg-white/[0.04] border border-transparent"
                                    )}
                                >
                                    <Icon
                                        size={16}
                                        className={cn(
                                            "shrink-0",
                                            isActive ? "text-[var(--veyla-purple-soft)]" : "text-[var(--veyla-text-dim)]"
                                        )}
                                    />
                                    {label}
                                </Link>
                            );
                        })}

                        {/* Network badge */}
                        <div className="mt-2 mx-1 flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                            <span className="w-2 h-2 rounded-full bg-[#4ade80] shrink-0" />
                            <span className="text-[13px] font-semibold text-[var(--veyla-text-muted)] tracking-[0.5px]">
                                Passet Hub
                            </span>
                            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] text-[var(--veyla-text-dim)] tracking-[1px]">
                                TESTNET
                            </span>
                        </div>
                    </nav>
                </>
            )}
        </div>
    );
}

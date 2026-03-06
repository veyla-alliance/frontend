"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Vault, Route, History } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/app", icon: LayoutDashboard },
    { label: "Vault", href: "/app/vault", icon: Vault },
    { label: "Routes", href: "/app/routes", icon: Route },
    { label: "History", href: "/app/history", icon: History },
] as const;

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#07070d]/95 backdrop-blur-md border-t border-white/[0.06]">
            <div className="flex items-center justify-around px-2 py-2">
                {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-150 no-underline",
                                isActive
                                    ? "text-[var(--veyla-purple-soft)]"
                                    : "text-[var(--veyla-text-dim)]"
                            )}
                        >
                            <Icon
                                size={20}
                                className={
                                    isActive
                                        ? "text-[var(--veyla-purple-soft)]"
                                        : "text-[var(--veyla-text-dim)]"
                                }
                            />
                            <span
                                className={cn(
                                    "[font-family:var(--font-geist-pixel-square),monospace] text-[10px] tracking-[0.5px]",
                                    isActive
                                        ? "text-[var(--veyla-purple-soft)]"
                                        : "text-[var(--veyla-text-dim)]"
                                )}
                            >
                                {label.toUpperCase()}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

"use client";

import { usePathname } from "next/navigation";
import { WalletButton } from "./WalletButton";
import { AppMobileNav } from "./AppMobileNav";

const PAGE_TITLES: Record<string, string> = {
    "/app": "Dashboard",
    "/app/vault": "Vault",
    "/app/routes": "Routes",
    "/app/history": "History",
};

export function AppTopbar() {
    const pathname = usePathname();
    const title = PAGE_TITLES[pathname] ?? "App";

    return (
        <header className="h-16 shrink-0 flex items-center justify-between px-4 sm:px-6 border-b border-white/[0.06] bg-[#07070d]/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
                <AppMobileNav />
                <h1 className="text-[16px] font-semibold text-[var(--veyla-text-main)] tracking-[-0.2px]">
                    {title}
                </h1>
            </div>
            <WalletButton />
        </header>
    );
}

"use client";

import Link from "next/link";
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
        <div className="shrink-0">
            {/* Testnet notice */}
            <div className="flex items-center justify-center gap-2 px-4 py-1.5 bg-[rgba(250,204,21,0.06)] border-b border-[rgba(250,204,21,0.12)] text-[12px] text-[rgba(250,204,21,0.75)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] shrink-0 animate-pulse" />
                <span>Passet Hub Testnet — real funds are not at risk.</span>
                <Link
                    href="/docs#quickstart"
                    className="ml-1 underline underline-offset-2 hover:text-[#facc15] transition-colors"
                >
                    Get testnet PAS
                </Link>
            </div>

            <header className="relative z-[100] h-16 shrink-0 flex items-center justify-between px-4 sm:px-6 border-b border-white/[0.06] bg-[#07070d]/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <AppMobileNav />
                    <h1 className="text-[18px] font-semibold text-[var(--veyla-text-main)] tracking-[-0.2px]">
                        {title}
                    </h1>
                </div>
                <WalletButton />
            </header>
        </div>
    );
}

"use client";

import { WalletButton } from "./WalletButton";

export function ConnectPrompt() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-24">
            {/* Logo */}
            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[28px] font-medium tracking-[6px] text-white/20">
                VEYLA
            </span>

            <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-[18px] font-semibold text-[var(--veyla-text-main)] tracking-[-0.2px]">
                    Connect your wallet
                </p>
                <p className="text-[15px] text-[var(--veyla-text-muted)] max-w-[280px] leading-[1.6]">
                    Connect to Passet Hub to start routing your assets.
                </p>
            </div>

            <WalletButton />

            <p className="text-[12px] text-[var(--veyla-text-dim)] tracking-[0.5px]">
                Supports MetaMask · Rabby · any injected wallet
            </p>
        </div>
    );
}

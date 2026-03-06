"use client";

import { useState } from "react";
import Image from "next/image";
import { WalletModal } from "./WalletModal";

export function ConnectPrompt() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="flex-1 flex flex-col items-center justify-center gap-6 py-24">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 flex items-center justify-center opacity-40">
                        <Image src="/veyla-icon.svg" alt="Veyla Logo" fill />
                    </div>
                    <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[30px] font-medium tracking-[6px] text-white/20">
                        VEYLA
                    </span>
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                    <p className="text-[20px] font-semibold text-[var(--veyla-text-main)] tracking-[-0.2px]">
                        Connect your wallet
                    </p>
                    <p className="text-[17px] text-[var(--veyla-text-muted)] max-w-[280px] leading-[1.6]">
                        Connect to Passet Hub to start routing your assets.
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--veyla-purple)] to-[#5b1fd6] text-white text-[16px] font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(123,57,252,0.3)] hover:-translate-y-px"
                >
                    Connect Wallet
                </button>

                <p className="text-[14px] text-[var(--veyla-text-dim)] tracking-[0.5px]">
                    MetaMask · Rabby · Coinbase · any injected wallet
                </p>
            </div>

            <WalletModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </>
    );
}

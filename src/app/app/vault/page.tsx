"use client";

import { useState, useEffect } from "react";
import { parseUnits } from "viem";
import { toast } from "sonner";
import { AssetSelector, ASSETS } from "@/components/app/vault/AssetSelector";
import { AmountInput } from "@/components/app/vault/AmountInput";
import { DepositPreview } from "@/components/app/vault/DepositPreview";
import { VaultStats } from "@/components/app/vault/VaultStats";
import { TxButton } from "@/components/app/vault/TxButton";
import { useDeposit } from "@/hooks";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

type Tab = "deposit" | "withdraw";

// Token contract addresses by asset symbol — undefined until deployed
const TOKEN_ADDRESSES: Record<string, `0x${string}` | undefined> = {
    DOT:  env.dotTokenAddress,
    USDT: env.usdtTokenAddress,
};

export default function VaultPage() {
    const [tab, setTab] = useState<Tab>("deposit");
    const [asset, setAsset] = useState("DOT");
    const [amount, setAmount] = useState("");

    const { deposit, txState, reset } = useDeposit();

    const selectedAsset = ASSETS[asset];
    const parsedAmount = parseFloat(amount) || 0;
    const usdValue = parsedAmount * selectedAsset.price;
    const tokenAddress = TOKEN_ADDRESSES[asset];
    const isValid = parsedAmount > 0 && parsedAmount <= selectedAsset.balance && !!tokenAddress;

    // Show toast + reset after success
    useEffect(() => {
        if (txState.status !== "success") return;
        toast.success(`Deposited ${parsedAmount} ${asset} to vault`);
        setAmount("");
        const t = setTimeout(reset, 2500);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txState.status]);

    // Show toast on error
    useEffect(() => {
        if (txState.status !== "error") return;
        toast.error(txState.error ?? "Transaction failed.");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txState.status]);

    function handleDeposit() {
        if (!tokenAddress || !isValid) return;
        deposit(tokenAddress, parseUnits(amount, selectedAsset.decimals));
    }

    return (
        <div className="flex flex-col gap-5 p-6 md:p-8 pb-24 lg:pb-8">
            <div>
                <h1 className="text-[22px] font-semibold text-[var(--veyla-text-main)] tracking-[-0.3px]">
                    Vault
                </h1>
                <p className="text-[15px] text-[var(--veyla-text-dim)] mt-0.5">
                    Deposit assets to start earning optimized yield
                </p>
            </div>

            <div className="grid grid-cols-[1fr_340px] gap-4 max-lg:grid-cols-1">
                {/* Left: Form */}
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    {/* Tabs */}
                    <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.05] w-fit">
                        {(["deposit", "withdraw"] as Tab[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={cn(
                                    "px-5 py-2 rounded-lg text-[15px] font-semibold capitalize transition-all duration-150",
                                    tab === t
                                        ? "bg-[rgba(123,57,252,0.15)] text-white border border-[rgba(123,57,252,0.2)]"
                                        : "text-[var(--veyla-text-dim)] hover:text-[var(--veyla-text-muted)]"
                                )}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {tab === "deposit" ? (
                        <>
                            <AssetSelector value={asset} onChange={setAsset} />
                            <AmountInput
                                value={amount}
                                onChange={setAmount}
                                maxAmount={selectedAsset.balance}
                                asset={asset}
                                usdValue={usdValue}
                            />

                            {/* Warning if over balance */}
                            {parsedAmount > selectedAsset.balance && (
                                <p className="text-[14px] text-[#f87171]">
                                    Amount exceeds your balance of {selectedAsset.balance.toLocaleString()} {asset}
                                </p>
                            )}

                            <TxButton
                                txState={txState}
                                onSubmit={handleDeposit}
                                disabled={!isValid}
                                label="Deposit Now"
                                successLabel="Deposited!"
                            />

                            <p className="text-center text-[13px] text-[var(--veyla-text-dim)]">
                                Assets routed via XCM · No bridge risk · Auto-compounding
                            </p>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                            <p className="text-[16px] text-[var(--veyla-text-muted)]">
                                Withdraw from your active positions
                            </p>
                            <p className="text-[14px] text-[var(--veyla-text-dim)] max-w-[260px] leading-[1.6]">
                                Select a position from the Dashboard to withdraw funds.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right: Preview */}
                <DepositPreview
                    asset={asset}
                    amount={parsedAmount}
                    usdValue={usdValue}
                    apy={selectedAsset.apy}
                    route={selectedAsset.route}
                />
            </div>

            {/* Bottom stats */}
            <VaultStats />
        </div>
    );
}

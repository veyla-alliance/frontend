"use client";

import { useState, useEffect } from "react";
import { parseUnits, formatUnits } from "viem";
import { useConnection } from "wagmi";
import type { AssetSymbol } from "@/types";
import { toast } from "sonner";
import { AssetSelector, ASSETS } from "@/components/app/vault/AssetSelector";
import { AmountInput } from "@/components/app/vault/AmountInput";
import { DepositPreview } from "@/components/app/vault/DepositPreview";
import { VaultStats } from "@/components/app/vault/VaultStats";
import { TxButton } from "@/components/app/vault/TxButton";
import { useDeposit, useWithdraw, useERC20Balance, useUserPositions } from "@/hooks";
import { TOKEN_ADDRESSES } from "@/lib/constants";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

type Tab = "deposit" | "withdraw";

// ── Withdraw Summary (right panel) ──────────────────────────────────────────
function WithdrawSummary({
    asset,
    amount,
    usdValue,
}: {
    asset: string;
    amount: number;
    usdValue: number;
}) {
    const hasAmount = amount > 0;
    return (
        <div className="flex flex-col h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.05]">
                <h2 className="text-[16px] font-semibold text-[var(--veyla-text-main)]">Summary</h2>
                <p className="text-[14px] text-[var(--veyla-text-dim)] mt-0.5">Withdrawal details</p>
            </div>

            <div className="flex flex-col flex-1 px-5 py-4">
                {/* Amount */}
                <div className="mb-4 pb-4 border-b border-white/[0.05]">
                    <div className="text-[14px] text-[var(--veyla-text-dim)] mb-1">You&apos;re withdrawing</div>
                    <div className={`text-[26px] font-bold tracking-[-0.5px] ${hasAmount ? "text-[var(--veyla-text-main)]" : "text-[var(--veyla-text-dim)]"}`}>
                        {hasAmount ? amount.toLocaleString() : "—"} {asset}
                    </div>
                    {usdValue > 0 && (
                        <div className="text-[15px] text-[var(--veyla-text-dim)] mt-0.5">
                            ≈ ${usdValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                        <span className="text-[15px] text-[var(--veyla-text-dim)]">Accrued yield</span>
                        <span className="text-[16px] font-semibold text-[#4ade80]">Included ✓</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                        <span className="text-[15px] text-[var(--veyla-text-dim)]">Withdrawal fee</span>
                        <span className="text-[16px] font-semibold text-[var(--veyla-text-main)]">None</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <span className="text-[15px] text-[var(--veyla-text-dim)]">Destination</span>
                        <span className="text-[16px] font-semibold text-[var(--veyla-text-main)]">Your wallet</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/[0.05]">
                    <p className="text-[13px] text-[var(--veyla-text-dim)]">
                        Funds returned via Polkadot native XCM. No bridge risk.
                    </p>
                </div>
            </div>
        </div>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function VaultPage() {
    const [tab, setTab]                   = useState<Tab>("deposit");
    const [asset, setAsset]               = useState("DOT");
    const [depositAmount, setDepositAmount]   = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");

    const { address } = useConnection();
    const { deposit,  txState: depositTxState,  reset: resetDeposit  } = useDeposit();
    const { withdraw, txState: withdrawTxState, reset: resetWithdraw } = useWithdraw();
    const { positions } = useUserPositions();

    // ── Wallet balances (for deposit) ─────────────────────────────────────
    const { data: dotWalletRaw  } = useERC20Balance(address, TOKEN_ADDRESSES["DOT"]);
    const { data: usdtWalletRaw } = useERC20Balance(address, TOKEN_ADDRESSES["USDT"]);

    const walletBalances: Record<string, number> = {
        DOT:  dotWalletRaw  !== undefined ? Number(formatUnits(dotWalletRaw,  ASSETS["DOT"].decimals))  : 0,
        USDT: usdtWalletRaw !== undefined ? Number(formatUnits(usdtWalletRaw, ASSETS["USDT"].decimals)) : 0,
    };

    // ── Vault balances (deposited amounts, for withdraw) ──────────────────
    const vaultBalances: Record<string, number> = Object.fromEntries(
        Object.keys(ASSETS).map((symbol) => {
            const pos = positions.find((p) => p.asset === symbol);
            return [symbol, pos ? Number(formatUnits(pos.depositedAmount, ASSETS[symbol].decimals)) : 0];
        })
    );

    const selectedAsset   = ASSETS[asset];
    const tokenAddress    = TOKEN_ADDRESSES[asset as AssetSymbol];

    // Deposit
    const parsedDeposit   = parseFloat(depositAmount) || 0;
    const depositUsdValue = parsedDeposit * selectedAsset.price;
    const depositBalance  = walletBalances[asset];
    const depositIsValid  = parsedDeposit > 0 && parsedDeposit <= depositBalance && !!tokenAddress;

    // Withdraw
    const parsedWithdraw    = parseFloat(withdrawAmount) || 0;
    const withdrawUsdValue  = parsedWithdraw * selectedAsset.price;
    const withdrawBalance   = vaultBalances[asset];
    const withdrawIsValid   = parsedWithdraw > 0 && parsedWithdraw <= withdrawBalance && !!tokenAddress;
    const hasPosition       = withdrawBalance > 0;

    // Reset amounts on tab switch so both forms start clean
    useEffect(() => {
        setDepositAmount("");
        setWithdrawAmount("");
    }, [tab]);

    // ── Deposit lifecycle toasts ──────────────────────────────────────────
    useEffect(() => {
        if (depositTxState.status !== "success") return;
        toast.success(`Deposited ${parsedDeposit} ${asset} to vault`, {
            action: depositTxState.hash
                ? { label: "View TX", onClick: () => window.open(`${env.blockExplorerUrl}/tx/${depositTxState.hash}`, "_blank") }
                : undefined,
        });
        setDepositAmount("");
        const t = setTimeout(resetDeposit, 2500);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depositTxState.status]);

    useEffect(() => {
        if (depositTxState.status !== "error") return;
        toast.error(depositTxState.error ?? "Transaction failed.");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depositTxState.status]);

    // ── Withdraw lifecycle toasts ─────────────────────────────────────────
    useEffect(() => {
        if (withdrawTxState.status !== "success") return;
        toast.success(`Withdrew ${parsedWithdraw} ${asset} to your wallet`, {
            action: withdrawTxState.hash
                ? { label: "View TX", onClick: () => window.open(`${env.blockExplorerUrl}/tx/${withdrawTxState.hash}`, "_blank") }
                : undefined,
        });
        setWithdrawAmount("");
        const t = setTimeout(resetWithdraw, 2500);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [withdrawTxState.status]);

    useEffect(() => {
        if (withdrawTxState.status !== "error") return;
        toast.error(withdrawTxState.error ?? "Transaction failed.");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [withdrawTxState.status]);

    function handleDeposit() {
        if (!tokenAddress || !depositIsValid) return;
        deposit(tokenAddress, parseUnits(depositAmount, selectedAsset.decimals));
    }

    function handleWithdraw() {
        if (!tokenAddress || !withdrawIsValid) return;
        withdraw(tokenAddress, parseUnits(withdrawAmount, selectedAsset.decimals));
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

                    {/* ── Deposit tab ───────────────────────────────────── */}
                    {tab === "deposit" ? (
                        <>
                            <AssetSelector
                                value={asset}
                                onChange={setAsset}
                                balances={walletBalances}
                            />
                            <AmountInput
                                value={depositAmount}
                                onChange={setDepositAmount}
                                maxAmount={depositBalance}
                                asset={asset}
                                usdValue={depositUsdValue}
                            />

                            {parsedDeposit > depositBalance && depositBalance > 0 && (
                                <p className="text-[14px] text-[#f87171]">
                                    Amount exceeds your balance of {depositBalance.toLocaleString()} {asset}
                                </p>
                            )}

                            <TxButton
                                txState={depositTxState}
                                onSubmit={handleDeposit}
                                disabled={!depositIsValid}
                                label="Deposit Now"
                                successLabel="Deposited!"
                            />

                            <p className="text-center text-[13px] text-[var(--veyla-text-dim)]">
                                Assets routed via XCM · No bridge risk · Auto-compounding
                            </p>
                        </>
                    ) : (
                        /* ── Withdraw tab ────────────────────────────────── */
                        <>
                            <AssetSelector
                                value={asset}
                                onChange={setAsset}
                                balances={vaultBalances}
                            />

                            {hasPosition ? (
                                <>
                                    <AmountInput
                                        value={withdrawAmount}
                                        onChange={setWithdrawAmount}
                                        maxAmount={withdrawBalance}
                                        asset={asset}
                                        usdValue={withdrawUsdValue}
                                    />

                                    {parsedWithdraw > withdrawBalance && (
                                        <p className="text-[14px] text-[#f87171]">
                                            Amount exceeds your vault balance of {withdrawBalance.toLocaleString()} {asset}
                                        </p>
                                    )}

                                    <TxButton
                                        txState={withdrawTxState}
                                        onSubmit={handleWithdraw}
                                        disabled={!withdrawIsValid}
                                        label="Withdraw"
                                        successLabel="Withdrawn!"
                                    />
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                                    <p className="text-[16px] text-[var(--veyla-text-muted)]">
                                        No {asset} position found
                                    </p>
                                    <p className="text-[14px] text-[var(--veyla-text-dim)] max-w-[260px] leading-[1.6]">
                                        Deposit {asset} first to create a position you can withdraw from.
                                    </p>
                                </div>
                            )}

                            <p className="text-center text-[13px] text-[var(--veyla-text-dim)]">
                                Accrued yield included · Returned directly to your wallet
                            </p>
                        </>
                    )}
                </div>

                {/* Right: Summary panel */}
                {tab === "deposit" ? (
                    <DepositPreview
                        asset={asset}
                        amount={parsedDeposit}
                        usdValue={depositUsdValue}
                        apy={selectedAsset.apy}
                        route={selectedAsset.route}
                    />
                ) : (
                    <WithdrawSummary
                        asset={asset}
                        amount={parsedWithdraw}
                        usdValue={withdrawUsdValue}
                    />
                )}
            </div>

            {/* Bottom stats */}
            <VaultStats />
        </div>
    );
}

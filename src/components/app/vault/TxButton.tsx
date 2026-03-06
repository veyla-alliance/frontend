"use client";

import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TxState } from "@/types";

interface TxButtonProps {
    txState: TxState;
    onSubmit: () => void;
    disabled: boolean;
    label: string;
    successLabel?: string;
}

export function TxButton({
    txState,
    onSubmit,
    disabled,
    label,
    successLabel = "Success!",
}: TxButtonProps) {
    const { status } = txState;
    const isActive = status !== "idle" && status !== "error";

    const config: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
        idle: {
            label,
            icon: <ArrowRight size={15} />,
            className: "bg-gradient-to-r from-[var(--veyla-purple)] to-[#5b1fd6] hover:shadow-[0_0_30px_rgba(123,57,252,0.3)] hover:-translate-y-px active:translate-y-0",
        },
        "awaiting-approval": {
            label: "Approve token…",
            icon: <Loader2 size={15} className="animate-spin" />,
            className: "bg-gradient-to-r from-[var(--veyla-purple)] to-[#5b1fd6] opacity-70 cursor-not-allowed",
        },
        approving: {
            label: "Approving…",
            icon: <Loader2 size={15} className="animate-spin" />,
            className: "bg-gradient-to-r from-[var(--veyla-purple)] to-[#5b1fd6] opacity-70 cursor-not-allowed",
        },
        "awaiting-signature": {
            label: "Awaiting signature…",
            icon: <Loader2 size={15} className="animate-spin" />,
            className: "bg-gradient-to-r from-[var(--veyla-purple)] to-[#5b1fd6] opacity-70 cursor-not-allowed",
        },
        pending: {
            label: "Confirming on-chain…",
            icon: <Loader2 size={15} className="animate-spin" />,
            className: "bg-gradient-to-r from-[var(--veyla-purple)] to-[#5b1fd6] opacity-70 cursor-not-allowed",
        },
        success: {
            label: successLabel,
            icon: <Check size={15} />,
            className: "bg-gradient-to-r from-[#16a34a] to-[#15803d]",
        },
        error: {
            label: "Failed — try again",
            icon: <AlertCircle size={15} />,
            className: "bg-gradient-to-r from-[#dc2626] to-[#b91c1c]",
        },
    };

    const current = config[status] ?? config.idle;

    return (
        <button
            type="button"
            onClick={() => { if (!isActive && !disabled) onSubmit(); }}
            disabled={disabled || isActive}
            className={cn(
                "flex items-center justify-center gap-2 w-full py-4 rounded-xl text-[17px] font-semibold text-white transition-all duration-200",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none",
                current.className
            )}
        >
            {current.icon}
            {current.label}
        </button>
    );
}

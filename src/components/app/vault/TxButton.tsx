"use client";

import { useState } from "react";
import { Loader2, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type TxState = "idle" | "loading" | "success" | "error";

interface TxButtonProps {
    onSubmit: () => Promise<void>;
    disabled: boolean;
    label: string;
}

export function TxButton({ onSubmit, disabled, label }: TxButtonProps) {
    const [state, setState] = useState<TxState>("idle");

    async function handleClick() {
        if (state !== "idle" || disabled) return;
        setState("loading");
        try {
            await onSubmit();
            setState("success");
            setTimeout(() => setState("idle"), 2500);
        } catch {
            setState("error");
            setTimeout(() => setState("idle"), 2500);
        }
    }

    const config = {
        idle: {
            label,
            icon: <ArrowRight size={15} />,
            className: "bg-gradient-to-r from-[var(--veyla-purple)] to-[#5b1fd6] hover:shadow-[0_0_30px_rgba(123,57,252,0.3)] hover:-translate-y-px active:translate-y-0",
        },
        loading: {
            label: "Confirming…",
            icon: <Loader2 size={15} className="animate-spin" />,
            className: "bg-gradient-to-r from-[var(--veyla-purple)] to-[#5b1fd6] opacity-70 cursor-not-allowed",
        },
        success: {
            label: "Deposited!",
            icon: <Check size={15} />,
            className: "bg-gradient-to-r from-[#16a34a] to-[#15803d]",
        },
        error: {
            label: "Failed — try again",
            icon: null,
            className: "bg-gradient-to-r from-[#dc2626] to-[#b91c1c]",
        },
    }[state];

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled || state === "loading"}
            className={cn(
                "flex items-center justify-center gap-2 w-full py-4 rounded-xl text-[15px] font-semibold text-white transition-all duration-200",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none",
                config.className
            )}
        >
            {config.icon}
            {config.label}
        </button>
    );
}

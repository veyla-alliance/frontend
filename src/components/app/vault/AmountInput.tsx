"use client";

interface AmountInputProps {
    value: string;
    onChange: (v: string) => void;
    maxAmount: number;
    asset: string;
    usdValue: number;
}

export function AmountInput({ value, onChange, maxAmount, asset, usdValue }: AmountInputProps) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value;
        if (raw === "" || /^\d*\.?\d*$/.test(raw)) {
            onChange(raw);
        }
    }

    function handleMax() {
        onChange(parseFloat(maxAmount.toFixed(6)).toString());
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-semibold tracking-[1.5px] uppercase text-[var(--veyla-text-dim)]">
                    Amount
                </label>
                <span className="text-[13px] text-[var(--veyla-text-dim)]">
                    Balance:{" "}
                    <span className="text-[var(--veyla-text-muted)]">
                        {maxAmount.toLocaleString()} {asset}
                    </span>
                </span>
            </div>

            {/* Input row */}
            <div className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] focus-within:border-[rgba(123,57,252,0.4)] focus-within:bg-[rgba(123,57,252,0.03)] transition-all duration-150">
                <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={value}
                    onChange={handleChange}
                    className="flex-1 bg-transparent text-[22px] font-semibold text-[var(--veyla-text-main)] placeholder:text-[var(--veyla-text-dim)] outline-none min-w-0"
                />
                <div className="flex items-center gap-2 shrink-0">
                    <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[12px] text-[var(--veyla-text-dim)] tracking-[1px]">
                        {asset}
                    </span>
                    <button
                        type="button"
                        onClick={handleMax}
                        className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[1px] px-2 py-1 rounded-md bg-[rgba(123,57,252,0.1)] border border-[rgba(123,57,252,0.2)] text-[var(--veyla-purple-soft)] hover:bg-[rgba(123,57,252,0.2)] transition-colors duration-150"
                    >
                        MAX
                    </button>
                </div>
            </div>

            {/* USD equivalent */}
            <div className="mt-2 text-[14px] text-[var(--veyla-text-dim)]">
                {usdValue > 0 ? (
                    <span>≈ ${usdValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                ) : (
                    <span>Enter an amount</span>
                )}
            </div>
        </div>
    );
}

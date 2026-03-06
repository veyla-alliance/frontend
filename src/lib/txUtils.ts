/** Maps common wallet/contract errors to short, user-friendly strings. */
export function parseError(err: unknown): string {
    if (!(err instanceof Error)) return "Unknown error.";
    const msg = err.message;
    if (msg.includes("User rejected")) return "Transaction cancelled.";
    if (msg.includes("insufficient funds")) return "Insufficient balance for gas.";
    if (msg.includes("execution reverted")) return "Transaction failed — contract rejected.";
    return msg.slice(0, 120);
}

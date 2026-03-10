/** Returns true if the user manually cancelled/rejected the wallet popup. */
export function isUserRejection(err: unknown): boolean {
    if (!(err instanceof Error)) return false;
    const msg = err.message;
    return msg.includes("User rejected") || msg.includes("user rejected") || msg.includes("4001");
}

/** Maps common wallet/contract errors to short, user-friendly strings. */
export function parseError(err: unknown): string {
    if (!(err instanceof Error)) return "Unknown error.";
    const msg = err.message;
    if (msg.includes("insufficient funds")) return "Insufficient balance for gas.";
    if (msg.includes("execution reverted")) return "Transaction failed — contract rejected.";
    return msg.slice(0, 120);
}

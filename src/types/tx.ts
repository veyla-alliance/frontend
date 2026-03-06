// Transaction lifecycle types.
// Covers the full state machine from idle to confirmed.

export type TxStatus =
    | "idle"
    | "awaiting-signature"  // wallet popup open, waiting for user
    | "pending"             // signed, in mempool
    | "confirmed"           // included in block
    | "success"             // finalized (if needed)
    | "error";

export interface TxState {
    status: TxStatus;
    hash?: `0x${string}`;
    error?: string;         // human-readable error message
}

/** Maps common contract revert/wallet error messages to user-friendly strings. */
export const TX_ERROR_MESSAGES: Record<string, string> = {
    "User rejected the request.": "Transaction cancelled.",
    "insufficient funds":         "Insufficient balance for gas.",
    "execution reverted":         "Transaction failed — contract rejected.",
} as const;

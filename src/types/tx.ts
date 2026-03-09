// Transaction lifecycle types.
// Covers the full state machine from idle to success/error.

export type TxStatus =
    | "idle"
    | "awaiting-approval"   // wallet popup open for ERC-20 approve()
    | "approving"           // approve tx in mempool, waiting for confirmation
    | "awaiting-signature"  // wallet popup open for main tx (deposit/withdraw)
    | "pending"             // main tx signed, in mempool
    | "success"             // confirmed + finalized
    | "error";

export interface TxState {
    status: TxStatus;
    hash?: `0x${string}`;
    error?: string;         // human-readable error message
}

// Types for on-chain activity / event history.

export type ActivityType = "Deposit" | "Withdraw" | "Route" | "Earn";

/** A single on-chain event, as returned from the indexer or RPC. */
export interface ActivityEvent {
    type: ActivityType;
    description: string;
    asset: string;
    amount: bigint;            // raw, on-chain
    amountFormatted: string;   // pre-formatted for display, e.g. "+12.4 DOT"
    timestamp: number;         // unix timestamp (seconds)
    txHash: `0x${string}`;
    blockNumber: bigint;
}

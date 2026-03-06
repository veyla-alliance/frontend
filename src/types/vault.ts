// Core types for vault positions and protocol stats.
// On-chain amounts use bigint (wei-scale); display values use number.

export type AssetSymbol = "DOT" | "USDT";

export interface AssetInfo {
    symbol: AssetSymbol;
    name: string;
    decimals: number;
    address: `0x${string}`;
}

/** A user's active position inside the vault. */
export interface VaultPosition {
    asset: AssetSymbol;
    depositedAmount: bigint;   // raw, on-chain
    depositedUsd: number;      // computed from price feed
    currentApy: number;        // as percentage, e.g. 14.2
    earnedAmount: bigint;      // raw, on-chain
    earnedUsd: number;
    deployedTo: string;        // chain name, e.g. "Hydration"
    depositedAt: number;       // unix timestamp (seconds)
}

/** Protocol-level aggregate stats. */
export interface VaultStats {
    tvlUsd: number;
    userSharePercent: number;
    protocolFeeBps: number;    // basis points: 50 = 0.5%
    avgRebalanceIntervalMs: number;
}

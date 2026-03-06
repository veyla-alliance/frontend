// Types for XCM routing across Polkadot parachains.

export type RouteStatus = "active" | "standby" | "paused";

/** A single routable destination chain with its current yield stats. */
export interface RouteInfo {
    id: string;                // e.g. "hydration"
    chainName: string;         // e.g. "Hydration"
    protocol: string;          // e.g. "Omnipool"
    currentApy: number;        // as percentage
    tvlUsd: number;
    status: RouteStatus;
}

/** The currently active allocation for a given asset. */
export interface ActiveRoute {
    asset: string;
    destinationChain: string;
    allocatedAmount: bigint;   // raw, on-chain
    allocatedUsd: number;
    lastRoutedAt: number;      // unix timestamp (seconds)
}

import { createConfig, http, fallback } from "wagmi";
import { defineChain } from "viem";
import { injected, coinbaseWallet } from "wagmi/connectors";
import { env } from "./env";

// Polkadot Hub Testnet (Passet Hub — Paseo)
// Verify latest RPC: https://docs.polkadot.com/develop/smart-contracts/
export const passetHub = defineChain({
    id: env.chainId,
    name: "Passet Hub",
    nativeCurrency: {
        name: "Paseo",
        symbol: "PAS",
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: [env.rpcUrl],
        },
    },
    blockExplorers: {
        default: {
            name: "Blockscout",
            url: env.blockExplorerUrl,
        },
    },
    testnet: true,
});

export const wagmiConfig = createConfig({
    chains: [passetHub],
    connectors: [
        injected(),
        coinbaseWallet({ appName: "Veyla" }),
    ],
    transports: {
        // fallback retries the same endpoint up to 3 times before giving up.
        // Passet Hub only has one public testnet RPC — retry is the best resilience available.
        [passetHub.id]: fallback([
            http(env.rpcUrl, { retryCount: 3, retryDelay: 1_000 }),
        ]),
    },
    ssr: true,
});

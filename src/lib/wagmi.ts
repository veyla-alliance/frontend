import { createConfig, http } from "wagmi";
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
        [passetHub.id]: http(),
    },
    ssr: true,
});

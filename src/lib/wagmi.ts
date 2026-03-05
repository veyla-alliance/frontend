import { createConfig, http } from "wagmi";
import { defineChain } from "viem";
import { injected, coinbaseWallet } from "wagmi/connectors";

// Polkadot Hub Testnet (Passet Hub — Paseo)
// Verify latest RPC: https://docs.polkadot.com/develop/smart-contracts/
export const passetHub = defineChain({
    id: 420420422,
    name: "Passet Hub",
    nativeCurrency: {
        name: "Paseo",
        symbol: "PAS",
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ["https://testnet-passet-hub-eth-rpc.polkadot.io"],
        },
    },
    blockExplorers: {
        default: {
            name: "Blockscout",
            url: "https://blockscout-passet-hub.parity-testnet.parity.io",
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

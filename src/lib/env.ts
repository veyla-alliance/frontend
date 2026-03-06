// Centralized environment config.
// Next.js inlines NEXT_PUBLIC_* at build time — must reference each var directly,
// not via dynamic access like process.env[key].
//
// Fallbacks ensure the app still runs without a .env.local (uses testnet defaults).

export const env = {
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? "420420422"),

    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL
        ?? "https://testnet-passet-hub-eth-rpc.polkadot.io",

    blockExplorerUrl: process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL
        ?? "https://blockscout-passet-hub.parity-testnet.parity.io",

    // undefined until contract is deployed — hooks must guard against this
    vaultAddress: process.env.NEXT_PUBLIC_VAULT_ADDRESS as `0x${string}` | undefined,
} as const;

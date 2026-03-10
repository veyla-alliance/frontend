// Centralized environment config.
// Next.js inlines NEXT_PUBLIC_* at build time — must reference each var directly,
// not via dynamic access like process.env[key].

function required(key: string): string {
    const value = process.env[key];
    if (!value) throw new Error(`Missing required env var: ${key}`);
    return value;
}

export const env = {
    chainId:          Number(required("NEXT_PUBLIC_CHAIN_ID")),
    rpcUrl:           required("NEXT_PUBLIC_RPC_URL"),
    blockExplorerUrl: required("NEXT_PUBLIC_BLOCK_EXPLORER_URL"),
    vaultAddress:     required("NEXT_PUBLIC_VAULT_ADDRESS") as `0x${string}`,
    dotTokenAddress:  required("NEXT_PUBLIC_DOT_TOKEN_ADDRESS") as `0x${string}`,
    usdtTokenAddress: required("NEXT_PUBLIC_USDT_TOKEN_ADDRESS") as `0x${string}`,
} as const;

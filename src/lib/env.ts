// Centralized environment config.
// Next.js inlines NEXT_PUBLIC_* at build time — must reference each var directly
// as literal strings, NOT via dynamic access like process.env[key].

function assert(value: string | undefined, key: string): string {
    if (!value) throw new Error(`Missing required env var: ${key}`);
    return value;
}

export const env = {
    chainId:          Number(assert(process.env.NEXT_PUBLIC_CHAIN_ID,          "NEXT_PUBLIC_CHAIN_ID")),
    rpcUrl:           assert(process.env.NEXT_PUBLIC_RPC_URL,                  "NEXT_PUBLIC_RPC_URL"),
    blockExplorerUrl: assert(process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL,       "NEXT_PUBLIC_BLOCK_EXPLORER_URL"),
    vaultAddress:     assert(process.env.NEXT_PUBLIC_VAULT_ADDRESS,            "NEXT_PUBLIC_VAULT_ADDRESS") as `0x${string}`,
    dotTokenAddress:  assert(process.env.NEXT_PUBLIC_DOT_TOKEN_ADDRESS,        "NEXT_PUBLIC_DOT_TOKEN_ADDRESS") as `0x${string}`,
    usdtTokenAddress: assert(process.env.NEXT_PUBLIC_USDT_TOKEN_ADDRESS,       "NEXT_PUBLIC_USDT_TOKEN_ADDRESS") as `0x${string}`,
} as const;

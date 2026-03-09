import { env } from "./env";
import type { AssetSymbol } from "@/types";

/**
 * ERC-20 token addresses on Passet Hub, keyed by AssetSymbol.
 * Both are undefined until the contracts are deployed and env vars are set.
 * All consumers must guard against undefined before sending a tx.
 */
export const TOKEN_ADDRESSES: Record<AssetSymbol, `0x${string}` | undefined> = {
    DOT:  env.dotTokenAddress,
    USDT: env.usdtTokenAddress,
};

import { env } from "./env";
import type { AssetSymbol } from "@/types";

export const TOKEN_ADDRESSES: Record<AssetSymbol, `0x${string}`> = {
    DOT:  env.dotTokenAddress,
    USDT: env.usdtTokenAddress,
};

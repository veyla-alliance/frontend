"use client";

import { useReadContract } from "wagmi";
import { erc20Abi } from "@/lib/abi/erc20";

/**
 * Reads the user's ERC-20 token balance from the chain.
 * Returns raw bigint (wei-scale) — caller is responsible for formatUnits().
 * Disabled automatically when either address is missing.
 */
export function useERC20Balance(
    userAddress?: `0x${string}`,
    tokenAddress?: `0x${string}`,
) {
    return useReadContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: userAddress ? [userAddress] : undefined,
        query: {
            enabled: !!userAddress && !!tokenAddress,
            staleTime: 15_000,       // wallet balance changes frequently
            refetchInterval: 30_000,
        },
    });
}

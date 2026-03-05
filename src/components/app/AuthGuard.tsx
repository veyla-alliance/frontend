"use client";

import { useAccount } from "wagmi";
import { ConnectPrompt } from "./ConnectPrompt";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isConnected } = useAccount();

    if (!isConnected) {
        return <ConnectPrompt />;
    }

    return <>{children}</>;
}

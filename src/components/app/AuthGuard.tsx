"use client";

import { useConnection } from "wagmi";
import { ConnectPrompt } from "./ConnectPrompt";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isConnected } = useConnection();

    if (!isConnected) {
        return <ConnectPrompt />;
    }

    return <>{children}</>;
}

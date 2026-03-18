"use client";

import { useConnection } from "wagmi";
import { ConnectPrompt } from "./ConnectPrompt";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { status } = useConnection();

    // Show app content only when wallet is fully connected.
    // Everything else (connecting, reconnecting, disconnected) → ConnectPrompt.
    if (status === "connected") return <>{children}</>;
    return <ConnectPrompt />;
}

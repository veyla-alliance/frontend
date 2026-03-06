"use client";

import { useConnection } from "wagmi";
import { ConnectPrompt } from "./ConnectPrompt";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { status } = useConnection();

    // 'reconnecting' = returning user whose session is being restored.
    // Don't flash ConnectPrompt while wagmi resolves the saved connection.
    if (status === "reconnecting") return null;

    if (status === "disconnected") return <ConnectPrompt />;

    return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Docs | Veyla Protocol",
    description: "Complete technical documentation for Veyla — the automated yield optimization protocol built natively on Polkadot Hub using PVM smart contracts and XCM cross-chain routing.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

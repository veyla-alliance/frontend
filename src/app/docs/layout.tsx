import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Documentation",
    description: "Complete technical documentation for Veyla — on-chain yield accounting and XCM routing infrastructure built natively on Polkadot Hub using PVM smart contracts.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

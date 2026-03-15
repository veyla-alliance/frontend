import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Veyla Protocol",
    template: "%s | Veyla",
  },
  description: "Veyla is an on-chain yield accounting and XCM routing protocol built natively on Polkadot Hub. Deposit once, earn across Polkadot parachains — no bridges, no wrapped tokens.",
  openGraph: {
    title: "Veyla | The Intelligent Yield Router",
    description: "Your Personal Executive for crypto assets on the Polkadot ecosystem.",
    type: "website",
    siteName: "Veyla",
  },
  icons: {
    icon: "/veyla-icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veyla | The Intelligent Yield Router",
    description: "Your Personal Executive for crypto assets on the Polkadot ecosystem.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistPixelSquare.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

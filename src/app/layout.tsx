import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veyla | The Intelligent Yield Router for Polkadot Hub",
  description: "Veyla is an automated yield optimization protocol built natively on Polkadot Hub. Stop worrying about liquidity fragmentation—let Veyla route your assets for maximum yield with PVM and XCM.",
  openGraph: {
    title: "Veyla | The Intelligent Yield Router",
    description: "Your Personal Executive for crypto assets on the Polkadot ecosystem.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

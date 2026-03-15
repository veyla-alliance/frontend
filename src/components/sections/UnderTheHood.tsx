"use client";

import { FadeIn } from "@/components/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExternalLink } from "lucide-react";

const CONTRACT_ADDRESS = "0x5196F62a03cCDBed4b5372dC59E982b9A1e2B088";
const BLOCKSCOUT_URL = `https://blockscout-testnet.polkadot.io/address/${CONTRACT_ADDRESS}`;

const CODE = `// VeylaVault.sol — deployed on Passet Hub Testnet
// Solidity 0.8.28 compiled to PolkaVM bytecode

import "./interfaces/IXcm.sol";       // XCM precompile (0x...000a0000)
import "./interfaces/IERC20Precompile.sol"; // USDT pallet-assets

contract VeylaVault {
    address public constant DOT  = address(0);
    address public constant USDT = USDT_PRECOMPILE;

    // Route assets cross-chain via XCM precompile
    function sendCrossChain(
        address token,
        bytes calldata destination,
        bytes calldata xcmMessage
    ) external onlyOwner {
        if (!trustedDestinations[keccak256(destination)])
            revert UntrustedDestination();

        // Native call to Polkadot's XCM runtime
        IXcm(XCM_PRECOMPILE).send(destination, xcmMessage);

        lastRoutedAt = block.timestamp;
        emit RoutedCrossChain(token, destination, _tvl[token]);
    }

    // Yield: principal × APY × elapsed / (365d × 10_000)
    function _pendingYield(address user, address token)
        internal view returns (uint256)
    {
        uint256 principal = _balances[user][token];
        uint256 elapsed   = block.timestamp - _depositTimestamps[user][token];
        return (principal * _apyBps[token] * elapsed) / (365 days * 10_000);
    }
}`;

const PROOF_POINTS = [
    { value: "514", label: "Lines of Solidity" },
    { value: "82", label: "Tests Passing" },
    { value: "17", label: "Custom Errors" },
    { value: "2", label: "Precompiles Used" },
] as const;

export default function UnderTheHood() {
    return (
        <>
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20">
                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </div>

            <section
                className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-[80px] lg:py-[120px] flex flex-col items-center"
                id="under-the-hood"
            >
                <SectionHeader
                    label="Under the Hood"
                    title="Real code. Deployed on-chain."
                    labelClassName="block text-[14px] font-semibold tracking-[3px] uppercase text-[var(--veyla-purple)] mb-6"
                    titleClassName="[font-family:'Instrument_Serif',serif] italic text-[clamp(36px,5vw,56px)] max-lg:mb-12"
                />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 max-w-[1100px] w-full">
                    {/* Code block */}
                    <FadeIn delay={0.15}>
                        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/[0.05]">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
                                    <span className="text-[13px] font-semibold text-[var(--veyla-text-muted)]">
                                        VeylaVault.sol
                                    </span>
                                </div>
                                <a
                                    href={BLOCKSCOUT_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-[12px] text-[var(--veyla-purple-soft)] hover:text-white transition-colors"
                                >
                                    Verified on Blockscout
                                    <ExternalLink size={11} />
                                </a>
                            </div>
                            <pre className="p-5 text-[12px] md:text-[13px] leading-[1.7] font-mono text-[var(--veyla-text-muted)] overflow-x-auto whitespace-pre">
                                <code>{CODE}</code>
                            </pre>
                        </div>
                    </FadeIn>

                    {/* Proof points */}
                    <FadeIn delay={0.3}>
                        <div className="flex flex-col gap-4">
                            {PROOF_POINTS.map(({ value, label }) => (
                                <div
                                    key={label}
                                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col gap-1"
                                >
                                    <span className="text-[28px] font-bold text-[var(--veyla-cyan)] tracking-[-0.5px]">
                                        {value}
                                    </span>
                                    <span className="text-[12px] font-semibold tracking-[2px] uppercase text-[var(--veyla-text-dim)]">
                                        {label}
                                    </span>
                                </div>
                            ))}

                            <a
                                href={BLOCKSCOUT_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[rgba(123,57,252,0.08)] border border-[rgba(123,57,252,0.2)] hover:bg-[rgba(123,57,252,0.15)] transition-colors text-[13px] font-semibold text-[var(--veyla-purple-soft)]"
                            >
                                View Contract on Blockscout
                                <ExternalLink size={13} />
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </>
    );
}

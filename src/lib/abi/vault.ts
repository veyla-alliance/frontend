// Veyla Vault — expected ABI surface.
// Update once the real contract is deployed and verified on Blockscout.
// Function signatures are designed based on product requirements, not yet finalized.

export const vaultAbi = [
    // ── Write ────────────────────────────────────────────────────────────────

    {
        name: "deposit",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "token",  type: "address" },
            { name: "amount", type: "uint256" },
        ],
        outputs: [],
    },
    {
        name: "withdraw",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "token",  type: "address" },
            { name: "amount", type: "uint256" },
        ],
        outputs: [],
    },

    // ── Read ─────────────────────────────────────────────────────────────────

    {
        name: "balanceOf",
        type: "function",
        stateMutability: "view",
        inputs: [
            { name: "user",  type: "address" },
            { name: "token", type: "address" },
        ],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        name: "earned",
        type: "function",
        stateMutability: "view",
        inputs: [
            { name: "user",  type: "address" },
            { name: "token", type: "address" },
        ],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        // Returns APY in basis points (e.g. 1420 = 14.20%)
        name: "currentApy",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "token", type: "address" }],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        name: "tvl",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
    },

    // ── Events ───────────────────────────────────────────────────────────────

    {
        name: "Deposited",
        type: "event",
        inputs: [
            { name: "user",   type: "address", indexed: true  },
            { name: "token",  type: "address", indexed: true  },
            { name: "amount", type: "uint256", indexed: false },
        ],
    },
    {
        name: "Withdrawn",
        type: "event",
        inputs: [
            { name: "user",   type: "address", indexed: true  },
            { name: "token",  type: "address", indexed: true  },
            { name: "amount", type: "uint256", indexed: false },
        ],
    },
    {
        name: "Routed",
        type: "event",
        inputs: [
            { name: "token",       type: "address", indexed: true  },
            { name: "destination", type: "address", indexed: false },
            { name: "amount",      type: "uint256", indexed: false },
        ],
    },
] as const;

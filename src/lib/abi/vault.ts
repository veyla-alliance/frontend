export const vaultAbi = [
    // ── Write ────────────────────────────────────────────────────────────────

    {
        name: "deposit",
        type: "function",
        stateMutability: "payable",
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
    {
        name: "claimYield",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ name: "token", type: "address" }],
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
        name: "tvlOf",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "token", type: "address" }],
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
        name: "YieldClaimed",
        type: "event",
        inputs: [
            { name: "user",   type: "address", indexed: true  },
            { name: "token",  type: "address", indexed: true  },
            { name: "amount", type: "uint256", indexed: false },
        ],
    },
    {
        name: "RoutedLocally",
        type: "event",
        inputs: [
            { name: "token",  type: "address", indexed: true  },
            { name: "amount", type: "uint256", indexed: false },
        ],
    },
    {
        name: "RoutedCrossChain",
        type: "event",
        inputs: [
            { name: "token",       type: "address", indexed: true  },
            { name: "destination", type: "bytes",   indexed: false },
            { name: "amount",      type: "uint256", indexed: false },
        ],
    },
    {
        name: "YieldPoolFunded",
        type: "event",
        inputs: [
            { name: "from",   type: "address", indexed: true  },
            { name: "amount", type: "uint256", indexed: false },
        ],
    },

    // ── New read: config getters ──────────────────────────────────────────────

    {
        name: "depositTimestampOf",
        type: "function",
        stateMutability: "view",
        inputs: [
            { name: "user",  type: "address" },
            { name: "token", type: "address" },
        ],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        name: "tokenRoute",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "token", type: "address" }],
        outputs: [{ name: "", type: "string" }],
    },
    {
        name: "protocolFeeBps",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        name: "rebalanceInterval",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        name: "lastRoutedAt",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
    },

    // ── New admin write ───────────────────────────────────────────────────────

    {
        name: "setProtocolFee",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ name: "feeBps", type: "uint256" }],
        outputs: [],
    },
    {
        name: "setRebalanceInterval",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ name: "interval", type: "uint256" }],
        outputs: [],
    },
    {
        name: "setTokenRoute",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "token", type: "address" },
            { name: "route", type: "string" },
        ],
        outputs: [],
    },

    // ── New events ────────────────────────────────────────────────────────────

    {
        name: "ProtocolFeeUpdated",
        type: "event",
        inputs: [
            { name: "newFeeBps", type: "uint256", indexed: false },
        ],
    },
    {
        name: "RebalanceIntervalUpdated",
        type: "event",
        inputs: [
            { name: "newInterval", type: "uint256", indexed: false },
        ],
    },
    {
        name: "TokenRouteUpdated",
        type: "event",
        inputs: [
            { name: "token", type: "address", indexed: true  },
            { name: "route", type: "string",  indexed: false },
        ],
    },

    // ── Treasury ──────────────────────────────────────────────────────────────

    {
        name: "treasury",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "address" }],
    },
    {
        name: "setTreasury",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ name: "newTreasury", type: "address" }],
        outputs: [],
    },
    {
        name: "TreasuryUpdated",
        type: "event",
        inputs: [
            { name: "newTreasury", type: "address", indexed: true },
        ],
    },
] as const;

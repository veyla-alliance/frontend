# Veyla — Intelligent Yield Router for Polkadot Hub

Veyla automatically routes user assets across Polkadot parachains (Hydration, Moonbeam, etc.) to capture the highest available yield, without requiring users to manage bridges or protocol switches manually.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Web3 | Wagmi v3 + Viem v2 + React Query v5 |
| Toasts | Sonner |
| Chain | Passet Hub (Polkadot Hub Testnet, chain ID 420420422) |

---

## Project Structure

```
frontend/src/
├── app/
│   ├── page.tsx                  # Marketing landing page
│   ├── layout.tsx
│   ├── globals.css               # Design tokens + base styles
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── app/                      # Wallet-gated app shell
│       ├── layout.tsx            # Sidebar + topbar layout
│       ├── page.tsx              # Dashboard (positions + stats)
│       ├── vault/page.tsx        # Deposit / withdraw
│       ├── routes/page.tsx       # Available yield routes
│       └── history/page.tsx      # Transaction history
├── components/
│   ├── sections/                 # Landing page sections
│   ├── ui/                       # Button, SectionHeader
│   ├── effects/                  # MagneticCursor
│   └── app/                      # App UI (sidebar, vault form, dashboard, etc.)
├── hooks/
│   ├── useVaultBalance.ts        # Read: balance, earned, APY, TVL
│   ├── useUserPositions.ts       # Derived positions from on-chain reads
│   ├── useERC20Balance.ts        # Wallet token balance
│   ├── useDeposit.ts             # Write: ERC-20 approve → vault deposit
│   └── useWithdraw.ts            # Write: vault withdraw
├── lib/
│   ├── wagmi.ts                  # Wagmi config + Passet Hub chain definition
│   ├── env.ts                    # Centralised env var access
│   ├── txUtils.ts                # Shared parseError utility
│   ├── providers.tsx             # Wagmi + React Query providers
│   └── abi/
│       ├── vault.ts              # Veyla vault contract ABI
│       └── erc20.ts              # Minimal ERC-20 ABI (balanceOf, allowance, approve)
├── types/
│   ├── tx.ts                     # TxStatus + TxState types
│   └── vault.ts                  # VaultPosition, AssetSymbol
└── config/
    └── site.ts                   # Nav links, footer links, social URLs
```

---

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

```env
# Passet Hub RPC
NEXT_PUBLIC_RPC_URL=https://testnet-passet-hub-eth-rpc.polkadot.io

# Deployed contract addresses (fill in after deploying the smart contract)
NEXT_PUBLIC_VAULT_ADDRESS=
NEXT_PUBLIC_DOT_TOKEN_ADDRESS=
NEXT_PUBLIC_USDT_TOKEN_ADDRESS=

# Chain config
NEXT_PUBLIC_CHAIN_ID=420420422
NEXT_PUBLIC_BLOCK_EXPLORER_URL=https://blockscout-passet-hub.parity-chains-scw.parity.io
```

> The app runs in a degraded state (no wallet interactions) when contract addresses are not set. The landing page is fully functional without them.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Transaction Flow

Deposits go through a two-step ERC-20 flow:

```
1. allowance() check
   ├─ sufficient → skip to step 2
   └─ insufficient → approve(vaultAddress, amount) → wait for confirmation

2. vault.deposit(tokenAddress, amount)
   └─ wait for confirmation → success
```

State machine: `idle → awaiting-approval → approving → awaiting-signature → pending → success`

Withdrawals skip the approval step: `idle → awaiting-signature → pending → success`

---

## Smart Contract Integration Checklist

Before connecting to a deployed contract:

- [x] ERC-20 approval flow implemented in `useDeposit`
- [x] Real wallet balance via `useERC20Balance`
- [x] React Query cache invalidation after tx success
- [ ] Update `src/lib/abi/vault.ts` with the real deployed ABI
- [ ] Populate `.env.local` with deployed contract addresses

---

## Deploy

```bash
npm run build
```

The project is configured for deployment on [Vercel](https://vercel.com). Push to main — Vercel picks it up automatically. Make sure all `NEXT_PUBLIC_*` env vars are set in the Vercel project settings.

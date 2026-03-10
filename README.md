# Veyla — Frontend

Next.js frontend for the Veyla yield optimization protocol on Polkadot Hub.

**Live:** [veyla.vercel.app](https://veyla.vercel.app)

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Web3 | wagmi v3, viem v2 |
| UI | TailwindCSS v4, Framer Motion, Lucide Icons |
| Data | TanStack Query v5 |
| Notifications | Sonner |
| Target chain | Passet Hub Testnet (Chain ID: `420420417`) |

## Setup

### 1. Install

```bash
npm install
```

### 2. Create `.env.local`

```env
NEXT_PUBLIC_CHAIN_ID=420420417
NEXT_PUBLIC_RPC_URL=https://eth-rpc-testnet.polkadot.io
NEXT_PUBLIC_BLOCK_EXPLORER_URL=https://blockscout-testnet.polkadot.io
NEXT_PUBLIC_VAULT_ADDRESS=0x741Ec097b0D3dc7544c58C1B7401cb7540D2829b
NEXT_PUBLIC_DOT_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_USDT_TOKEN_ADDRESS=0x000007c000000000000000000000000001200000
```

### 3. Run

```bash
npm run dev
# Open http://localhost:3000
```

### 4. Add Passet Hub to MetaMask

| Field | Value |
|---|---|
| Network Name | Passet Hub Testnet |
| RPC URL | `https://eth-rpc-testnet.polkadot.io` |
| Chain ID | `420420417` |
| Currency Symbol | `PAS` |
| Block Explorer | `https://blockscout-testnet.polkadot.io` |

Get testnet PAS: [faucet.polkadot.io](https://faucet.polkadot.io)

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/app` | Dashboard — positions, APY, stats |
| `/app/vault` | Deposit / Withdraw |
| `/app/routes` | Route visualization + APY table |
| `/app/history` | Transaction history |

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   └── app/
│       ├── layout.tsx        # App shell (sidebar, topbar, auth guard)
│       ├── page.tsx          # Dashboard
│       ├── vault/page.tsx    # Deposit / Withdraw
│       ├── routes/page.tsx   # Route visualization
│       └── history/page.tsx
├── components/
│   ├── sections/             # Landing page sections
│   └── app/                  # App shell + feature components
├── hooks/
│   ├── useDeposit.ts         # Deposit lifecycle (allowance → approve → deposit)
│   ├── useWithdraw.ts        # Withdraw lifecycle
│   ├── useERC20Balance.ts    # ERC-20 balance reader
│   ├── useVaultBalance.ts    # Vault contract reads (balance, earned, APY, TVL)
│   └── useUserPositions.ts   # Multicall position aggregator
└── lib/
    ├── wagmi.ts              # Passet Hub chain config + connectors
    ├── env.ts                # Typed + required env vars
    ├── constants.ts          # TOKEN_ADDRESSES
    ├── txUtils.ts            # parseError, isUserRejection
    └── abi/
        ├── vault.ts          # VeylaVault ABI
        └── erc20.ts          # Minimal ERC-20 ABI
```

## Transaction Flow

**Deposit DOT** (native asset via `msg.value`):
```
idle → awaiting-signature → pending → success
```

**Deposit USDT** (ERC-20 — approve first if needed):
```
idle → [awaiting-approval → approving] → awaiting-signature → pending → success
```

**Withdraw:**
```
idle → awaiting-signature → pending → success
```

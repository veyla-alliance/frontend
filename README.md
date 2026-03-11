# Veyla — Frontend

Next.js frontend for the Veyla yield optimization protocol on Polkadot Hub.

**Live:** [veyla.xyz](https://www.veyla.xyz)

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
NEXT_PUBLIC_VAULT_ADDRESS=0x5196F62a03cCDBed4b5372dC59E982b9A1e2B088
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
| `/app` | Dashboard — positions, APY, activity feed |
| `/app/vault` | Deposit / Withdraw |
| `/app/routes` | Route visualization + APY table |
| `/app/history` | Transaction history (on-chain events) |

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
│       └── history/page.tsx  # Transaction history
├── components/
│   ├── sections/             # Landing page sections
│   └── app/                  # App shell + feature components
├── hooks/
│   ├── useDeposit.ts         # Deposit lifecycle (allowance → approve → deposit)
│   ├── useWithdraw.ts        # Withdraw lifecycle
│   ├── useERC20Balance.ts    # ERC-20 balance reader (staleTime 15s, refetch 30s)
│   ├── useVaultBalance.ts    # Vault reads: balanceOf, earned, currentApy, tvlOf
│   ├── useUserPositions.ts   # Multicall position aggregator
│   ├── useTokenPrices.ts     # CoinGecko prices (TanStack Query, refetch 60s, fallback values)
│   └── useVaultHistory.ts    # On-chain event decoder with localStorage cache
└── lib/
    ├── wagmi.ts              # Passet Hub chain config + fallback retry transport
    ├── env.ts                # Typed + required env vars
    ├── constants.ts          # TOKEN_ADDRESSES
    ├── txUtils.ts            # parseError, isUserRejection
    └── abi/
        ├── vault.ts          # VeylaVault ABI (deposit, withdraw, claimYield, events)
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

## History & Caching

`useVaultHistory` fetches `Deposited`, `Withdrawn`, and `YieldClaimed` events from the vault contract:

- **Incremental fetch** — stores `lastBlock` in localStorage, only queries new blocks on subsequent loads
- **Optimistic cache** — `pushToHistoryCache()` prepends new rows immediately after a tx succeeds, no page reload needed
- **Schema validation** — each cached row passes a runtime type guard before use
- **TTL 7 days** — stale cache triggers a full re-sync
- **Max 200 rows** — bounds localStorage usage

## Resilience

- **RPC retry transport** — `fallback([http(url, { retryCount: 3, retryDelay: 1000 })])` in `wagmi.ts`
- **Price fallback** — `useTokenPrices` falls back to `{ DOT: 7.85, USDT: 1.00 }` if CoinGecko is unavailable
- **Stale closure protection** — in-flight tx context captured in `useRef` at submit time, not read from stale state on success

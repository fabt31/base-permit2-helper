# base-permit2-helper

> Permit2 Integration Helper for Base L2

Simplify Permit2 integration in your Base dApp. Gasless token approvals, signature-based batch transfers, and allowance management with the Uniswap Permit2 contract.

## What is Permit2?
Permit2 is Uniswap's universal token approval contract. Users approve Permit2 once, then grant time-limited, amount-limited permissions to specific contracts — no more unlimited approvals.

## Features
- ✍️ EIP-712 permit signature generation
- 📦 Batch permit (multiple tokens in one sig)
- ⏰ Time-limited allowances
- 🔒 Amount-limited permissions
- 🔄 Permit transfer from helper
- 📊 Allowance checker

## Installation
```bash
npm install base-permit2-helper
# or
git clone https://github.com/fabt31/base-permit2-helper
npm install
```

## Usage
```typescript
import { signPermit, signBatchPermit } from "./src/permit2";

// Sign a single permit
const { signature, permit } = await signPermit({
  token: USDC_ADDRESS,
  spender: SWAP_ROUTER,
  amount: "1000000000", // 1000 USDC
  deadline: Math.floor(Date.now() / 1000) + 3600,
  signer,
});

// Sign batch permit for multiple tokens
const batch = await signBatchPermit({
  tokens: [USDC_ADDRESS, WETH_ADDRESS],
  spender: ROUTER,
  amounts: ["1000000000", "500000000000000000"],
  signer,
});
```

## Permit2 Address (all EVM chains)
`0x000000000022D473030F116dDEE9F6B43aC78BA3`

## License
MIT
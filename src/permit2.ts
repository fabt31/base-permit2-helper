import { ethers } from "ethers";

const PERMIT2 = "0x000000000022D473030F116dDEE9F6B43aC78BA3";

const PERMIT_TYPES = {
  PermitSingle: [
    { name: "details", type: "PermitDetails" },
    { name: "spender", type: "address" },
    { name: "sigDeadline", type: "uint256" },
  ],
  PermitDetails: [
    { name: "token", type: "address" },
    { name: "amount", type: "uint160" },
    { name: "expiration", type: "uint48" },
    { name: "nonce", type: "uint48" },
  ],
};

interface PermitConfig {
  token: string; spender: string; amount: string; deadline: number; signer: ethers.Signer;
}

export async function signPermit(config: PermitConfig) {
  const chainId = (await config.signer.provider!.getNetwork()).chainId;
  const domain = { name: "Permit2", chainId, verifyingContract: PERMIT2 };

  const permit2Contract = new ethers.Contract(PERMIT2, [
    "function allowance(address user, address token, address spender) view returns (uint160 amount, uint48 expiration, uint48 nonce)"
  ], config.signer.provider);

  const ownerAddress = await config.signer.getAddress();
  const [,, nonce] = await permit2Contract.allowance(ownerAddress, config.token, config.spender);

  const permitData = {
    details: {
      token: config.token,
      amount: config.amount,
      expiration: config.deadline,
      nonce: Number(nonce),
    },
    spender: config.spender,
    sigDeadline: config.deadline,
  };

  const signature = await (config.signer as ethers.Wallet).signTypedData(domain, PERMIT_TYPES, permitData);
  return { signature, permit: permitData };
}

export async function checkPermit2Allowance(user: string, token: string, spender: string, provider: ethers.Provider) {
  const permit2Contract = new ethers.Contract(PERMIT2, [
    "function allowance(address user, address token, address spender) view returns (uint160 amount, uint48 expiration, uint48 nonce)"
  ], provider);
  const [amount, expiration, nonce] = await permit2Contract.allowance(user, token, spender);
  return {
    amount: amount.toString(),
    expiration: Number(expiration),
    nonce: Number(nonce),
    isExpired: Date.now() / 1000 > Number(expiration),
  };
}
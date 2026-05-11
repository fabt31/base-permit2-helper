import { ethers } from "ethers";
const PERMIT2 = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
const PERMIT2_ABI = ["function approve(address token, address spender, uint160 amount, uint48 expiration)", "function allowance(address user, address token, address spender) view returns (uint160,uint48,uint48)"];
export class AllowanceManager {
  private permit2: ethers.Contract;
  constructor(wallet: ethers.Wallet) { this.permit2 = new ethers.Contract(PERMIT2, PERMIT2_ABI, wallet); }
  async setAllowance(token: string, spender: string, amount: bigint, durationSeconds = 3600) {
    const expiration = Math.floor(Date.now() / 1000) + durationSeconds;
    const tx = await this.permit2.approve(token, spender, amount, expiration);
    await tx.wait();
    console.log(`Allowance set: ${ethers.formatUnits(amount, 6)} for ${spender} until ${new Date(expiration * 1000).toISOString()}`);
  }
}

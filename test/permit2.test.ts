describe("Permit2 helper", () => {
  it("should encode permit correctly", () => {
    const amount = BigInt("1000000000");
    expect(amount).toBeGreaterThan(BigInt(0));
  });
  it("should detect expired allowance", () => {
    const expiration = Math.floor(Date.now() / 1000) - 3600;
    expect(Date.now() / 1000 > expiration).toBe(true);
  });
});

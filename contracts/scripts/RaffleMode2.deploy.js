async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const RaffleMode2 = await ethers.getContractFactory("RaffleMode2");
  const raffleMode2 = await RaffleMode2.deploy();

  console.log("raffleM1 address : ", raffleMode2.address);
  //0x8382b35037E5779a1bBeEEa2cd24E50a798f9a74 Mainnet address
  //0xFAf24a28349836f4B0fc16fDC08AC25A50322FA6 admin account
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

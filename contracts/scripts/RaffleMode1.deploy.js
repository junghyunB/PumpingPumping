async function main() {
    
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const RaffleMode1 = await ethers.getContractFactory("RaffleMode1");
    const raffleMode1 = await RaffleMode1.deploy();

    console.log("raffleM1 address : ", raffleMode1.address);
    //0x3000b1eD9ba5990a7A3FEf1F1b74cdB39309DbA4 Mainnet address
    //0xFAf24a28349836f4B0fc16fDC08AC25A50322FA6 admin account
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
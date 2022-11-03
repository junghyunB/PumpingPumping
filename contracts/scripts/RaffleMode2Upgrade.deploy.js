const { upgrades } = require("hardhat");
const hre = require("hardhat");

async function main() {
    

    const RaffleMode1Upgrade = await hre.ethers.getContractFactory("RaffleMode2");
    const ssu = await upgrades.deployProxy(RaffleMode1Upgrade,[], {initializer: "initializer"} );
    console.log("RaffleMode1Upgrade Address : ", ssu.address);
    
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
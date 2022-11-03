const hre = require("hardhat");
const { expect } = require("chai");
const { waffle } = require("hardhat");


describe("RaffleMode1Test", function () {
    const wallets = waffle.provider.getWallets();
  
    before(async () => {
      const signer = waffle.provider.getSigner();
      const RaffleMode2 = await hre.artifacts.readArtifact("RaffleMode2");
      this.instance = await waffle.deployContract(signer, RaffleMode2);
    });

    it.only("contractBalanceM1", async () => {
        const balance = await this.instance.winnerOfRaffleM2();
        const getWinnerM2 = await this.instance.getWinnerM2(1);
        const getWinningNumber = await this.instance.getWinningNumber(1);
        console.log(getWinnerM2);
        console.log(parseInt(getWinningNumber))
      });
})
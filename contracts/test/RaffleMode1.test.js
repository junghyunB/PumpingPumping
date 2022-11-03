const hre = require("hardhat");
const { expect } = require("chai");
const { waffle } = require("hardhat");

describe("RaffleMode1Test", function () {
  const wallets = waffle.provider.getWallets();

  before(async () => {
    const signer = waffle.provider.getSigner();
    const RaffleMode1 = await hre.artifacts.readArtifact("RaffleMode1");
    this.instance = await waffle.deployContract(signer, RaffleMode1);
  });

  it("contractBalanceM1", async () => {
    const balance = await this.instance.contractBalanceM1();
    console.log(balance);
    expect(balance).to.be.equal(0);
  });

  it("initialize", async () => {
    const initialize = await this.instance.initializer();
    const owner = await this.instance.owner();
    console.log(owner);
    expect(owner).to.be.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  });
  it.only("buyTicketM1", async () => {
    const ticketPrice = 5;
    const amount = 3;
    const decimals = 10 ** 18;
    const owner = await this.instance.owner();
    const buyTicketM1 = await this.instance.buyTicketM1(amount, {
      value: String(ticketPrice * amount * decimals),
      gasLimit: 3e7,
    });
    const getInvestAmountM1 = await this.instance.getInvestAmountM1(owner, 1);
    expect(getInvestAmountM1).to.be.equals(3);
  });
  it("WinnerOfRaffle", async() => {
    const WinnerOfRaffle = await this.instance.winnerOfRaffleM1();
    const epochWinner = await this.instance.getWinnerM1(1);
  });
  it("claimRewardM1", async() => {
    const contractBalance = await this.instance.contractBalanceM1();
    console.log("contract balance before : ", contractBalance)
    const epochWinner = await this.instance.getWinnerM1(1);
    const claimRewardM1 = await this.instance.claimRewardM1(1);
    console.log("contract balance after : ", contractBalance)
   
  })
});

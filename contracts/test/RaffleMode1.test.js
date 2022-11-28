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

  it("buyTicketM1", async () => {
    const wallets = waffle.provider.getWallets();
    const ticketPrice = 5;
    const amount = 3;
    const amount2 = 5;
    const amount3 = 8;
    const decimals = 10 ** 18;
    const owner = await this.instance.owner();
    console.log("owner : ", owner);

    await this.instance.buyTicketM1(amount, {
      value: String(ticketPrice * amount * decimals),
      gasLimit: 3e7,
    });

    await this.instance.buyTicketM1(amount2, {
      from : wallets[1].address,
      value: String(ticketPrice * amount2 * decimals),
      gasLimit: 3e7,
    });

    await this.instance.buyTicketM1(amount3, {
      from : wallets[2].address,
      value: String(ticketPrice * amount3 * decimals),
      gasLimit: 3e7,
    });

    const getInvestAmountM1 = await this.instance.getInvestAmountM1(owner, 1);
    console.log(getInvestAmountM1.toString())
    expect(getInvestAmountM1).to.be.equals(16);
  });
 
  it("isClaimedRewardM1", async () => {
    const epoch = await this.instance._epoch();
    const owner = await this.instance.owner();
    const isClaimedRewardM1 = await this.instance.isClaimedRewardM1(owner, epoch - 1)
    console.log(`Winner isClaimedRewardM1 : `, isClaimedRewardM1.toString())
  })  

  it("totalTicket", async () => {
    const epoch = await this.instance._epoch();
    const totalTicket = await this.instance.totalTicketM1(epoch)
    console.log(`${epoch}Round totalTicket : `, totalTicket.toString())
  })

  it("getMyTicketNumberM1", async () => {
    const epoch = await this.instance._epoch();
    const owner = await this.instance.owner();
    const myNumberList = await this.instance.getMyTicketNumberM1(owner,epoch)
    console.log(`${epoch}Round totalAmountM1 : `, myNumberList.toString())
    console.log("wallets : ");

  })

  it("totalAmountM1", async () => {
    const epoch = await this.instance._epoch();
    const totalAmountM1 = await this.instance.totalAmountM1(epoch)
    console.log(`${epoch}Round myNumberList : `, totalAmountM1.toString())
  })

  it("WinnerOfRaffle", async() => {
    const nextRound = "11 30 2022 13:00:00";
    const WinnerOfRaffle = await this.instance.winnerOfRaffleM1(nextRound);
    const epochWinner = await this.instance.getWinnerM1(1);
    console.log("Winner : ", epochWinner);
  });

  it("getWinningTicketId", async () => {
    const epoch = await this.instance._epoch();
    const winningTicketId = await this.instance.getWinningTicketId(epoch - 1)
    console.log(`${epoch - 1}Round winningTicketId : `, winningTicketId.toString())
  })

  it("isClaimedRewardM1", async () => {
    const epoch = await this.instance._epoch();
    const owner = await this.instance.owner();
    const isClaimedRewardM1 = await this.instance.isClaimedRewardM1(owner, epoch - 1)
    console.log(`Winner isClaimedRewardM1 : `, isClaimedRewardM1.toString())
  })  

  it("claimRewardM1", async() => {
    const contractBalance = await this.instance.contractBalanceM1();
    console.log("contract balance before : ", contractBalance.toString())
    const epochWinner = await this.instance.getWinnerM1(1);
    const claimRewardM1 = await this.instance.claimRewardM1(1);
  })

  it("isClaimedRewardM1", async () => {
    const epoch = await this.instance._epoch();
    const owner = await this.instance.owner();
    const isClaimedRewardM1 = await this.instance.isClaimedRewardM1(owner, epoch - 1)
    console.log(`Winner isClaimedRewardM1 : `, isClaimedRewardM1.toString())
  })  

  it("getTimerM1", async () => {
    const epoch = await this.instance._epoch();
    const getTimerM1 = await this.instance.getTimerM1(epoch)
    console.log(`${epoch} getTimerM1 : `, getTimerM1)
  })  

  it("contractBalanceM1", async () => {
    const balance = await this.instance.contractBalanceM1();
    console.log("contract balance after : ", balance.toString());
  });
});

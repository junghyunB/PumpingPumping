
require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-ethers");
// require("hardhat-klaytn-patch");
require("dotenv").config();



task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});




module.exports = {
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {},
    cypress: {
      url: process.env.CYPRESS_URL,
      httpHeaders: {
        'Authorization': 'Basic ' + Buffer.from(process.env.ACCESS_KEY_ID + ':' + process.env.SECRET_ACCESS_KEY).toString('base64'),
        'x-chain-id': '8217',
      },
      accounts: [
        process.env.DEPLOYER || ''
      ],
      chainId: 8217,
      gas: 8500000,
      gasPrice: 250000000000,
    },
    baobab: {
      url: process.env.BAOBAB_URL,
      httpHeaders: {
        'Authorization': 'Basic ' + Buffer.from(process.env.ACCESS_KEY_ID + ':' + process.env.SECRET_ACCESS_KEY).toString('base64'),
        'x-chain-id': '1001',
      },
      accounts: [
        process.env.DEPLOYER || ''
      ],
      chainId: 1001,
      gas: 8500000,
      gasPrice: 250000000000,
    },

  },
  mocha: {
    timeout: 100000
  },
  solidity: {
    compilers: [
      {
        version: "0.8.15",
      },
    ],   
},

};
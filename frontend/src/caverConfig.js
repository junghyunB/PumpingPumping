import Caver from "caver-js";


var global = global || window;
global.Buffer = global.Buffer || require("buffer").Buffer;

export const RAFFLEV1_CONTRACT_ADDRESS = "0x4AF3974689FDE3d121895De3c57D9c9E31FA2691";
export const RAFFLEV1_CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "applyToRaffle",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "epochWinner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "getInvestAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "randomGenerate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rewardTransfer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userdata",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isEntered",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "investAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winnerOfRaffle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "winningTicket",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export const caver = new Caver(window.caver);
export const adminAccount = caver.klay.accounts.wallet.add("0xa5ef834ed522e87f5718be527f30a883979a1025a53a1172a60ba8b6a77c30a3")
const keyring = caver.wallet.keyring.create("0x058eb1928A62EDc57B626A02b2EFa397a96f78E8", "0xa5ef834ed522e87f5718be527f30a883979a1025a53a1172a60ba8b6a77c30a3");
caver.wallet.add(keyring); 

export const raffleV1Contract = new caver.klay.Contract(
    RAFFLEV1_CONTRACT_ABI,
    RAFFLEV1_CONTRACT_ADDRESS
);
//SPDX-License-Identifier : MIT
pragma solidity ^0.8.15;

contract RaffleV1 {
    address public owner;
    uint _epoch = 0;
    uint private decimals = 10 ** 18; 
    address public account2 = address(0);
    struct userInfo {
        bool isEntered;
        uint investAmount;
    }
    
    mapping(address => mapping(uint => userInfo)) public userdata;
    mapping(uint => address) public epochWinner;
    
    address[] public winningTicket;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Can only Called owner");
        _;
    }

    function applyToRaffle(uint _amount) public payable {
        require(msg.sender.balance >= msg.value, "Not Enough Ethers");
        require(userdata[msg.sender][_epoch].isEntered == false, "already entered this system");
        require(_amount <= 5, "maximum amount is 5");

        for(uint i = 0; i < _amount; i++) {
            winningTicket.push(msg.sender);
        }

        userdata[msg.sender][_epoch].isEntered = true;
        userdata[msg.sender][_epoch].investAmount = _amount;
    } 

    function totalAmount() public view returns(uint) {
        return address(this).balance;
    }

    function getRatio(address _to) public view returns(uint) {
        uint myinvestAmount = userdata[_to][_epoch].investAmount;
        return myinvestAmount / address(this).balance; 
    }

    function randomGenerate() public view returns(uint) {
        uint randomNumber = uint(keccak256(abi.encodePacked(msg.sender, block.timestamp))) % winningTicket.length;
        return randomNumber;
    }

    function WinnerOfRaffle() public onlyOwner{
        require(epochWinner[_epoch] == address(0), "this epoch already electric winner!");
        address winner = winningTicket[randomGenerate()];
        epochWinner[_epoch] = winner; 
    }

    function calculateFee() internal view returns(uint) {
        return ( address(this).balance * 95 ) / 100;
    }

    function rewardTransfer() public payable onlyOwner {
        require(epochWinner[_epoch] != address(0), "No Winner");

        (bool success, ) = epochWinner[_epoch].call{value: calculateFee()}("");
        require(success, "Not send Ether");
        (bool success2, ) = owner.call{value: address(this).balance}("");
        require(success2, "Not send Ether");

        delete winningTicket;
        _epoch++;
    } 

}
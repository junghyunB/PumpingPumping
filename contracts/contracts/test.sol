//SPDX-License-Identifier : MIT
pragma solidity ^0.8.15;
import "hardhat/console.sol";
contract RaffleMode32 {
    address public owner;
    uint public ticket1 = 6;

    uint public _epoch = 1;
    uint ticketId = 1;  
    uint private decimals = 10**18;
    uint[5] sectionPercent = [10, 15, 20, 25, 30];
  

    struct userInfoM2 {
        uint amountTicket;
        uint[] myTicket;
        uint[] myTicketId; 
    }



    mapping(address => mapping(uint => userInfoM2)) public userdataM2;
    mapping(uint => uint) epochPrizeM2;
    mapping(uint => address) epochWinnerM2;
    mapping(uint => mapping(uint => address[])) public ticketOwnedUserM2;
    mapping(uint => uint) ticketAmountM2;
    mapping(uint => uint) winningNumberM2;




    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Can only Called owner");
        _;
    }

    function buyTicket1(uint[] memory ticketNumber) internal view returns (bool) {
        require(ticket1 * ticketNumber.length * decimals == msg.value, "correct pay");
        require(msg.value <= msg.sender.balance, "Not enough Klay");
        require(ticketNumber.length <= 10, "please under 10 select");
        require(userdataM2[msg.sender][_epoch].amountTicket + ticketNumber.length <= 10, "maximum 10 Ticket");
        return true;
    }

    function otherTicket(uint ticketType, uint[] memory ticketNumber) internal view returns (bool) {
        uint ticketPrice = (ticketType + 1) * 3;
        require(ticketPrice * ticketNumber.length * decimals == msg.value, "incorrect pay");
        require(msg.value <= msg.sender.balance, "Not enough Klay");
        require(ticketNumber.length <= 10, "please under 10 select");
        require(userdataM2[msg.sender][_epoch].amountTicket + ticketNumber.length <= 10, "maximum 10 Ticket");
        return true;
    }

    function insertData(uint[] memory ticketNumber) internal {
            for(uint i = 0; i < ticketNumber.length; i++) {
                userdataM2[msg.sender][_epoch].amountTicket += 1;
                userdataM2[msg.sender][_epoch].myTicket.push(ticketNumber[i]);
                userdataM2[msg.sender][_epoch].myTicketId.push(ticketId);
                ticketOwnedUserM2[_epoch][ticketNumber[i]].push(msg.sender);
                ticketAmountM2[_epoch] += 1;
                ticketId++;
            }            
    }

    function buyTicketM1(uint ticketType, uint[] memory ticketNumber) public payable {
        require(ticketType < 7, "is not Ticket Type");
        uint ticketPrice = (ticketType + 1) * 3;
        if (ticketType == 1) {
            require(buyTicket1(ticketNumber));
            insertData(ticketNumber);
            epochPrizeM2[_epoch] += ticket1 * ticketNumber.length * decimals;
        } else if(ticketType > 1 || ticketType < 7 ) {
            require(otherTicket(ticketType, ticketNumber));
            insertData(ticketNumber);
            epochPrizeM2[_epoch] += ticketPrice * ticketNumber.length * decimals;
        }
    }



    function winningNumberGenerate() internal view returns(uint) {
        uint randomNumber = uint(keccak256(abi.encodePacked(msg.sender, block.timestamp, blockhash(block.number-1)))) % 50 + 1;
        return randomNumber;
    }

    function redraw(uint winningNumber) internal view returns(uint) {
        uint randomNumber = uint(keccak256(abi.encodePacked(msg.sender, block.timestamp, blockhash(block.number-1)))) % ticketOwnedUserM2[_epoch][winningNumber].length;
        return randomNumber;
    }

    function winningTicketGenerator() internal view returns(uint) {
        uint randomNumber = uint(keccak256(abi.encodePacked(msg.sender, block.timestamp, blockhash(block.number-1)))) % 100;
        uint storedPer = 0;
        for(uint i = 0; i < sectionPercent.length; i++) {
            storedPer += sectionPercent[i];
            if(storedPer > randomNumber) {
                return sectionPercent[i];
            }
        }
    }

    function PickWinner(uint winningNumber) internal {
        winningNumberM2[_epoch] = winningNumber;
        if(ticketOwnedUserM2[_epoch][winningNumber].length == 0) {
            epochWinnerM2[_epoch] = address(0); 
            ticketId = 1;
            _epoch++;
            epochPrizeM2[_epoch] += epochPrizeM2[_epoch - 1];
        } else if(ticketOwnedUserM2[_epoch][winningNumber].length == 1) {
            epochWinnerM2[_epoch] = ticketOwnedUserM2[_epoch][winningNumber][0];
            ticketId = 1;
            _epoch++;
        } else if(ticketOwnedUserM2[_epoch][winningNumber].length > 1) {
            uint lastPickWinner = redraw(winningNumber);
            epochWinnerM2[_epoch] = ticketOwnedUserM2[_epoch][winningNumber][lastPickWinner];
            ticketId = 1;
            _epoch++;
        }
    }

    function winnerOfRaffleM2() public onlyOwner {
        require(epochWinnerM2[_epoch] == address(0), "this epoch already electric winner!");
        uint section = winningTicketGenerator();
        if(section == 10) {
            uint winningNumber = winningNumberGenerate();
            PickWinner(winningNumber);
        } else if(section == 15) {
            uint winningNumber = winningNumberGenerate() + 50;
            PickWinner(winningNumber);
        } else if(section == 20) {
            uint winningNumber = winningNumberGenerate() + 100;
            PickWinner(winningNumber);
        } else if(section == 25) {
            uint winningNumber = winningNumberGenerate() + 150;
            PickWinner(winningNumber);
        } else if(section == 30) {
            uint winningNumber = winningNumberGenerate() + 200;
            PickWinner(winningNumber);
        }
    }

    function calculateWinnerFee(uint epoch) internal view returns(uint) {
        return ( epochPrizeM2[epoch] * 95 ) / 100;
    }

    function calculateOwnerFee(uint epoch) internal view returns(uint) {
        return ( epochPrizeM2[epoch] * 5 ) / 100;
    }

    function claimRewardM2(uint epoch) public payable {
        require(epochWinnerM2[epoch] != address(0), "No Winner");
        require(epochWinnerM2[epoch] == msg.sender, "Call must be Winner");

        (bool success, ) = epochWinnerM2[epoch].call{value: calculateWinnerFee(epoch)}("");
        require(success, "Not send Klay1");
        (bool success2, ) = owner.call{value: calculateOwnerFee(epoch)}("");
        require(success2, "Not send Klay2");
    } 

    // 회차별 총 상금 return
    function totalAmount(uint epoch) public view returns(uint) {
        return epochPrizeM2[epoch];
    }

    // 컨트랙트 보유 금액 
    function contractBalanceM2() public view returns(uint) {
        return address(this).balance;
    }

    // 회차별 티켓 총 수량 
    function totalTicketM2(uint epoch) public view returns(uint) {
        return ticketAmountM2[epoch];
    }

    // 역대 회차 내가 보유한 티켓정보 조회
    function getMyTicketNumberM2(address _to, uint epoch) public view returns(uint[] memory, uint[] memory) {
        return (userdataM2[_to][epoch].myTicket, userdataM2[_to][epoch].myTicketId);
    }

    // 역대 회차 승리자 조회
    function getWinnerM2(uint epoch) public view returns(address) {
        return epochWinnerM2[epoch];
    }

    // 역대 회차 승리 티켓 넘버 조회 

    function getWinningNumber(uint epoch) public view returns(uint) {
        return winningNumberM2[epoch];
    }

    


}

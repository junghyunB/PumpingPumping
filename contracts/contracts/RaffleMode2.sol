// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.15;
import "hardhat/console.sol";

contract RaffleMode2 {
    address public owner;
    uint public ticket1 = 6;

    uint public _epoch = 1;
    uint ticketId = 1;
    uint public decimals = 10 ** 18;

    struct userInfoM2 {
        uint amountTicket;
        uint[] myTicket;
        uint[] myTicketId;
    }

    struct winnerInfoM2 {
        address winnerAddress;
        mapping(address => uint) isclaim;
    }

    struct winningNumberInfoM2 {
        uint winningNumberM2;
        uint winningTikcetIdM2;
    }

    mapping(address => mapping(uint => userInfoM2)) userdataM2;
    mapping(uint => uint) epochPrizeM2;
    mapping(uint => winnerInfoM2) epochWinnerM2;
    mapping(uint => uint) ticketAmountM2;
    mapping(uint => winningNumberInfoM2) winningNumberM2;
    mapping(uint => mapping(uint => uint[])) numberToTicketIdM2;
    mapping(uint => mapping(uint => uint)) ticketIdToNumberM2;
    mapping(uint => mapping(uint => address)) ticketIdToOwnerM2;
    mapping(uint => uint[]) tieBreakTicketM2;
    mapping(uint => string) timerDataBaseM2;

    uint[] private dashBoardDataM2;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Can only Called owner");
        _;
    }

    function setDashBoardDataM2(uint winningNumber) internal {
        dashBoardDataM2.push(_epoch);
        dashBoardDataM2.push(totalTicketM2(_epoch));
        dashBoardDataM2.push(totalAmountM2(_epoch) / decimals);
        dashBoardDataM2.push(winningNumber);
        dashBoardDataM2.push(getWinningTicketIdM2(_epoch));
    }

    /**
    * @notice Buy Mode 2 Type 1 ticket
    * @param  ticketNumber uint[]
    */

    function buyTicket1(
        uint[] memory ticketNumber
    ) internal view returns (bool) {
        require(
            ticket1 * ticketNumber.length * decimals == msg.value,
            "correct pay"
        );
        require(ticketNumber.length <= 10, "please under 10 select");
        require(
            userdataM2[msg.sender][_epoch].amountTicket + ticketNumber.length <=
                10,
            "maximum 10 Ticket"
        );
        for (uint i = 0; i < ticketNumber.length; i++) {
            if (ticketNumber[i] > 50) {
                return false;
            }
        }
        return true;
    }

    /**
    * @notice Mode 2 Purchase except Type 1
    * @param  ticketType uint
    * @param  ticketNumber uint[]
    */

    function otherTicket(
        uint ticketType,
        uint[] memory ticketNumber
    ) internal view returns (bool) {
        uint ticketPrice = (ticketType + 1) * 3;
        require(
            ticketPrice * ticketNumber.length * decimals == msg.value,
            "incorrect pay"
        );
        require(ticketNumber.length <= 10, "please under 10 select");
        require(
            userdataM2[msg.sender][_epoch].amountTicket + ticketNumber.length <=
                10,
            "maximum 10 Ticket"
        );
        for (uint i = 0; i < ticketNumber.length; i++) {
            if (ticketNumber[i] > ticketType * 50) {
                return false;
            }
        }
        return true;
    }

    /**
    * @notice Mode 2 Saving data to be saved when purchasing tickets
    */

    function insertData(uint[] memory ticketNumber) internal {
        for (uint i = 0; i < ticketNumber.length; i++) {
            userdataM2[msg.sender][_epoch].amountTicket += 1;
            userdataM2[msg.sender][_epoch].myTicket.push(ticketNumber[i]);
            userdataM2[msg.sender][_epoch].myTicketId.push(ticketId);
            ticketAmountM2[_epoch] += 1;
            numberToTicketIdM2[_epoch][ticketNumber[i]].push(ticketId);
            ticketIdToNumberM2[_epoch][ticketId] = ticketNumber[i];
            ticketIdToOwnerM2[_epoch][ticketId] = msg.sender;
            ticketId++;
        }
    }

    /**
    * @notice Buy Mode 2 Tickets
    * @param  ticketType uint
    * @param  ticketNumber uint[]
    */

    function buyTicketM2(
        uint ticketType,
        uint[] memory ticketNumber
    ) public payable {
        require(ticketType < 6, "is not Ticket Type");
        uint ticketPrice = (ticketType + 1) * 3;
        if (ticketType == 1) {
            require(buyTicket1(ticketNumber));
            insertData(ticketNumber);
            epochPrizeM2[_epoch] += ticket1 * ticketNumber.length * decimals;
        } else if (ticketType > 1 || ticketType < 6) {
            require(otherTicket(ticketType, ticketNumber));
            insertData(ticketNumber);
            epochPrizeM2[_epoch] +=
                ticketPrice *
                ticketNumber.length *
                decimals;
        }
    }

    /**
    * @notice Extract winning number section
    */

    function sectionRandomGenerate() internal view returns (uint) {
        uint randomNumber = uint(
            keccak256(
                abi.encodePacked(
                    msg.sender,
                    block.timestamp,
                    blockhash(block.number - 1)
                )
            )
        ) % 100;
        return randomNumber;
    }

    /**
    * @notice Extract winning numbers
    */

    function winningNumberGenerate() internal view returns (uint) {
        uint randomNumber = (uint(
            keccak256(
                abi.encodePacked(
                    msg.sender,
                    block.timestamp,
                    blockhash(block.number - 1)
                )
            )
        ) % 50) + 1;
        return randomNumber;
    }

    /**
    * @notice Re-raffle in case of duplicate winner
    * @param  winningNumber uint
    */

    function redraw(uint winningNumber) internal view returns (uint) {
        uint randomNumber = uint(
            keccak256(
                abi.encodePacked(
                    msg.sender,
                    block.timestamp,
                    blockhash(block.number - 1)
                )
            )
        ) % numberToTicketIdM2[_epoch][winningNumber].length;
        return randomNumber;
    }

    /**
    * @notice Winner selection
    * @param  winningNumber uint
    */

    function PickWinner(uint winningNumber) internal {
        winningNumberM2[_epoch].winningNumberM2 = winningNumber;
        if (numberToTicketIdM2[_epoch][winningNumber].length == 0) {
            epochWinnerM2[_epoch].winnerAddress = address(0);
            winningNumberM2[_epoch].winningTikcetIdM2 = 0;
            setDashBoardDataM2(winningNumber);
            ticketId = 1;
            _epoch++;
            epochPrizeM2[_epoch] += epochPrizeM2[_epoch - 1];
        } else if (numberToTicketIdM2[_epoch][winningNumber].length == 1) {
            epochWinnerM2[_epoch].winnerAddress = ticketIdToOwnerM2[_epoch][
                numberToTicketIdM2[_epoch][winningNumber][0]
            ];
            epochWinnerM2[_epoch].isclaim[
                ticketIdToOwnerM2[_epoch][
                    numberToTicketIdM2[_epoch][winningNumber][0]
                ]
            ] = 1;
            winningNumberM2[_epoch].winningTikcetIdM2 = numberToTicketIdM2[
                _epoch
            ][winningNumber][0];
            setDashBoardDataM2(winningNumber);
            ticketId = 1;
            _epoch++;
        } else if (numberToTicketIdM2[_epoch][winningNumber].length > 1) {
            uint lastPickWinner = redraw(winningNumber);
            epochWinnerM2[_epoch].winnerAddress = ticketIdToOwnerM2[_epoch][
                numberToTicketIdM2[_epoch][winningNumber][lastPickWinner]
            ];
            epochWinnerM2[_epoch].isclaim[
                ticketIdToOwnerM2[_epoch][
                    numberToTicketIdM2[_epoch][winningNumber][lastPickWinner]
                ]
            ] = 1;
            winningNumberM2[_epoch].winningTikcetIdM2 = numberToTicketIdM2[
                _epoch
            ][winningNumber][lastPickWinner];
            setDashBoardDataM2(winningNumber);
            for (
                uint i = 0;
                i < numberToTicketIdM2[_epoch][winningNumber].length;
                i++
            ) {
                if (
                    numberToTicketIdM2[_epoch][winningNumber][i] !=
                    numberToTicketIdM2[_epoch][winningNumber][lastPickWinner]
                ) {
                    tieBreakTicketM2[_epoch].push(
                        numberToTicketIdM2[_epoch][winningNumber][i]
                    );
                }
            }
            ticketId = 1;
            _epoch++;
        }
    }

    /**
    * @notice Select the winner for this round and set the timer for the next round
    * @param  date string
    */


    function winnerOfRaffleM2(string memory date) public onlyOwner {
        require(
            epochWinnerM2[_epoch].winnerAddress == address(0),
            "this epoch already electric winner!"
        );
        uint sectionNumber = sectionRandomGenerate();
        setTimerM2(_epoch + 1, date);
        if (sectionNumber < 30) {
            uint winningNumber = winningNumberGenerate() + 200;
            PickWinner(winningNumber);
        } else if (sectionNumber >= 30 && sectionNumber < 45) {
            uint winningNumber = winningNumberGenerate() + 50;
            PickWinner(winningNumber);
        } else if (sectionNumber >= 45 && sectionNumber < 65) {
            uint winningNumber = winningNumberGenerate() + 100;
            PickWinner(winningNumber);
        } else if (sectionNumber >= 65 && sectionNumber < 90) {
            uint winningNumber = winningNumberGenerate() + 150;
            PickWinner(winningNumber);
        } else if (sectionNumber >= 90) {
            uint winningNumber = winningNumberGenerate();
            PickWinner(winningNumber);
        }
    }

    /**
    * @notice Calculation of winnings excluding fees
    * @param  epoch uint
    */

    function calculateWinnerFee(uint epoch) internal view returns (uint) {
        return (epochPrizeM2[epoch] * 95) / 100;
    }

    /**
    * @notice fee calculation
    * @param  epoch uint
    */

    function calculateOwnerFee(uint epoch) internal view returns (uint) {
        return (epochPrizeM2[epoch] * 5) / 100;
    }

    /**
    * @notice Claiming prize money per round
    * @param  epoch uint
    */

    function claimRewardM2(uint epoch) public payable {
        require(epochWinnerM2[epoch].winnerAddress != address(0), "No Winner");
        require(
            epochWinnerM2[epoch].winnerAddress == msg.sender,
            "Call must be Winner"
        );
        require(
            epochWinnerM2[epoch].isclaim[msg.sender] == 1,
            "already claim Reward"
        );

        epochWinnerM2[epoch].isclaim[msg.sender] = 2;
        (bool success, ) = epochWinnerM2[epoch].winnerAddress.call{
            value: calculateWinnerFee(epoch)
        }("");
        require(success, "Not send Klay1");
        (bool success2, ) = owner.call{value: calculateOwnerFee(epoch)}("");
        require(success2, "Not send Klay2");
    }

    /**
    * @notice Total prize money per round
    * @param  epoch uint
    */
   
    function totalAmountM2(uint epoch) public view returns (uint) {
        return epochPrizeM2[epoch];
    }

    /**
    * @notice Contract holding amount
    */

    function contractBalanceM2() public view returns (uint) {
        return address(this).balance;
    }

    /**
    * @notice Total number of tickets for each round
    * @param  epoch uint
    */

    function totalTicketM2(uint epoch) public view returns (uint) {
        return ticketAmountM2[epoch];
    }

    /**
    * @notice Search ticket number held by the address for each episode
    * @param  _to address
    * @param  epoch uint
    */

    function getMyTicketNumberM2(
        address _to,
        uint epoch
    ) public view returns (uint[] memory, uint[] memory) {
        return (
            userdataM2[_to][epoch].myTicket,
            userdataM2[_to][epoch].myTicketId
        );
    }

    /**
    * @notice Query the number of tickets held by the address for each round
    * @param  _to address
    * @param  epoch uint
    */

    function getMyTicketCountM2(
        address _to,
        uint epoch
    ) public view returns (uint) {
        return userdataM2[_to][epoch].amountTicket;
    }

    /**
    * @notice View winners by round
    * @param  epoch uint
    */

    function getWinnerM2(uint epoch) public view returns (address) {
        return epochWinnerM2[epoch].winnerAddress;
    }

    /**
    * @notice Whether to claim compensation for each round
    * @param  _to address
    * @param  epoch uint
    */

    function isClaimedRewardM2(
        address _to,
        uint epoch
    ) public view returns (uint) {
        return epochWinnerM2[epoch].isclaim[_to];
    }

    /**
    * @notice Winning ticket number for each round
    * @param  epoch uint
    */

    function getWinningNumberM2(uint epoch) public view returns (uint) {
        return winningNumberM2[epoch].winningNumberM2;
    }

    /**
    * @notice Search winning ticket id for each round
    * @param  epoch uint
    */

    function getWinningTicketIdM2(uint epoch) public view returns (uint) {
        return winningNumberM2[epoch].winningTikcetIdM2;
    }

    /**
    * @notice Tie ticket id in case of a tie
    * @param  epoch uint
    */

    function getTieBreakTicketM2(
        uint epoch
    ) public view returns (uint[] memory) {
        return tieBreakTicketM2[epoch];
    }

    function getDashBoardDataM2() public view returns (uint[] memory) {
        return dashBoardDataM2;
    }


    function setTimerM2(uint epoch, string memory date) public onlyOwner {
        timerDataBaseM2[epoch] = date;
    }

    function getTimerM2(uint epoch) public view returns (string memory) {
        return timerDataBaseM2[epoch];
    }
}

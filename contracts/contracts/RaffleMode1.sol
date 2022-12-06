// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.15;

import "hardhat/console.sol";

contract RaffleMode1 {
    address public owner;
    uint public ticketPriceM1 = 5;
    uint public _epoch = 1;
    uint public decimals = 10 ** 18;
    uint public ticketId = 1;

    struct userInfoM1 {
        uint applyCount;
        uint[] myTicket;
    }

    struct winnerInfoM1 {
        address winnerAddress;
        mapping(address => uint) isclaim;
    }

    mapping(address => mapping(uint => userInfoM1)) userdataM1;
    mapping(uint => winnerInfoM1) epochWinnerM1;
    mapping(uint => uint) epochPrizeM1;
    mapping(uint => uint) epochWinningTicketId;
    mapping(uint => string) timerDataBaseM1;

    address[] private winningTicketPoolM1;
    uint[] private dashBoardDataM1;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Can only Called owner");
        _;
    }

    /**
    * @notice Buy Mode 1 Tickets by Entering Quantity
    * @param  _amount uint
    */

    function buyTicketM1(uint _amount) public payable {
        require(_amount <= 20, "maximum amount 10");
        require(
            userdataM1[msg.sender][_epoch].applyCount <= 20,
            "already entered this system"
        );
        require(
            userdataM1[msg.sender][_epoch].applyCount + _amount <= 20,
            "maximum apply are 10"
        );
        require(
            epochWinnerM1[_epoch].winnerAddress == address(0),
            "already this epoch pick the winner"
        );
        require(
            _amount * ticketPriceM1 * decimals == msg.value,
            "correct paid"
        );

        for (uint i = 0; i < _amount; i++) {
            winningTicketPoolM1.push(msg.sender);
            userdataM1[msg.sender][_epoch].applyCount++;
            userdataM1[msg.sender][_epoch].myTicket.push(ticketId);
            ticketId++;
        }

        epochPrizeM1[_epoch] += _amount * ticketPriceM1 * decimals;
    }

    /**
    * @notice Randomly extract one ticket from the victory ticket pool
    */

    function randomGenerate() internal view returns (uint) {
        uint randomNumber = uint(
            keccak256(
                abi.encodePacked(
                    msg.sender,
                    blockhash(block.number - 1),
                    block.timestamp
                )
            )
        ) % winningTicketPoolM1.length;
        return randomNumber;
    }

    function setDashBoardDataM1() internal {
        dashBoardDataM1.push(_epoch);
        dashBoardDataM1.push(totalTicketM1(_epoch));
        dashBoardDataM1.push(totalAmountM1(_epoch) / decimals);
    }

    /**
    * @notice Extracting the winner of the current round
    * @param  date string
    */

    function winnerOfRaffleM1(string memory date) public onlyOwner {
        require(
            epochWinnerM1[_epoch].winnerAddress == address(0),
            "this epoch already electric winner!"
        );
        if (winningTicketPoolM1.length > 0) {
            uint randomNumber = randomGenerate();
            address winner = winningTicketPoolM1[randomNumber];
            epochWinnerM1[_epoch].winnerAddress = winner;
            epochWinnerM1[_epoch].isclaim[winner] = 1;
            epochWinningTicketId[_epoch] = randomNumber + 1;
            setDashBoardDataM1();
            ticketId = 1;
            delete winningTicketPoolM1;
            _epoch++;
            setTimerM1(_epoch, date);
        } else {
            epochWinnerM1[_epoch].winnerAddress = address(0);
            epochWinningTicketId[_epoch] = 0;
            setDashBoardDataM1();
            ticketId = 1;
            delete winningTicketPoolM1;
            _epoch++;
            setTimerM1(_epoch, date);
        }
    }

    /**
    * @notice Winning allowance excluding the relevant round fee
    * @param  epoch uint
    */

    function calculateWinnerFee(uint epoch) internal view returns (uint) {
        return (epochPrizeM1[epoch] * 95) / 100;
    }

    /**
    * @notice Corresponding session fee
    * @param  epoch uint
    */

    function calculateOwnerFee(uint epoch) internal view returns (uint) {
        return (epochPrizeM1[epoch] * 5) / 100;
    }

    /**
    * @notice Claiming prize money for the round
    * @param  epoch uint
    */

    function claimRewardM1(uint epoch) public payable {
        require(epochWinnerM1[epoch].winnerAddress != address(0), "No Winner");
        require(
            epochWinnerM1[epoch].winnerAddress == msg.sender,
            "Call must be Winner"
        );
        require(epochWinnerM1[epoch].isclaim[msg.sender] == 1, "already claim");

        epochWinnerM1[epoch].isclaim[msg.sender] = 2;
        (bool success, ) = epochWinnerM1[epoch].winnerAddress.call{
            value: calculateWinnerFee(epoch)
        }("");
        require(success, "Not send Klay1");
        (bool success2, ) = owner.call{value: calculateOwnerFee(epoch)}("");
        require(success2, "Not send Klay2");
    }

    /**
    * @notice Contract holding amount
    */

    function contractBalanceM1() public view returns (uint) {
        return address(this).balance;
    }

    /**
    * @notice Total prize money per round
    * @param  epoch uint
    */

    function totalAmountM1(uint epoch) public view returns (uint) {
        return epochPrizeM1[epoch];
    }

    /**
    * @notice Total number of tickets per show
    * @param  epoch uint
    */

    function totalTicketM1(uint epoch) public view returns (uint) {
        return epochPrizeM1[epoch] / (5 * decimals);
    }

    /**
    * @notice Probability of winning in each round
    * @param  _to address
    * @param  epoch uint
    */

    function getMyRatioM1(address _to, uint epoch) public view returns (uint) {
        return
            (100000 * userdataM1[_to][epoch].applyCount) / totalTicketM1(epoch);
    }

    /**
    * @notice Number of tickets held by the address per round
    * @param  _to address
    * @param  epoch uint
    */

    function getInvestAmountM1(
        address _to,
        uint epoch
    ) public view returns (uint) {
        return userdataM1[_to][epoch].applyCount;
    }

    /**
    * @notice Search ticket id held by the address for each round
    * @param  _to address
    * @param  epoch uint
    */

    function getMyTicketNumberM1(
        address _to,
        uint epoch
    ) public view returns (uint[] memory) {
        return userdataM1[_to][epoch].myTicket;
    }

    /**
    * @notice View winners by round
    * @param  epoch uint
    */

    function getWinnerM1(uint epoch) public view returns (address) {
        return epochWinnerM1[epoch].winnerAddress;
    }

    /**
    * @notice Search winning ticket ID for each round
    * @param  epoch uint
    */

    function getWinningTicketId(uint epoch) public view returns (uint) {
        return epochWinningTicketId[epoch];
    }

    function getDashBoardDataM1() public view returns (uint[] memory) {
        return dashBoardDataM1;
    }

    /**
    * @notice Whether or not to claim the winning prize for the corresponding round
    * @param  _to address
    * @param  epoch uint
    */

    function isClaimedRewardM1(
        address _to,
        uint epoch
    ) public view returns (uint) {
        return epochWinnerM1[epoch].isclaim[_to];
    }

    /**
    * @notice timer target time setting
    * @param  date string
    * @param  epoch uint
    */

    function setTimerM1(uint epoch, string memory date) public onlyOwner {
        timerDataBaseM1[epoch] = date;
    }

    /**
    * @notice timer target time view
    * @param  epoch uint
    */

    function getTimerM1(uint epoch) public view returns (string memory) {
        return timerDataBaseM1[epoch];
    }
}

//SPDX-License-Identifier : MIT
pragma solidity ^0.8.15;


import "hardhat/console.sol";

contract RaffleMode1 {

    bool private initialized;
    address public owner;
    uint public ticketPriceM1 = 5;
    uint public _epoch = 1;
    uint private decimals = 10 ** 18; 
    uint public ticketId = 1;

    
    
    struct userInfoM1 {
        uint applyCount;
        uint[] myTicket;
    }
    
    mapping(address => mapping(uint => userInfoM1)) public userdataM1;
    mapping(uint => address) public epochWinnerM1;
    mapping(uint => uint) public epochPrizeM1;
    mapping(uint => uint) public epochWinningTicketId;

    
    address[] private winningTicketPoolM1;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Can only Called owner");
        _;
    }

     // 티켓 구매
    function buyTicketM1(uint _amount) public payable {
        require(_amount <= 20, "maximum amount 10");
        require(msg.sender.balance >= msg.value, "Not Enough Ethers");
        require(userdataM1[msg.sender][_epoch].applyCount <= 20, "already entered this system");
        require(userdataM1[msg.sender][_epoch].applyCount + _amount <= 20, "maximum apply are 10");
        require(epochWinnerM1[_epoch] == address(0), "already this epoch pick the winner");
        require(_amount * ticketPriceM1 * decimals == msg.value, "correct paid");

        for(uint i = 0; i < _amount; i++) {
            winningTicketPoolM1.push(msg.sender);
            userdataM1[msg.sender][_epoch].applyCount++;
            userdataM1[msg.sender][_epoch].myTicket.push(ticketId);
            ticketId++;
        }

        epochPrizeM1[_epoch] += _amount * ticketPriceM1 * decimals;

    } 

    // 랜덤 생성
    function randomGenerate() internal view returns(uint) {
        uint randomNumber = uint(keccak256(abi.encodePacked(msg.sender, blockhash(block.number-1), block.timestamp))) % winningTicketPoolM1.length;
        return randomNumber;
    }

    // 이번 회차 승자 추출
    function winnerOfRaffleM1() public onlyOwner{
        require(epochWinnerM1[_epoch] == address(0), "this epoch already electric winner!");
        uint randomNumber = randomGenerate();
        address winner = winningTicketPoolM1[randomNumber];
        epochWinnerM1[_epoch] = winner; 
        epochWinningTicketId[_epoch] = randomNumber + 1;
        ticketId = 1;
        delete winningTicketPoolM1;
        _epoch++;
    }

    function calculateWinnerFee(uint epoch) internal view returns(uint) {
        return ( epochPrizeM1[epoch] * 95 ) / 100;
    }

    function calculateOwnerFee(uint epoch) internal view returns(uint) {
        return ( epochPrizeM1[epoch] * 5 ) / 100;
    }

    function claimRewardM1(uint epoch) public payable {
        require(epochWinnerM1[epoch] != address(0), "No Winner");
        require(epochWinnerM1[epoch] == msg.sender, "Call must be Winner");

        (bool success, ) = epochWinnerM1[epoch].call{value: calculateWinnerFee(epoch)}("");
        require(success, "Not send Klay1");
        (bool success2, ) = owner.call{value: calculateOwnerFee(epoch)}("");
        require(success2, "Not send Klay2");
    } 

    // 컨트랙트 보유 금액 
    function contractBalanceM1() public view returns(uint) {
        return address(this).balance;
    }

    // 역대 회차 쌓인 금액 조회
    function totalAmountM1(uint epoch) public view returns(uint) {
        return epochPrizeM1[epoch];
    }

    // 역대 회차 총 티켓수 조회 
    function totalTicketM1(uint epoch) public view returns(uint) {
        return epochPrizeM1[epoch] / (5 * decimals);
    }
    // 역대 내 당첨 확률 조회 
    function myRatioM1(address _to, uint epoch) public view returns(uint) {
        return 100000 *  userdataM1[_to][epoch].applyCount / totalTicketM1(epoch);  
    }
    
    
    // 역대 회차에 내가 보유한 티켓 갯수
    function getInvestAmountM1(address _to, uint epoch) public view returns(uint) {
        return userdataM1[_to][epoch].applyCount;
    }

    //  회차 입력시 내가 보유한 모든 티켓 번호 조회 
    function getMyTicketNumberM1(address _to, uint epoch) public view returns(uint[] memory) {
        return userdataM1[_to][epoch].myTicket;
    }

    // 역대 회차 승리자 조회
    function getWinnerM1(uint epoch) public view returns(address) {
        return epochWinnerM1[epoch];
    }
    
    // 역대 회차 당첨 티켓Id 조회 
    function getWinningTicketId(uint epoch) public view returns(uint) {
        return epochWinningTicketId[epoch];
    }
}
import { useEffect, useState } from "react";
// import Caver from "caver-js";
import { caver, raffleV1Contract, RAFFLEV1_CONTRACT_ADDRESS } from "./caverConfig";

function App() {

  const decimals = 10 ** 18;
  const [accounts, setAccount] = useState("");  
  const [totalAmounts, setTotalAmount] = useState(0);
  const [investAmount, setInvestAmount] = useState(0);
  const [inputvalue, setInpubValue] = useState(0);
  const [winner, setWinner] = useState("");
  const myratio = investAmount / totalAmounts * 100;

  const connectKaikas = async () => {
    try {
    const account = await window.klaytn.enable();
    setAccount(account[0]);
    } catch(error) {
      console.error(error);
    }
  };


  const applyToRaffle = async() => {
    const response = await caver.klay.sendTransaction({
      from:accounts,
      to: RAFFLEV1_CONTRACT_ADDRESS,
      value: caver.utils.convertToPeb(inputvalue, "KLAY"),
      gas: "3000000",
      data: raffleV1Contract.methods.applyToRaffle(inputvalue).encodeABI()
    })
  }
  
  const totalAmount = async() => {
     const result = await raffleV1Contract.methods.totalAmount().call();
     setTotalAmount(result / decimals);
  }

  const getRatio = async() => {
    const response = await raffleV1Contract.methods.getInvestAmount(accounts).call();
    setInvestAmount(response);
  }

  const winnerOfRaffle = async() => {
    const response = await caver.klay.sendTransaction({
      from:accounts,
      to: RAFFLEV1_CONTRACT_ADDRESS,
      gas: "3000000",
      data: raffleV1Contract.methods.winnerOfRaffle().encodeABI()
    })
  }

  const rewardTransfer = async() => {
    const response = await caver.klay.sendTransaction({
      from:accounts,
      to: RAFFLEV1_CONTRACT_ADDRESS,
      gas: "3000000",
      data: raffleV1Contract.methods.rewardTransfer().encodeABI()
    })
  }
  const getWinner = async() => {
    const res = await raffleV1Contract.methods.getWinner().call();
    setWinner(res);
  }


  console.log(winner)
  
  useEffect(() => {
    connectKaikas()
    totalAmount()
    getRatio()
    getWinner()
  },[accounts])
  return (
    <div>
      <button onClick={connectKaikas}>ConnectKaikas</button>
      <br />
      <p>연결된 주소 : {accounts}</p>
      <br />
      <p>현재 총 모금액 : {totalAmounts} KLAY</p>
    
      <p>내 당첨 확률 : {investAmount == 0 ? 0 : myratio} %</p>
      <br /> 
      <label>래플에 참여 하고 싶은 금액을 입력 해 주세요 (5KLAY 이하)</label>
      <br />
      <input type="number" onChange={(e) => {setInpubValue(e.target.value)}}/> <p>{inputvalue} KLAY</p>
      <br />
      <button onClick={applyToRaffle}>래플 참여</button>
      <br />
      <br /> 
      <button onClick={winnerOfRaffle}>우승자 추첨</button>
      <br /> 
      <p>우승자 : {winner}</p>
      <br /> 
      <button onClick={rewardTransfer}>우승 상금 전송</button>
    </div>
  );
}

export default App;

  // import { useEffect, useState } from "react";
// import Caver from "caver-js";
// import { caver, raffleV1Contract, RAFFLEV1_CONTRACT_ADDRESS } from "./caverConfig";
// import { useDispatch, useSelector } from 'react-redux';
// import { connectAccount } from './redux/actions/connectAccount' 
  
  
  // const dispatch = useDispatch();
  // const {accounts} = useSelector(state => state.account);
  // console.log(accounts)
  // const decimals = 10 ** 18;

  // const [totalAmounts, setTotalAmount] = useState(0);
  // const [investAmount, setInvestAmount] = useState(0);
  // const [inputvalue, setInpubValue] = useState(0);
  // const [winner, setWinner] = useState("");
  // const myratio = investAmount / totalAmounts * 100;
  // console.log(accounts);

  // const connectKaikas = async () => {
  //   try {
  //   const account = await window.klaytn.enable();
  //   setAccount(account[0]);
  //   } catch(error) {
  //     console.error(error);
  //   }
  // };
//   const connectWallet = () => {
//     if(window.klaytn)
//     dispatch(connectAccount.getAccount())
// }

  // const applyToRaffle = async() => {
  //   const response = await caver.klay.sendTransaction({
  //     from:accounts,
  //     to: RAFFLEV1_CONTRACT_ADDRESS,
  //     value: caver.utils.convertToPeb(inputvalue, "KLAY"),
  //     gas: "3000000",
  //     data: raffleV1Contract.methods.applyToRaffle(inputvalue).encodeABI()
  //   })
  // }
  
  // const totalAmount = async() => {
  //    const result = await raffleV1Contract.methods.totalAmount().call();
  //    setTotalAmount(result / decimals);
  // }

  // const getRatio = async() => {
  //   const response = await raffleV1Contract.methods.getInvestAmount(accounts).call();
  //   setInvestAmount(response);
  // }

  // const winnerOfRaffle = async() => {
  //   const response = await caver.klay.sendTransaction({
  //     from:accounts,
  //     to: RAFFLEV1_CONTRACT_ADDRESS,
  //     gas: "3000000",
  //     data: raffleV1Contract.methods.winnerOfRaffle().encodeABI()
  //   })
  // }

  // const rewardTransfer = async() => {
  //   const response = await caver.klay.sendTransaction({
  //     from:accounts,
  //     to: RAFFLEV1_CONTRACT_ADDRESS,
  //     gas: "3000000",
  //     data: raffleV1Contract.methods.rewardTransfer().encodeABI()
  //   })
  // }
  // const getWinner = async() => {
  //   const res = await raffleV1Contract.methods.getWinner().call();
  //   setWinner(res);
  // }



  
  // useEffect(() => {
    // totalAmount()
    // getRatio()
    // getWinner()
    // dispatch(connectAccount.getAccount())
  // },[])
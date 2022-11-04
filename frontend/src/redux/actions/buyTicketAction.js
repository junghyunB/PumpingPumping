import { raffleV1Contract, RAFFLEV1_CONTRACT_ADDRESS, caver} from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function buyTicketAct(amount) {

  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);
  const decimal = 10 ** 18;
  return async (dispatch) => {
    if(localKey === "kaikasAccount") {
    try {
      const response = await caver.klay.sendTransaction({
        from: account,
        to: RAFFLEV1_CONTRACT_ADDRESS,
        value: caver.utils.convertToPeb(5 * amount, "KLAY"),
        gas: "3000000",
        data: raffleV1Contract.methods.buyTicketM1(amount).encodeABI(),
      });
    dispatch({type:"SUCCESS_BUY_TICKET", payload : {buyTicketSuccess : true}});
    if(response.status) {
      alert("구매 성공")
    }
    } catch (error) {
      console.error(error);
    }
  } else if(localKey === "metamaskAccount") {
    try{
    const response = await web3RaffleV1Contract.methods.buyTicketM1(amount).send({ 
      from : account,
      to :  RAFFLEV1_CONTRACT_ADDRESS,
      value: String(amount * 5 * decimal),
      gas : "3000000"
    });
    dispatch({type:"SUCCESS_BUY_TICKET", payload : {buyTicketSuccess : true}});
    if(response.status) {
      alert("구매 성공");
    }
  } catch(error) {
    console.error(error);
  }
  }  
} 
}


export const buyTicketAction = { buyTicketAct };

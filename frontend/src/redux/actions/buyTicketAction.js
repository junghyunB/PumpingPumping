import { raffleV1Contract, RAFFLEV1_CONTRACT_ADDRESS, caver} from "../../caverConfig";


function buyTicketAct(account, amount) {
  console.log(caver.utils.convertToPeb(5 * amount, "KLAY"))
  return async (dispatch) => {
    try {
      const response = await caver.klay.sendTransaction({
        from: account,
        to: RAFFLEV1_CONTRACT_ADDRESS,
        value: caver.utils.convertToPeb(5 * amount, "KLAY"),
        gas: "3000000",
        data: raffleV1Contract.methods.buyTicketM1(amount).encodeABI(),
      });
      console.log(1);
    dispatch({type:"SUCCESS_BUY_TICKET", payload : {buyTicketSuccess : true}});
    } catch (error) {
      console.error(error);
    }
  };
}


export const buyTicketAction = { buyTicketAct };

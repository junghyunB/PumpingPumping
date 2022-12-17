import {
  raffleV1Contract,
  RAFFLEV1_CONTRACT_ADDRESS,
  caver,
} from "../../caverConfig";
import { web3RaffleV1Contract, web3 } from "../../web3Config";

function buyTicketAct(amount) {
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);
  return async (dispatch) => {
    if (localKey === "kaikasAccount") {
      try {
        const response = await caver.klay.sendTransaction({
          from: account,
          to: RAFFLEV1_CONTRACT_ADDRESS,
          value: caver.utils.convertToPeb(5 * amount, "KLAY"),
          gas: "2000000",
          data: raffleV1Contract.methods.buyTicketM1(amount).encodeABI(),
        });
        dispatch({
          type: "SUCCESS_BUY_TICKET",
          payload: { buyTicketSuccess: true },
        });
        if (response.status) {
          alert("purchase success");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    } else if (localKey === "metamaskAccount") {
      try {
        const response = await web3RaffleV1Contract.methods
          .buyTicketM1(amount)
          .send({
            from: account,
            to: RAFFLEV1_CONTRACT_ADDRESS,
            value: web3.utils.toWei(`${5 * amount}`, "ether"),
            gas: "2000000",
          });
        dispatch({
          type: "SUCCESS_BUY_TICKET",
          payload: { buyTicketSuccess: true },
        });
        if (response.status) {
          alert("purchase success");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
}

export const buyTicketAction = { buyTicketAct };

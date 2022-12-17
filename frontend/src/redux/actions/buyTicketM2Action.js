import {
  raffleV2Contract,
  RAFFLEV2_CONTRACT_ADDRESS,
  caver,
} from "../../caverConfig";
import { web3RaffleV2Contract, web3 } from "../../web3Config";
import Swal from 'sweetalert2';


function buyTicketM2Act(amount, id, transTicket) {
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);
  return async (dispatch) => {
    if (localKey === "kaikasAccount") {
      try {
        const response = await caver.klay.sendTransaction({
          from: account,
          to: RAFFLEV2_CONTRACT_ADDRESS,
          value: caver.utils.convertToPeb(amount, "KLAY"),
          gas: "2000000",
          data: raffleV2Contract.methods
            .buyTicketM2(id, transTicket)
            .encodeABI(),
        });
        dispatch({
          type: "SUCCESS_BUY_TICKETM2",
          payload: { buyTicketM2Success: true },
        });
        if (response.status) {
          Swal.fire({
            title: `Purchase Success!`,
            icon:"success",
            confirmButtonText: "OK",
          }).then(function() {
            window.location.reload();
          })  
        }
      } catch (error) {
        console.error(error);
      }
    } else if (localKey === "metamaskAccount") {
      try {
        const response = await web3RaffleV2Contract.methods
          .buyTicketM2(id, transTicket)
          .send({
            from: account,
            to: RAFFLEV2_CONTRACT_ADDRESS,
            value: web3.utils.toWei(`${amount}`, "ether"),
            gas: "2000000",
          });
        dispatch({
          type: "SUCCESS_BUY_TICKETM2",
          payload: { buyTicketM2Success: true },
        });
        if (response.status) {
          Swal.fire({
            title: `Purchase Success!`,
            icon:"success",
            confirmButtonText: "OK",
          }).then(function() {
            window.location.reload();
          })
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
}

export const buyTicketM2Action = { buyTicketM2Act };

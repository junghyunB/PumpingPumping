import { raffleV2Contract } from "../../caverConfig";
import { web3RaffleV2Contract } from "../../web3Config";

function totalTicketM2Act(epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const response = await raffleV2Contract.methods
          .totalTicketM2(epoch)
          .call();
        dispatch({
          type: "GET_TOTAL_TICKET_AMOUNTM2",
          payload: {
            totalTicketAmountM2: response,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const response = await web3RaffleV2Contract.methods
          .totalTicketM2(epoch)
          .call();
        dispatch({
          type: "GET_TOTAL_TICKET_AMOUNTM2",
          payload: {
            totalTicketAmountM2: response,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const totalTicketM2Action = { totalTicketM2Act };

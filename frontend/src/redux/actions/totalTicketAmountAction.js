import { raffleV1Contract } from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function totalTicketAmountAct(epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const response = await raffleV1Contract.methods
          .totalTicketM1(epoch)
          .call();
        dispatch({
          type: "GET_TOTAL_TICKET_AMOUNT",
          payload: {
            totalTicketAmount: response,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const response = await web3RaffleV1Contract.methods
          .totalTicketM1(epoch)
          .call();
        dispatch({
          type: "GET_TOTAL_TICKET_AMOUNT",
          payload: {
            totalTicketAmount: response,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const totalTicketAmountAction = { totalTicketAmountAct };

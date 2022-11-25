import { raffleV1Contract } from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function winningTicketAct(epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const response = await raffleV1Contract.methods
          .getWinningTicketId(epoch)
          .call();
        dispatch({
          type: "GET_WINNING_TICKET",
          payload: {
            winningTicketId: response,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const response = await web3RaffleV1Contract.methods
          .getWinningTicketId(epoch)
          .call();
        dispatch({
          type: "GET_WINNING_TICKET",
          payload: {
            winningTicketId: response,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const winningTicketAction = { winningTicketAct };

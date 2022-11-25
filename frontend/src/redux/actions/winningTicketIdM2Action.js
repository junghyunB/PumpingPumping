import { raffleV2Contract } from "../../caverConfig";
import { web3RaffleV2Contract } from "../../web3Config";

function winningTicketIdM2Act(epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const response = await raffleV2Contract.methods
          .getWinningTicketIdM2(epoch)
          .call();
        dispatch({
          type: "GET_WINNING_TICKETIDM2",
          payload: {
            winningTicketIdM2: response,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const response = await web3RaffleV2Contract.methods
          .getWinningTicketIdM2(epoch)
          .call();
        dispatch({
          type: "GET_WINNING_TICKETIDM2",
          payload: {
            winningTicketIdM2: response,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const winningTicketIdM2Action = { winningTicketIdM2Act };

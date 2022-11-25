import { raffleV2Contract } from "../../caverConfig";
import { web3RaffleV2Contract } from "../../web3Config";

function tieTicketM2Act(epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const response = await raffleV2Contract.methods
          .getTieBreakTicketM2(epoch)
          .call();
        dispatch({
          type: "GET_TIE_TICKETM2",
          payload: {
            tieTicketM2: response,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const response = await web3RaffleV2Contract.methods
          .getTieBreakTicketM2(epoch)
          .call();
        dispatch({
          type: "GET_TIE_TICKETM2",
          payload: {
            tieTicketM2: response,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const tieTicketM2Action = { tieTicketM2Act };

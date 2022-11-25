import { raffleV1Contract } from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function userM1TicketNumAct(account, epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const response = await raffleV1Contract.methods
          .getMyTicketNumberM1(account, epoch)
          .call();
        dispatch({
          type: "GET_M1TICKET_NUMLIST",
          payload: {
            userM1TicketNumList: response,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const response = await web3RaffleV1Contract.methods
          .getMyTicketNumberM1(account, epoch)
          .call();
        dispatch({
          type: "GET_M1TICKET_NUMLIST",
          payload: {
            userM1TicketNumList: response,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const userM1TicketNumAction = { userM1TicketNumAct };

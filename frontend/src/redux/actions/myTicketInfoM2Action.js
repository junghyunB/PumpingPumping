import { raffleV2Contract } from "../../caverConfig";
import { web3RaffleV2Contract } from "../../web3Config";
function myTicketInfoM2Act(account, epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const myTicketInfoM2 = await raffleV2Contract.methods
          .getMyTicketNumberM2(account, epoch)
          .call();
        dispatch({
          type: "GET_MY_TICKET_INFOM2",
          payload: {
            myTicketInfoM2: myTicketInfoM2,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const myTicketInfoM2 = await web3RaffleV2Contract.methods
          .getMyTicketNumberM2(account, epoch)
          .call();
        dispatch({
          type: "GET_MY_TICKET_INFOM2",
          payload: {
            myTicketInfoM2: myTicketInfoM2,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const myTicketInfoM2Action = { myTicketInfoM2Act };

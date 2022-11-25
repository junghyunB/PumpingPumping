import { raffleV1Contract } from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function myTicketCountAct(account, epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const myTicketAmount = await raffleV1Contract.methods
          .getInvestAmountM1(account, epoch)
          .call();
        dispatch({
          type: "GET_MY_TICKET_AMOUNT",
          payload: {
            myTicketAmount: myTicketAmount,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const myTicketAmount = await web3RaffleV1Contract.methods
          .getInvestAmountM1(account, epoch)
          .call();
        dispatch({
          type: "GET_MY_TICKET_AMOUNT",
          payload: {
            myTicketAmount: myTicketAmount,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const myTicketCountAction = { myTicketCountAct };

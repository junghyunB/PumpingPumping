import { raffleV1Contract } from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function timerDateM1Act(epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const response = await raffleV1Contract.methods
          .getTimerM1(epoch)
          .call();
        dispatch({
          type: "GET_TIMERM1",
          payload: {
            timerM1: response,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const response = await web3RaffleV1Contract.methods
          .getTimerM1(epoch)
          .call();
        dispatch({
          type: "GET_TIMERM1",
          payload: {
            timerM1: response,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const timerDateM1Action = { timerDateM1Act };

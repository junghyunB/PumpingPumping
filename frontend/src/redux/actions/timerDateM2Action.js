import { raffleV2Contract } from "../../caverConfig";
import { web3RaffleV2Contract } from "../../web3Config";

function timerDateM2Act(epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const response = await raffleV2Contract.methods
          .getTimerM2(epoch)
          .call();
        dispatch({
          type: "GET_TIMERM2",
          payload: {
            timerM2: response,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const response = await web3RaffleV2Contract.methods
          .getTimerM2(epoch)
          .call();
        dispatch({
          type: "GET_TIMERM2",
          payload: {
            timerM2: response,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const timerDateM2Action = { timerDateM2Act };

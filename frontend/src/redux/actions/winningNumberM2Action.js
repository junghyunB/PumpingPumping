import { raffleV2Contract } from "../../caverConfig";
import { web3RaffleV2Contract } from "../../web3Config";

function winningNumberM2Act(epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const response = await raffleV2Contract.methods
          .getWinningNumberM2(epoch)
          .call();
        dispatch({
          type: "GET_WINNING_NUMBERM2",
          payload: {
            winningNumberM2: response,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const response = await web3RaffleV2Contract.methods
          .getWinningNumberM2(epoch)
          .call();
        dispatch({
          type: "GET_WINNING_NUMBERM2",
          payload: {
            winningNumberM2: response,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const winningNumberM2Action = { winningNumberM2Act };

import { raffleV1Contract } from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function epochWinnerAct(epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const epochWinner = await raffleV1Contract.methods
          .getWinnerM1(epoch)
          .call();
        dispatch({
          type: "GET_EPOCH_WINNER",
          payload: {
            epochWinner: epochWinner,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const epochWinner = await web3RaffleV1Contract.methods
          .getWinnerM1(epoch)
          .call();
        dispatch({
          type: "GET_EPOCH_WINNER",
          payload: {
            epochWinner: epochWinner,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const epochWinnerAction = { epochWinnerAct };

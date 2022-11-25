import { raffleV1Contract } from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function myRatioAct(account, epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        let response = await raffleV1Contract.methods
          .getMyRatioM1(account, epoch)
          .call();
        response = response / 1000;
        dispatch({
          type: "GET_MY_RATIO",
          payload: {
            myRatio: response,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        let response = await web3RaffleV1Contract.methods
          .getMyRatioM1(account, epoch)
          .call();
        response = response / 1000;
        dispatch({
          type: "GET_MY_RATIO",
          payload: {
            myRatio: response,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const myRatioAction = { myRatioAct };

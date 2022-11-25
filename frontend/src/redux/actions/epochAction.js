import { raffleV1Contract } from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function epochAct() {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const epoch = await raffleV1Contract.methods._epoch().call();
        dispatch({
          type: "GET_CURRENT_EPOCH",
          payload: {
            epoch: epoch,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const epoch = await web3RaffleV1Contract.methods._epoch().call();
        dispatch({
          type: "GET_CURRENT_EPOCH",
          payload: {
            epoch: epoch,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const epochAction = { epochAct };

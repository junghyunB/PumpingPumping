import { raffleV2Contract } from "../../caverConfig";
import { web3RaffleV2Contract } from "../../web3Config";

function epochM2Act() {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const epochM2 = await raffleV2Contract.methods._epoch().call();
        dispatch({
          type: "GET_CURRENT_M2EPOCH",
          payload: {
            epochM2: epochM2,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const epochM2 = await web3RaffleV2Contract.methods._epoch().call();
        dispatch({
          type: "GET_CURRENT_M2EPOCH",
          payload: {
            epochM2: epochM2,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const epochM2Action = { epochM2Act };

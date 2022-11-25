import { raffleV2Contract } from "../../caverConfig";
import { web3RaffleV2Contract } from "../../web3Config";

function totalAmountM2Act(epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const response = await raffleV2Contract.methods
          .totalAmountM2(epoch)
          .call();
        const totalAmountM2 = response / 10 ** 18;
        dispatch({
          type: "GET_TOTAL_AMOUNTM2",
          payload: {
            totalAmountM2: totalAmountM2,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const response = await web3RaffleV2Contract.methods
          .totalAmountM2(epoch)
          .call();
        const totalAmountM2 = response / 10 ** 18;
        dispatch({
          type: "GET_TOTAL_AMOUNTM2",
          payload: {
            totalAmountM2: totalAmountM2,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const totalAmountM2Action = { totalAmountM2Act };

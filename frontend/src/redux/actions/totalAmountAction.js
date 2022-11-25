import { raffleV1Contract } from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function totalAmountAct(epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const response = await raffleV1Contract.methods
          .totalAmountM1(epoch)
          .call();
        const totalAmount = response / 10 ** 18;
        dispatch({
          type: "GET_TOTALAMOUNT",
          payload: {
            totalAmount: totalAmount,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const response = await web3RaffleV1Contract.methods
          .totalAmountM1(epoch)
          .call();
        const totalAmount = response / 10 ** 18;
        dispatch({
          type: "GET_TOTALAMOUNT",
          payload: {
            totalAmount: totalAmount,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const totalAmountAction = { totalAmountAct };

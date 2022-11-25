import { raffleV2Contract } from "../../caverConfig";
import { web3RaffleV2Contract } from "../../web3Config";

function dashBoardM2Act() {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const response = await raffleV2Contract.methods
          .getDashBoardDataM2()
          .call();
        dispatch({
          type: "GET_DASHBOARDM2_DATA",
          payload: {
            dashBoardDataM2: response,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const response = await web3RaffleV2Contract.methods
          .getDashBoardDataM2()
          .call();
        dispatch({
          type: "GET_DASHBOARDM2_DATA",
          payload: {
            dashBoardDataM2: response,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const dashBoardM2Action = { dashBoardM2Act };

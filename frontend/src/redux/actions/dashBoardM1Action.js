import { raffleV1Contract } from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function dashBoardM1Act() {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const dashboardM1 = await raffleV1Contract.methods
          .getDashBoardDataM1()
          .call();
        dispatch({
          type: "GET_DASHBOARD_M1",
          payload: {
            dashboardM1: dashboardM1,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const dashboardM1 = await web3RaffleV1Contract.methods
          .getDashBoardDataM1()
          .call();
        dispatch({
          type: "GET_DASHBOARD_M1",
          payload: {
            dashboardM1: dashboardM1,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const dashBoardM1Action = { dashBoardM1Act };

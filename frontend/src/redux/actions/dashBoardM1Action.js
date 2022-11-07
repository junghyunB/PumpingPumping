import {raffleV1Contract} from "../../caverConfig";

function dashBoardM1Act() {
    return async (dispatch) => {
        try {
              const dashboardM1 = await raffleV1Contract.methods.getDashBoardDataM1().call();
              dispatch({type: "GET_DASHBOARD_M1",
                payload : {
                    dashboardM1 : dashboardM1,
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const dashBoardM1Action = {dashBoardM1Act}
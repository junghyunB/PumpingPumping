import {raffleV2Contract} from "../../caverConfig";

function dashBoardM2Act() {
    return async (dispatch) => {
        try {
              const response = await raffleV2Contract.methods.getDashBoardDataM2().call();
              dispatch({type: "GET_DASHBOARDM2_DATA",
                payload : {
                    dashBoardDataM2 : response
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const dashBoardM2Action = {dashBoardM2Act}
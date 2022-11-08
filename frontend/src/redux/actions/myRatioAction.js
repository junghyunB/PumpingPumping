import {raffleV1Contract} from "../../caverConfig";

function myRatioAct(account, epoch) {
    return async (dispatch) => {
        try {
              let response = await raffleV1Contract.methods.getMyRatioM1(account, epoch).call();
              response = response / 1000;
              dispatch({type: "GET_MY_RATIO", 
                payload : {
                    myRatio : response
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const myRatioAction = {myRatioAct}
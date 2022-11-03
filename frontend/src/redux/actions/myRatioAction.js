import {raffleV1Contract} from "../../caverConfig";


function myRatioAct(account) {
    return async (dispatch) => {
        try {
              const epoch = await raffleV1Contract.methods._epoch().call();
              let response = await raffleV1Contract.methods.myRatioM1(account, epoch).call();
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
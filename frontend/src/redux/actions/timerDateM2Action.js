import {raffleV2Contract} from "../../caverConfig";

function timerDateM2Act(epoch) {

    return async (dispatch) => {
        try {
              const response = await raffleV2Contract.methods.getTimerM2(epoch).call();
              dispatch({type: "GET_TIMERM2", 
                payload : {
                    timerM2 : response
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const timerDateM2Action = {timerDateM2Act}
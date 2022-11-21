import {raffleV1Contract} from "../../caverConfig";

function timerDateM1Act(epoch) {
    return async (dispatch) => {
        try {
              const response = await raffleV1Contract.methods.getTimerM1(epoch).call();
              dispatch({type: "GET_TIMERM1", 
                payload : {
                    timerM1: response
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const timerDateM1Action = {timerDateM1Act}
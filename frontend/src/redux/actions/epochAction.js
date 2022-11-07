import {raffleV1Contract} from "../../caverConfig";

function epochAct() {
    return async (dispatch) => {
        try {
              const epoch = await raffleV1Contract.methods._epoch().call();
              dispatch({type: "GET_CURRENT_EPOCH",
                payload : {
                    epoch : epoch
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const epochAction = {epochAct}
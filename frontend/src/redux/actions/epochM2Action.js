import {raffleV2Contract} from "../../caverConfig";

function epochM2Act() {
    return async (dispatch) => {
        try {
              const epochM2 = await raffleV2Contract.methods._epoch().call();
              dispatch({type: "GET_CURRENT_M2EPOCH",
                payload : {
                    epochM2 : epochM2
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const epochM2Action = {epochM2Act}
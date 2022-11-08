import {raffleV1Contract} from "../../caverConfig";

function epochWinnerAct(epoch) {
    return async (dispatch) => {
        try {
              const epochWinner = await raffleV1Contract.methods.getWinnerM1(epoch).call();
              dispatch({type: "GET_EPOCH_WINNER",
                payload : {
                    epochWinner : epochWinner
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const epochWinnerAction = {epochWinnerAct}
import {raffleV2Contract} from "../../caverConfig";

function winningNumberM2Act(epoch) {

    return async (dispatch) => {
        try {
              const response = await raffleV2Contract.methods.getWinningNumberM2(epoch).call();
              dispatch({type: "GET_WINNING_NUMBERM2", 
                payload : {
                    winningNumberM2 : response
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const winningNumberM2Action = {winningNumberM2Act}
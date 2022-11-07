import {raffleV1Contract} from "../../caverConfig";

function winningTicketAct(epoch) {

    return async (dispatch) => {
        try {
              const response = await raffleV1Contract.methods.getWinningTicketId(epoch).call();
              dispatch({type: "GET_WINNING_TICKET", 
                payload : {
                    winningTicketId: response
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const winningTicketAction = {winningTicketAct}
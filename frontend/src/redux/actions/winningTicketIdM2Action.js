import {raffleV2Contract} from "../../caverConfig";

function winningTicketIdM2Act(epoch) {

    return async (dispatch) => {
        try {
              const response = await raffleV2Contract.methods.getWinningTicketIdM2(epoch).call();
              dispatch({type: "GET_WINNING_TICKETIDM2", 
                payload : {
                    winningTicketIdM2 : response
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const winningTicketIdM2Action = {winningTicketIdM2Act}
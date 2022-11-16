import {raffleV2Contract} from "../../caverConfig";

function tieTicketM2Act(epoch) {

    return async (dispatch) => {
        try {
              const response = await raffleV2Contract.methods.getTieBreakTicketM2(epoch).call();
              dispatch({type: "GET_TIE_TICKETM2", 
                payload : {
                    tieTicketM2 : response
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const tieTicketM2Action = {tieTicketM2Act}
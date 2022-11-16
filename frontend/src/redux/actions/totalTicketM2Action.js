import {raffleV2Contract} from "../../caverConfig";

function totalTicketM2Act(epoch) {

    return async (dispatch) => {
        try {
              const response = await raffleV2Contract.methods.totalTicketM2(epoch).call();
              dispatch({type: "GET_TOTAL_TICKET_AMOUNTM2", 
                payload : {
                    totalTicketAmountM2 : response
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const totalTicketM2Action = {totalTicketM2Act}
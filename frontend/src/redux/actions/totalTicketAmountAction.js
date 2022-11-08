import {raffleV1Contract} from "../../caverConfig";

function totalTicketAmountAct(epoch) {

    return async (dispatch) => {
        try {
              const response = await raffleV1Contract.methods.totalTicketM1(epoch).call();
              dispatch({type: "GET_TOTAL_TICKET_AMOUNT", 
                payload : {
                    totalTicketAmount: response
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const totalTicketAmountAction = {totalTicketAmountAct}
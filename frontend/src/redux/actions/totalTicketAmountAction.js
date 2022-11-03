import {raffleV1Contract} from "../../caverConfig";

function totalTicketAmountAct() {

    return async (dispatch) => {
        try {
              const response = await raffleV1Contract.methods.totalTicketM1(1).call();
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
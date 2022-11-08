import {raffleV1Contract} from "../../caverConfig";

function userM1TicketNumAct(account, epoch) {

    return async (dispatch) => {
        try {
              const response = await raffleV1Contract.methods.getMyTicketNumberM1(account, epoch).call();
              dispatch({type: "GET_M1TICKET_NUMLIST", 
                payload : {
                    userM1TicketNumList: response
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const userM1TicketNumAction = {userM1TicketNumAct}
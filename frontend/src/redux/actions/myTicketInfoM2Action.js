import {raffleV2Contract} from "../../caverConfig";

function myTicketInfoM2Act(account, epoch) {
    return async (dispatch) => {
        try {
              const myTicketInfoM2 = await raffleV2Contract.methods.getMyTicketNumberM2(account, epoch).call();
              dispatch({type: "GET_MY_TICKET_INFOM2",
                payload : {
                    myTicketInfoM2 : myTicketInfoM2
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const myTicketInfoM2Action = {myTicketInfoM2Act}
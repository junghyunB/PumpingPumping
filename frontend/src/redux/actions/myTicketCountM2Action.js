import {raffleV2Contract} from "../../caverConfig";

function myTicketCountM2Act(account, epoch) {
    return async (dispatch) => {
        try {
              const myTicketCountM2 = await raffleV2Contract.methods.getMyTicketCountM2(account, epoch).call();
              dispatch({type: "GET_MY_TICKET_COUNTM2",
                payload : {
                    myTicketCountM2 : myTicketCountM2
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const myTicketCountM2Action = {myTicketCountM2Act}
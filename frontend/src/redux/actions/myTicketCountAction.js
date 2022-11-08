import {raffleV1Contract} from "../../caverConfig";

function myTicketCountAct(account, epoch) {
    return async (dispatch) => {
        try {
              const myTicketAmount = await raffleV1Contract.methods.getInvestAmountM1(account, epoch).call();
              dispatch({type: "GET_MY_TICKET_AMOUNT",
                payload : {
                    myTicketAmount : myTicketAmount
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const myTicketCountAction = {myTicketCountAct}
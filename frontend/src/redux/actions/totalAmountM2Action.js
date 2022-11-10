import {raffleV2Contract} from "../../caverConfig";

function totalAmountM2Act(epoch) {

    return async (dispatch) => {
        try {
              const response = await raffleV2Contract.methods.totalAmountM2(epoch).call();
              const totalAmountM2 = response / 10 ** 18;
              dispatch({type: "GET_TOTAL_AMOUNTM2", 
                payload : {
                    totalAmountM2 : totalAmountM2
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const totalAmountM2Action = {totalAmountM2Act}
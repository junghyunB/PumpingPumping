import {raffleV1Contract} from "../../caverConfig";

function totalAmountAct() {

    return async (dispatch) => {
        try {
              const response = await raffleV1Contract.methods.totalAmount().call();
              const totalAmount = response / 10 ** 18;
              dispatch({type: "GET_TOTALAMOUNT", 
                payload : {
                    totalAmount: totalAmount
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const totalAmountAction = {totalAmountAct}
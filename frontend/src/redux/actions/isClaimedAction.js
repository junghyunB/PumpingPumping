import {raffleV1Contract} from "../../caverConfig";

function isClaimedAct(account, epoch) {
    return async (dispatch) => {
        try {
              const isclaimM1 = await raffleV1Contract.methods.isClaimedRewardM1(account, epoch).call();
              dispatch({type: "GET_ISCLAIM_REWARD",
                payload : {
                  isclaimM1 : isclaimM1
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const isClaimedAction = {isClaimedAct}
import {raffleV2Contract} from "../../caverConfig";

function isClaimedM2Act(account, epoch) {
    return async (dispatch) => {
        try {
              const isClaimedM2 = await raffleV2Contract.methods.isClaimedRewardM2(account, epoch).call();
              dispatch({type: "GET_ISCLAIM_M2",
                payload : {
                    isClaimedM2 : isClaimedM2
                  }})
          } catch (error){
            console.error(error);
          }
    }
}

export const isClaimedM2Action = {isClaimedM2Act}
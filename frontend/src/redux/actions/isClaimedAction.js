import { raffleV1Contract } from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function isClaimedAct(account, epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const isclaimM1 = await raffleV1Contract.methods
          .isClaimedRewardM1(account, epoch)
          .call();
        dispatch({
          type: "GET_ISCLAIM_REWARD",
          payload: {
            isclaimM1: isclaimM1,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const isclaimM1 = await web3RaffleV1Contract.methods
          .isClaimedRewardM1(account, epoch)
          .call();
        dispatch({
          type: "GET_ISCLAIM_REWARD",
          payload: {
            isclaimM1: isclaimM1,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const isClaimedAction = { isClaimedAct };

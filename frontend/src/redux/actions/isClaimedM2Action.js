import { raffleV2Contract } from "../../caverConfig";
import { web3RaffleV2Contract } from "../../web3Config";

function isClaimedM2Act(account, epoch) {
  return async (dispatch) => {
    try {
      if (
        (window.klaytn !== undefined && window.ethereum === undefined) ||
        (window.klaytn !== undefined && window.ethereum !== undefined)
      ) {
        const isClaimedM2 = await raffleV2Contract.methods
          .isClaimedRewardM2(account, epoch)
          .call();
        dispatch({
          type: "GET_ISCLAIM_M2",
          payload: {
            isClaimedM2: isClaimedM2,
          },
        });
      } else if (window.klaytn === undefined && window.ethereum !== undefined) {
        const isClaimedM2 = await web3RaffleV2Contract.methods
          .isClaimedRewardM2(account, epoch)
          .call();
        dispatch({
          type: "GET_ISCLAIM_M2",
          payload: {
            isClaimedM2: isClaimedM2,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const isClaimedM2Action = { isClaimedM2Act };

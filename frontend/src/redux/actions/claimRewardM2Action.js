import {
  raffleV2Contract,
  RAFFLEV2_CONTRACT_ADDRESS,
  caver,
} from "../../caverConfig";
import { web3RaffleV2Contract } from "../../web3Config";

function claimRewardM2Act(epoch) {
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);

  return async (dispatch) => {
    if (localKey === "kaikasAccount") {
      try {
        const response = await caver.klay.sendTransaction({
          from: account,
          to: RAFFLEV2_CONTRACT_ADDRESS,
          gas: "3000000",
          data: raffleV2Contract.methods.claimRewardM2(epoch).encodeABI(),
        });
        dispatch({
          type: "CLAIM_REWARD_M2",
          payload: { claimM2Success: true },
        });
        if (response.status) {
          alert("Success Claim Reward");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    } else if (localKey === "metamaskAccount") {
      try {
        const response = await web3RaffleV2Contract.methods
          .claimRewardM2(epoch)
          .send({
            from: account,
            to: RAFFLEV2_CONTRACT_ADDRESS,
            gas: "3000000",
          });
        dispatch({
          type: "CLAIM_REWARD_M2",
          payload: { claimM2Success: true },
        });
        if (response.status) {
          alert("Success Claim Reward");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
}

export const claimRewardM2Action = { claimRewardM2Act };

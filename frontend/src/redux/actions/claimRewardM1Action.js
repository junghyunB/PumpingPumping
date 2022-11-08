import { raffleV1Contract, RAFFLEV1_CONTRACT_ADDRESS, caver} from "../../caverConfig";
import { web3RaffleV1Contract } from "../../web3Config";

function claimRewardM1Act(epoch) {
   
    const localKey = localStorage.key(0);
    const account = localStorage.getItem(localKey);

  return async (dispatch) => {
    if(localKey === "kaikasAccount") {
    try {
      const response = await caver.klay.sendTransaction({
        from: account,
        to: RAFFLEV1_CONTRACT_ADDRESS,
        gas: "3000000",
        data: raffleV1Contract.methods.claimRewardM1(epoch).encodeABI(),
      });
    dispatch({type:"CLAIM_REWARD_M1", payload : {claimSuccess : true}});
    if(response.status) {
      alert("Success Claim Reward")
    }
    } catch (error) {
      console.error(error);
    }
  } else if(localKey === "metamaskAccount") {
    try{
    const response = await web3RaffleV1Contract.methods.claimRewardM1(epoch).send({ 
      from : account,
      to :  RAFFLEV1_CONTRACT_ADDRESS,
      gas : "3000000"
    });
    dispatch({type:"CLAIM_REWARD_M1", payload : {claimSuccess : true}});
    if(response.status) {
      alert("Success Claim Reward");
    }
  } catch(error) {
    console.error(error);
  }
  }  
} 
}


export const claimRewardM1Action = { claimRewardM1Act };

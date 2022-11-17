import { raffleV2Contract, RAFFLEV2_CONTRACT_ADDRESS, caver} from "../../caverConfig";

function pickWinnerM2Act() {

  return async (dispatch) => {
    try {
      const account = await raffleV2Contract.methods.owner().call();
      const response = await caver.klay.sendTransaction({
        from: account,
        to: RAFFLEV2_CONTRACT_ADDRESS,
        gas: "3000000",
        data: raffleV2Contract.methods.winnerOfRaffleM2().encodeABI(),
      });
    dispatch({type:"SUCCESS_PICK_WINNERM2", payload : {pickWinnerM2 : true}});
    if(response.status) {
    }
    } catch (error) {
      console.error(error);
    }
   
} 
}


export const pickWinnerM2Action = { pickWinnerM2Act };

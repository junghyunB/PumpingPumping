import { raffleV1Contract, RAFFLEV1_CONTRACT_ADDRESS, caver} from "../../caverConfig";

function pickWinnerAct(date) {

  return async (dispatch) => {
    try {
      const account = await raffleV1Contract.methods.owner().call();
      const response = await caver.klay.sendTransaction({
        from: account,
        to: RAFFLEV1_CONTRACT_ADDRESS,
        gas: "3000000",
        data: raffleV1Contract.methods.winnerOfRaffleM1(date).encodeABI(),
      });
    dispatch({type:"SUCCESS_PICK_WINNER", payload : {pickWinner : true}});
    if(response.status) {
      window.location.reload();
    }
    } catch (error) {
      console.error(error);
    }
   
} 
}


export const pickWinnerAction = { pickWinnerAct };

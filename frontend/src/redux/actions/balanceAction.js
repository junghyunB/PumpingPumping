import { caver } from "../../caverConfig";

function balanceAct(account) {
    const localKey = localStorage.key(0);
  return async (dispatch) => {
    try {
      if (localKey === "metamaskAccount") {
        const klaybalancedata = await window.ethereum.request({
            method: "eth_getBalance",
            params: [account, "latest"],
          });
        let klaybalance = (parseInt(klaybalancedata) / 10 ** 18).toFixed(3);
          dispatch({ type: "GET_BALANCE", payload: { klaybalance: klaybalance } });
      } else if (localKey === "kaikasAccount") {
        const klaybalancedata = await caver.klay.getBalance(account)
        let klaybalance = (parseInt(klaybalancedata) / 10 ** 18).toFixed(3);
        dispatch({ type: "GET_BALANCE", payload: { klaybalance: klaybalance } });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const balanceAction = { balanceAct };

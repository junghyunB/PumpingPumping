import { useEffect } from "react";
import { caver, raffleV1Contract, RAFFLEV1_CONTRACT_ADDRESS } from "./caverConfig";

function App() {
  const connectKaikas = async () => {
    accounts = await klaytn.enable();
    setAccount(accounts[0]);
    setWalletType("klay");
  };

  const price = 5;
  const applyToRaffle = async() => {
    const response = await caver.klay.sendTransaction({
      from:account,
      to: RAFFLEV1_CONTRACT_ADDRESS,
      value: caver.utils.convertToPeb(price, "KLAY"),
      gas: "3000000",
      data: raffleV1Contract.methods.applyToRaffle(price).encodeABI()
    })
  }

  useEffect(() => {
    if (typeof klaytn !== "undefined") {
      try {
        const caver = new Caver(klaytn);
        setCaver(caver);
      } catch (err) {
        console.log(err);
      }
    }
  }, [])
  return (
    <div>
      <button onClick={connectKaikas}>ConnectKaikas</button>
      <button onClick={applyToRaffle}>applyToRaffle</button>
    </div>
  );
}

export default App;

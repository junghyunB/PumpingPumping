import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { epochAction } from "../../redux/actions/epochAction";
import { epochM2Action } from "../../redux/actions/epochM2Action";
import { OneTimerM1, OneTimerM2 } from "../"
import { disconnect } from "../../assets/images";
import "./NotConnectedWallet.css";

const NotConnectedWallet = () => {
  const dispatch = useDispatch();

  const epoch = useSelector((state) => state.epochM1.epoch);
  const epochM2 = useSelector((state) => state.epochM2.epochM2);
  useEffect(() => {
    dispatch(epochAction.epochAct());
    dispatch(epochM2Action.epochM2Act());
  }, [epoch, epochM2]);



  return (
    <div className="notConnectedWalletContainer">
      <div className="notConnectedWalletTopline">
      <div className="OnetimerSection">
      <div className="Onemode1Timer">
      < OneTimerM1/>
      </div>
      </div>
      <div className='OnetimerSection'>
          <div className='Onemode2Timer'>
            <OneTimerM2 />
          </div>
        </div>
      </div>
      <div className="notConnectedWalletSection">
        Available after Connect the wallet
        <img src={disconnect}></img>
      </div>
    </div>
  );
};

export default NotConnectedWallet;

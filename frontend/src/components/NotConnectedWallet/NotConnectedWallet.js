import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { epochAction } from "../../redux/actions/epochAction";
import { epochM2Action } from "../../redux/actions/epochM2Action";
import { TimerM1, TimerM2 } from "../"
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
      <div className="timerSaction">
      <div className="mode1Timer">
      <TimerM1 />
      </div>
      </div>
      <div className='timerSaction'>
          <div className='mode2Timer'>
            <TimerM2 />
          </div>
        </div>
      </div>
      <div className="notConnectedWalletSection">
        <p>Available after Connect the wallet</p>
      </div>
    </div>
  );
};

export default NotConnectedWallet;

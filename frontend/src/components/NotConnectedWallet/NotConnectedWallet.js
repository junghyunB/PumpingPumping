import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { epochAction } from "../../redux/actions/epochAction";
import { epochM2Action } from "../../redux/actions/epochM2Action";
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
      <div className="notConnectedWalletSection">
        <h1>Available after Connect the wallet</h1>
      </div>
    </div>
  );
};

export default NotConnectedWallet;

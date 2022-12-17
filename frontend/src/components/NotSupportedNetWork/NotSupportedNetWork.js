import React, { useEffect } from "react";
import "./NotSupportedNetWork.css";
import { useSelector, useDispatch } from "react-redux";
import { epochAction } from "../../redux/actions/epochAction";
import { epochM2Action } from "../../redux/actions/epochM2Action";
import { TimerM1, TimerM2 } from "../"

const NotSupportedNetWork = () => {
  const dispatch = useDispatch();
  const epoch = useSelector((state) => state.epochM1.epoch);
  const epochM2 = useSelector((state) => state.epochM2.epochM2);
  useEffect(() => {
    dispatch(epochAction.epochAct());
    dispatch(epochM2Action.epochM2Act());
  }, [epoch, epochM2]);

  return (
    <div className="notSupportedContainer">
      <div className="notSupportedtopline">
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
      <div className="notSupportedSection">
        <h1>
          The network is not supported. Please use it after checking the network
        </h1>
      </div>
    </div>
  );
};

export default NotSupportedNetWork;

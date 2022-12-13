import React, { useEffect } from "react";
import "./ChoiceMode.css";
import { useSelector, useDispatch } from "react-redux";
import { mode1main, mode2main } from "../assets/images";
import { Link } from "react-router-dom";
import { TimerM1, TimerM2 } from "../components";
import { epochAction } from "../redux/actions/epochAction";
import { epochM2Action } from "../redux/actions/epochM2Action";

const ChoiceMode = () => {
  const dispatch = useDispatch();

  const epoch = useSelector((state) => state.epochM1.epoch);
  const epochM2 = useSelector((state) => state.epochM2.epochM2);
  useEffect(() => {
    dispatch(epochAction.epochAct());
    dispatch(epochM2Action.epochM2Act());
  }, [epoch, epochM2]);

  return (
    <div className="choicePageContainer">
      <div className="choiceModeTopline">
        <div className="timerSaction">
          <div className="mode1Timer">
            <TimerM1 />
          </div>
        </div>
        <div className="timerSaction">
          <div className="mode2Timer">
            <TimerM2 />
          </div>
        </div>
      </div>
      <div className="selectModeContainer">
        <div className="selectModeSection1">
          <div className="selectMode1Content">
            <div className="selectMode1Title">
            <p>123123</p>
            </div>
            <div className="selectMode1">
              <p>asdasdsada</p>
            </div>
          </div>
          <img src={mode1main}></img>
        </div>
        <div className="selectModeSection2">
          <img src={mode2main}></img>
        </div>
      </div>
    </div>
  );
};

export default ChoiceMode;

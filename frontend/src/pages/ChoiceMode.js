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
      <div className="selectModeContainer">
        <div className="selectModeSection1">
        <div className="timerSaction">
          <div className="mode1Timer">
            <TimerM1 />
          </div>
        </div>
        <div className="selectMode1Total">
        <Link to="/mode1buy">
          <div className="selectMode1Content">
            <div className="selectMode1Title">
            <p>MODE #1</p>
            </div>
            <div className="selectMode1Name">
              <p>Ticket</p>
            </div>
          </div>
          <img src={mode1main} alt="pumpticket"></img>
        </Link>
        </div>
        </div>
        <div className="selectModeSection2">
        <div className="timerSaction">
          <div className="mode2Timer">
            <TimerM2 />
          </div>
        </div>
        <div className="selectMode2Total">
        <Link to="/mode2buy">
        <div className="selectMode1Content">
            <div className="selectMode2Title">
            <p>MODE #2</p>
            </div>
            <div className="selectMode2Name">
              <p>Ball</p>
            </div>
          </div>
          <img src={mode2main} alt="pumpball"></img>
        </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ChoiceMode;

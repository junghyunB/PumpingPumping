import { useEffect, useState } from "react";
import { useInterval } from "./hooks";
import { useDispatch, useSelector } from "react-redux";
import { pickWinnerAction } from "../../redux/actions/pickWinnerAction";
import { timerDateM1Action } from "../../redux/actions/timerDateM1Action";
import dayjs from "dayjs";
import "./OneTimer.css"

const useResultOfIntervalCalculator = (calculator, delay) => {
  const dispatch = useDispatch();
  const date = dayjs().add(1, "day").$d.toString();
  const [result, setResult] = useState(calculator());
  useInterval(() => {
    const newResult = calculator();
    if (newResult !== result) setResult(newResult);
  }, delay);
  if (result === 3 || result < -30) {
    dispatch(pickWinnerAction.pickWinnerAct(date));
  }
  return result;
};

const CountDownView = ({ targetISOString }) => {
  const remain = useResultOfIntervalCalculator(() =>
    Math.floor((new Date(targetISOString) - new Date()) / 1000, 10)
  );

  var hour = parseInt(remain / 3600);
  var min = parseInt((remain % 3600) / 60);
  var sec = remain % 60;
  if (isNaN(sec) || sec < 0)
    return (
      <div className="OneLoadingSection1">
        <p>Loading...</p>
      </div>
    );
  else
    return (
      <div className="OnetitleContainer">
        <div className="Onemode1timertitleSec">
          <p style={{color:"#9D4FE8"}}>MODE #1 Remaining</p>
        </div>
        <div className="Onemode1timerSec">
          <p style={{color:"#9D4FE8"}}>
            {hour} : {min} : {sec}
          </p>
        </div>
      </div>
    );
};

const TimerM1 = () => {
  const dispatch = useDispatch();

  const epochM1 = useSelector((state) => state.epochM1.epoch);
  const targetISOString = useSelector((state) => state.epochM1.timerM1);

  useEffect(() => {
    dispatch(timerDateM1Action.timerDateM1Act(epochM1));
  }, [epochM1]);
  // const [targetISOString, setTargetISOString] = useState("11 20 2022 13:40:00");

  return (
    <div>
      <CountDownView targetISOString={targetISOString} />
    </div>
  );
};

export default TimerM1;

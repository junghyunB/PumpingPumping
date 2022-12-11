import { useEffect, useState } from "react";
import { useInterval } from "./hooks";
import { useDispatch, useSelector } from "react-redux";
import { pickWinnerAction } from "../../redux/actions/pickWinnerAction";
import { timerDateM1Action } from "../../redux/actions/timerDateM1Action";
import dayjs from "dayjs";

const useResultOfIntervalCalculator = (calculator, delay) => {
  const dispatch = useDispatch();
  const date = dayjs().add(1, "day").$d.toString();
  const [result, setResult] = useState(calculator());
  useInterval(() => {
    const newResult = calculator();
    if (newResult !== result) setResult(newResult);
  }, delay);
  if (result === 3 || result < 0) {
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
  if (isNaN(sec) || remain < 0)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  else
    return (
      <div>
        <p>MODE#1 Remain</p>
        <p>
          {hour} H {min} M {sec} S
        </p>
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

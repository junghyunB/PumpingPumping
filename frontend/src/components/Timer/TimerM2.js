import { useEffect, useState } from "react";
import { useInterval } from "./hooks2";
import { useDispatch, useSelector } from "react-redux";
import { pickWinnerM2Action } from "../../redux/actions/pickWinnerM2Action";
import { timerDateM2Action } from "../../redux/actions/timerDateM2Action";
import dayjs from "dayjs";

const useResultOfIntervalCalculatorM2 = (calculator, delay) => {
  const dispatch = useDispatch();
  const date = dayjs().add(1, "day").$d.toString();
  const [resultM2, setResultM2] = useState(calculator());
  useInterval(() => {
    const newResultM2 = calculator();
    if (newResultM2 !== resultM2) setResultM2(newResultM2);
  }, delay);
  if (resultM2 === 3) {
    dispatch(pickWinnerM2Action.pickWinnerM2Act(date));
  }
  return resultM2;
};

const CountDownViewM2 = ({ targetISOStringM2 }) => {
  const remain = useResultOfIntervalCalculatorM2(() =>
    Math.floor((new Date(targetISOStringM2) - new Date()) / 1000, 10)
  );
  var hour = parseInt(remain / 3600);
  var min = parseInt((remain % 3600) / 60);
  var sec = remain % 60;
  if (isNaN(sec))
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  else
    return (
      <div>
        <p>MODE#2 Remain</p>
        <p>
          {hour} H {min} M {sec} S
        </p>
      </div>
    );
};

const TimerM2 = () => {
  const dispatch = useDispatch();

  const epochM2 = useSelector((state) => state.epochM2.epochM2);
  const targetISOStringM2 = useSelector((state) => state.epochM2.timerM2);

  useEffect(() => {
    dispatch(timerDateM2Action.timerDateM2Act(epochM2));
  }, [epochM2]);
  // const [targetISOStringM2, setTargetISOStringM2] = useState("11 17 2022 15:21:00");

  return (
    <div>
      <CountDownViewM2 targetISOStringM2={targetISOStringM2} />
    </div>
  );
};

export default TimerM2;

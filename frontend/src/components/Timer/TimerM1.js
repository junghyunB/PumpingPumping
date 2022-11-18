import { useEffect, useState } from "react";
import { useInterval } from "./hooks";
import { useDispatch } from "react-redux";
import { pickWinnerAction } from "../../redux/actions/pickWinnerAction";
import { pickWinnerM2Action } from "../../redux/actions/pickWinnerM2Action";

const useResultOfIntervalCalculator = (calculator, delay) => {
    const dispatch = useDispatch();
    const [result, setResult] = useState(calculator());
    useInterval(() => {
      const newResult = calculator();
      if (newResult !== result) setResult(newResult);
    }, delay);
    if(result === 1) {
      // dispatch(pickWinnerAction.pickWinnerAct());
    }
    return result;
  };
  
  const CountDownView = ({ targetISOString }) => {
    const remain = useResultOfIntervalCalculator(() =>
      Math.floor((new Date(targetISOString) - new Date()) / 1000, 10)
    );

    var hour = parseInt((remain / 3600));
    var min = parseInt((remain % 3600) / 60);
    var sec = remain % 60;
    return <div className="CountDownWrap"><p>MODE#1 Remain</p><p>{hour} H {min} M {sec} S</p></div>;
  };

const TimerM1 = () => {
    const [targetISOString, setTargetISOString] = useState("11 17 2022 16:40:00");
    const isNotYet = useResultOfIntervalCalculator(
      () => new Date(targetISOString) - new Date() > 0, 10
    );
  
    const changeTimer = () => {
        const crt = new Date()
        const year = crt.getFullYear();
        const month = crt.getMonth();
        const date = crt.getDate();
      const hour = crt.getHours();
      const minutes = crt.getMinutes();
      if(!isNotYet) {
        if(minutes + 1 < 60)
        setTargetISOString(`${month + 1} ${date} ${year} ${hour}:${minutes + 1}:00 `)
        else if(minutes + 1 === 60 && hour + 1 < 24)
        setTargetISOString(`${month + 1} ${date} ${year} ${hour + 1}:00:00 `)
        else if(minutes + 1 === 60 && hour + 1 === 24)
        setTargetISOString(`${month + 1} ${date + 1} ${year} 00:00:00 `)
      }
    }

    useEffect(() => {
      changeTimer();
    },[isNotYet])


    return (
      <div>
        <CountDownView targetISOString={targetISOString} />
      </div>
    );
}

export default TimerM1
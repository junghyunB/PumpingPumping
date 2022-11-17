import { useEffect, useState } from "react";
import { useInterval } from "./hooks2";
import { useDispatch, useSelector } from "react-redux";
import { pickWinnerM2Action } from "../../redux/actions/pickWinnerM2Action";

const useResultOfIntervalCalculatorM2 = (calculator, delay) => {
    const dispatch = useDispatch();
    const [resultM2, setResultM2] = useState(calculator());
    useInterval(() => {
      const newResultM2 = calculator();
      if (newResultM2 !== resultM2) setResultM2(newResultM2);
    }, delay);
    if(resultM2 === 1) {
    } 
    return resultM2;
  };
  
  const CountDownViewM2 = ({ targetISOStringM2 }) => {
    const remain = useResultOfIntervalCalculatorM2(() =>
      Math.floor((new Date(targetISOStringM2) - new Date()) / 1000, 10)
    );
    var hour = parseInt((remain / 3600));
    var min = parseInt((remain % 3600) / 60);
    var sec = remain % 60;
    return <div className="CountDownWrap"><p>MODE#2 Remain</p><p>{hour} H {min} M {sec} S</p></div>;
  };

const TimerM2 = () => {
  const dispatch = useDispatch();
  const [targetISOStringM2, setTargetISOStringM2] = useState("11 17 2022 15:21:00");
  const isNotYetM2 = useResultOfIntervalCalculatorM2(
      () => new Date(targetISOStringM2) - new Date() > 0, 10
    );
    const ChangeTimerM2 = () => {
      const crt = new Date()
      const year = crt.getFullYear();
      const month = crt.getMonth();
      const date = crt.getDate();
    const hour = crt.getHours();
    const minutes = crt.getMinutes();
    if(!isNotYetM2) {
      if(minutes + 1 < 60)
        setTargetISOStringM2(`${month + 1} ${date} ${year} ${hour}:${minutes + 1}:00 `)
        else if(minutes + 1 === 60 && hour + 1 < 24)
        setTargetISOStringM2(`${month + 1} ${date} ${year} ${hour + 1}:00:00 `)
        else if(minutes + 1 === 60 && hour + 1 === 24)
        setTargetISOStringM2(`${month + 1} ${date + 1} ${year} 00:00:00 `)
      }
    }

    useEffect(() => {
      ChangeTimerM2();
    },[isNotYetM2])


    return (
      <div>
        <CountDownViewM2 targetISOStringM2={targetISOStringM2} />
      </div>
    );
}

export default TimerM2
import { useEffect, useState } from "react";
import { useInterval } from "./hooks";
import { useDispatch } from "react-redux";
import { pickWinnerM2Action } from "../../redux/actions/pickWinnerM2Action";

const useResultOfIntervalCalculator = (calculator, delay) => {
    const [result, setResult] = useState(calculator());
    useInterval(() => {
      const newResult = calculator();
      if (newResult !== result) setResult(newResult);
    }, delay);
  
    return result;
  };
  
  const CountDownView = ({ targetISOString }) => {
    const remain = useResultOfIntervalCalculator(() =>
      Math.floor((new Date(targetISOString) - new Date()) / 1000, 10)
    );
    var hour = parseInt((remain / 3600));
    var min = parseInt((remain % 3600) / 60);
    var sec = remain % 60;
    return <div className="CountDownWrap">남은 시간 :{hour} 시간 {min} 분 {sec} 초</div>;
  };

const TimerT1 = () => {
    const dispatch = useDispatch();
    const [targetISOString, setTargetISOString] = useState("11 16 2022 16:51:00");
    const isNotYet = useResultOfIntervalCalculator(
      () => new Date(targetISOString) - new Date() > 0, 10
    );
    const ChangeTimer = () => {
      const year = new Date().getFullYear();
      const month = new Date().getMonth();
      const date = new Date().getDate();
      const hour = new Date().getHours();
      const minutes = new Date().getMinutes();
      if(!isNotYet) {
        setTargetISOString(`${month + 1} ${date + 2} ${year} ${hour}:${minutes}:00 `)
      }
    }
    useEffect(() => {
      ChangeTimer();
    },[isNotYet])

    useEffect(() => {
      if(new Date(targetISOString) - new Date() > 19000) {
      }
    }, [targetISOString])

    return (
      <div>
        <CountDownView targetISOString={targetISOString} />
      </div>
    );
}

export default TimerT1
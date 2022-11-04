import { useState } from "react";
import { useInterval } from "./hooks";

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
    let day = parseInt((remain / 72000));
    var hour = parseInt((remain / 3600) % 24);
    var min = parseInt((remain % 3600) / 60);
    var sec = remain % 60;
    return <div className="CountDownWrap">남은 시간 :{day}일 {hour} 시간 {min} 분 {sec} 초</div>;
  };

const Timer = () => {
    const targetISOString = "2022-11-05T22:00:00.000Z";
    const isNotYet = useResultOfIntervalCalculator(
      () => new Date(targetISOString) - new Date() > 0,
      10
    );
    return (
      <div>
        <CountDownView targetISOString={targetISOString} />
      </div>
    );
}

export default Timer
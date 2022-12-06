import React, { useEffect } from "react";
import { TimerM1 } from "../";
import { useDispatch, useSelector } from "react-redux";
import { dashBoardM1Action } from "../../redux/actions/dashBoardM1Action";
import { klaytn } from "../../assets/images"
import "./DashBoardM1.css";


const DashBoardM1 = () => {
  const dispatch = useDispatch();
  const dashboardM1 = useSelector((state) => state.epochM1.dashboardM1);

  function chunk(data = [], size = 3) {
    const items = [...data];
    const arr = [];

    while (items.length) {
      arr.push(items.splice(0, size));
    }

    return arr;
  }

  let dashboardM1Arr = chunk(dashboardM1).reverse();
  
  useEffect(() => {
    dispatch(dashBoardM1Action.dashBoardM1Act());
  }, []);

  return (
    <div className="dashBoardLeftSection">
              <div className="timerSaction">
      <div className="mode1Timer">
      <TimerM1 />
      </div>
      </div>
      <div className="mode1dashboardtitle">
        <p>MODE #1</p>
      </div>
      <div className="mode1dashboardtext">
        <p>
          Mode#1 game Information.
          <br />
          Design comment
        </p>
      </div>
      <div className="mode1dashboardContainer">
      <div className="mode1dashboarddata">
        <div className="mode1dashboardround">Round</div>
        <div className="mode1dashboardtotalticketprize">Total Ticket</div>
        <div className="mode1dashboardtotalticketprize">Prize</div>
      </div>
      {dashboardM1Arr.map(item => (
              <div key={item} className="mode1dashboarddata2">
                <div className="mode1dashboardround">{item[0]} Round</div>
                <div className="mode1dashboardtotalticketprize">{item[1]} Ticket</div>
                <div className="mode1dashboardtotalticketprize"><img src={klaytn}></img>{item[2]} Klay</div>
                </div>
      ))}
      </div>
      <div className="mode1dashboardpagenation"></div>
    </div>
  );
};

export default DashBoardM1;

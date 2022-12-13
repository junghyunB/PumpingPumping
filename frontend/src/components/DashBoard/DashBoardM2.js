import React, { useEffect, useState } from "react";
import "./DashBoardM2.css";
import { TimerM2 } from "../";
import { useSelector, useDispatch } from "react-redux";
import { dashBoardM2Action } from "../../redux/actions/dashBoardM2Action";
import { klaytn } from "../../assets/images";
const DashBoardM2 = () => {
  const dispatch = useDispatch();

  const dashBoardDataM2 = useSelector((state) => state.epochM2.dashBoardDataM2);

  function chunk(data = [], size = 5) {
    const items = [...data];
    const arr = [];

    while (items.length) {
      arr.push(items.splice(0, size));
    }

    return arr;
  }
  let dashboardM2Arr = chunk(dashBoardDataM2).reverse();

  useEffect(() => {
    dispatch(dashBoardM2Action.dashBoardM2Act());
  }, []);

  return (
    <div className="dashBoardRightSection">
              <div className='timerSaction'>
          <div className='mode2Timer'>
            <TimerM2 />
          </div>
        </div>
      <div className="mode2dashboardtitle">
        <p>MODE #2</p>
      </div>
      <div className="mode2dashboardtext">
        <p>
        This is an event to guess the winning number.
        <br />
        Select a number between 1 and 250.
        </p>
      </div>
      <div className="mode2dashboardContainer">
      <div className="mode2dashboarddata">
        <div className="mode2dashboardround">Round</div>
        <div className="mode2dashboardtotalticket">Total Ticket</div>
        <div className="mode2dashboardprize">Prize</div>
        <div className="mode2dashboardtotalwinningNumber">winningNumber</div>
      </div>
      {dashboardM2Arr.map(item => (
              <div key={item} className="mode2dashboarddata2">
                <div className="mode2dashboardround">{item[0]} Round</div>
                <div className="mode2dashboardtotalticket">{item[1]} Ticket</div>
                <div className="mode2dashboardprize"><img src={klaytn}></img>{item[2]} Klay</div>
                <div className="mode2dashboardtotalwinningNumber">#{item[3]} [{item[0]}, {item[4]}]</div>
                </div>
      ))}
      </div>

      <div className="mode1dashboardpagenation"></div>
    </div>
  );
};

export default DashBoardM2;

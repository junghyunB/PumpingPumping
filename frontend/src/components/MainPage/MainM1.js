import React, { useEffect, useState } from "react";
import "./MainM1.css";
import { useDispatch, useSelector } from "react-redux";
import { TimerM1 } from "../"
import { epochAction } from "../../redux/actions/epochAction";
import { totalAmountAction } from "../../redux/actions/totalAmountAction";
import { winningTicketAction } from "../../redux/actions/winningTicketAction";
import { leftarrow, rightarrow, klaytn } from "../../assets/images";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const MainM1 = () => {
  const dispatch = useDispatch();
  let currentEpoch = useSelector((state) => parseInt(state.epochM1.epoch));
  const totalAmount = useSelector((state) => state.ticket.totalAmount);
  const winnigTicket = useSelector((state) => state.ticket.winningTicketId);
  let [changeEpoch, setChangeEpoch] = useState(currentEpoch);

  const setData = () => {
    setChangeEpoch(currentEpoch);
  };

  const addEpoch = () => {
    if (changeEpoch === currentEpoch) {
      alert("Last Round.");
    } else if (changeEpoch < currentEpoch) {
      setChangeEpoch(changeEpoch + 1);
    }
  };

  const subEpoch = () => {
    if (changeEpoch === 1) {
      alert("First Round.");
    } else {
      setChangeEpoch(changeEpoch - 1);
    }
  };

  useEffect(() => {
    dispatch(epochAction.epochAct());
    setData();
  }, [currentEpoch]);

  useEffect(() => {
    dispatch(totalAmountAction.totalAmountAct(changeEpoch));
    dispatch(winningTicketAction.winningTicketAct(changeEpoch));
  }, [changeEpoch]);

  return (
    <div className="mainPageLeftSection">
        <div className="timerSaction">
      <div className="mode1Timer">
      <TimerM1 />
      </div>
      </div>
      <div className="mode1maintitle">
        <p>MODE #1</p>
      </div>
      <div className="mode1maintext">
        <p>
          Mode#1 game Information.
          <br />
          Design comment
        </p>
      </div>
      <div className="mode1mainround">
        <div className="mode1mainbtn1" onClick={subEpoch}>
          <img src={leftarrow}></img>
        </div>
        <div className="mode1mainroundsection">
          <div className="mode1mainroundsection1">
            <p>{changeEpoch}th ROUND</p>
          </div>
          <div className="mode1mainroundsection2">
            {changeEpoch === currentEpoch ? (
              <p>Proceeding...</p>
            ) : (
              <p>
                [ {changeEpoch} , {winnigTicket}]
              </p>
            )}
          </div>
        </div>
        <div className="mode1mainbtn2" onClick={addEpoch}>
          <img src={rightarrow}></img>
        </div>
      </div>
      <div className="mode1remainSection"></div>
      <div className="mode1mainprize">
        <div className="mode1mainprizetitle">
          <p>Total Prize</p>
        </div>
        <div className="mode1mainprizeklaytn">
          <img src={klaytn}></img>
          <p>{totalAmount} klay</p>
        </div>
      </div>
      <Link to="/mode1buy" style={{ textDecoration: "none" }}>
        <div className="mode1mainBtn">
          <Button>Buy Ticket</Button>
        </div>
      </Link>
    </div>
  );
};

export default MainM1;

import React, { useEffect, useState } from "react";
import "./MainM1.css";
import { useDispatch, useSelector } from "react-redux";
import { TimerM1 } from "../"
import { epochAction } from "../../redux/actions/epochAction";
import { totalAmountAction } from "../../redux/actions/totalAmountAction";
import { winningTicketAction } from "../../redux/actions/winningTicketAction";
import { leftarrow, rightarrow, klaytn, mode1ticket, trophy } from "../../assets/images";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

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
      Swal.fire({
        title: "Last Round!",
        icon:"error",
        confirmButtonText: "OK"
      })
    } else if (changeEpoch < currentEpoch) {
      setChangeEpoch(changeEpoch + 1);
    }
  };

  const subEpoch = () => {
    if (changeEpoch === 1) {
      Swal.fire({
        title: "First Round",
        icon:"error",
        confirmButtonText: "OK"
      })
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
        Participate by spending 5 Klay and take a draw ticket.
        <br />
        Winners are chosen randomly.
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
              <>
              <div className="mode1winningTicketTitle">
                <img src={trophy}></img><p>Winning Ticket</p>
              </div>
              <div className="mode1winningTicketData">
                <img src={mode1ticket}></img>
                <div className="mode1TicketonDataSection1">
                {changeEpoch} , {winnigTicket}
                </div>
              </div>
              </>
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

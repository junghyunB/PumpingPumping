import React, { useEffect, useState } from "react";
import "./MainM1.css";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { epochAction } from "../../redux/actions/epochAction";
import { totalAmountAction } from "../../redux/actions/totalAmountAction";
import { winningTicketAction } from "../../redux/actions/winningTicketAction";
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

const MainM1 = () => {
    const dispatch = useDispatch();
    let currentEpoch = useSelector(state => parseInt(state.epochM1.epoch));
    const totalAmount = useSelector(state => state.ticket.totalAmount);
    const winnigTicket = useSelector(state => state.ticket.winningTicketId);
    let [changeEpoch, setChangeEpoch] = useState(currentEpoch);

    const setData = () => {
        setChangeEpoch(currentEpoch);
    }

    const addEpoch = () => {
      if(changeEpoch === currentEpoch) {
      alert("마지막 회차 입니다");
  } else if(changeEpoch < currentEpoch){
      setChangeEpoch(changeEpoch + 1);
  }
    };
  
    const subEpoch = () => {
      if(changeEpoch === 1) {
        alert("첫번째 회차 입니다");
      } else {
          setChangeEpoch(changeEpoch - 1);
      }
    };

  useEffect(() => {
      dispatch(epochAction.epochAct());
      setData()
  }, [currentEpoch]);

  useEffect(() => {
    dispatch(totalAmountAction.totalAmountAct(changeEpoch));
    dispatch(winningTicketAction.winningTicketAct(changeEpoch));
  }, [changeEpoch])

  return (
    <div className="mainPageLeftSection">
      <div className="mainPageLeftSection1">
        <div className="mainPageLeftSectionTitle">
          <p>Mode#1</p>
          <hr />
        </div>
        <div className="mainPageLeftInfoSection">
          <div className="mainPageLeftSectionSilder">
            <button className="leftSectionLeftBtn" onClick={subEpoch}><BiLeftArrow size={30} /></button>
            <button className="leftSectionRightBtn" onClick={addEpoch}><BiRightArrow size={30} />
            </button>
            <p>{changeEpoch} round Winning Ticket</p>
            {changeEpoch === currentEpoch ? <p>Proceeding...</p> : <p>[ {changeEpoch} , {winnigTicket}]</p>}
            <br></br>
            <br></br>
          </div>
          <div className="mainPageLeftPrizedSection">
            <table>
              <tr className="tableTitle">
                <td>Total Prized</td>
              </tr>
              <tr className="tableInfo">
                <td>{totalAmount} Klay</td>
              </tr>
            </table>
          </div>
          <Link to="/mode1buy" style={{ textDecoration: "none" }}>
          <div className="LeftBuyBtn">
          <Button variant="outline-dark">BuyTicket</Button>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainM1;

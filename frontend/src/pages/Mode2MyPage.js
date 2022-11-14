import React, { useState, useEffect } from "react";
import "./Mode2MyPage.css";
import Button from "react-bootstrap/Button";
import { mode1ticket } from "../assets/images";
import { Link } from "react-router-dom";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import { Right1 } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { epochM2Action } from "../redux/actions/epochM2Action";
import { myTicketInfoM2Action } from "../redux/actions/myTicketInfoM2Action";

const Mode2MyPage = () => {
  const dispatch = useDispatch();

  let currentEpochM2 = useSelector((state) => parseInt(state.epochM2.epochM2));
  const myTicketInfoM2 = useSelector((state) => state.userM2.myTicketInfoM2);
  const detailState = useSelector((state) => state.userM2.detailState);
  let [changeEpochM2, setChangeEpochM2] = useState(currentEpochM2);
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);
  let TicketArr = [];

  const setData = () => {
    setChangeEpochM2(currentEpochM2);
  };

  const visiblity = (number, epoch, id) => {
    dispatch({type:"GET_MY_TICKET_DETAILM2", payload:[number, epoch, id]})
    dispatch({type:"DETAIL_STATE"});
  };


  for (let i = 0; i < myTicketInfoM2[0].length; i++) {
    TicketArr.push(
      <div className="img-wrap" onClick={() => visiblity(myTicketInfoM2[0][i], changeEpochM2, myTicketInfoM2[1][i])}>
        <img src={mode1ticket} alt="ticket"></img>
        <div className="img-text">
          <p>#{myTicketInfoM2[0][i]}</p>
          <p className="text-interval">
            {changeEpochM2}, {myTicketInfoM2[1][i]}
          </p>
        </div>
      </div>
    );
  }

  const addEpoch = () => {
    if (changeEpochM2 === currentEpochM2) {
      alert("마지막 회차 입니다");
    } else if (changeEpochM2 < currentEpochM2) {
      setChangeEpochM2(changeEpochM2 + 1);
    }
  };

  const subEpoch = () => {
    if (changeEpochM2 === 1) {
      alert("첫번째 회차 입니다");
    } else {
      setChangeEpochM2(changeEpochM2 - 1);
    }
  };

  useEffect(() => {
    dispatch(epochM2Action.epochM2Act());
    setData();
  }, [currentEpochM2]);

  useEffect(() => {
    dispatch(myTicketInfoM2Action.myTicketInfoM2Act(account, changeEpochM2));
  }, [account, changeEpochM2]);

  return (
    <>
      <div className="mode2MyPageContainer">
        <div className="mode2MyPageSection">
          <div className="mode2selectSection">
            <Link to="/mode2buy" className="z-indexZone">
              <Button variant="outline-dark">BuyTicket</Button>
            </Link>
            <Link to="/mode2my" className="z-indexZone">
              <Button variant="outline-dark">MyPage</Button>
            </Link>
          </div>
          <div className="mode2MyPageMainSelectSection">
            <div className="mode2MyContents">
              <div className="mode2MyTitle">
                <button onClick={subEpoch}>
                  <BiLeftArrow size={30} />
                </button>
                <h3>{changeEpochM2} round</h3>
                <button onClick={addEpoch}>
                  <BiRightArrow size={30} />
                </button>
              </div>
              <div className="mode2MyTicketList">
                <div className="myTicketTitle">
                  <p>Own Mode#2 Ticket : </p>
                </div>
                <div className="ticketListSection">
                  {TicketArr?.map((item) => item)}
                </div>
              </div>
              <div className="mode2TicketInfo"></div>
              <div className="mode2Result"></div>
              <div className="mode2Claim"></div>
              <div></div>
            </div>
            {detailState ? <Right1 /> : <div></div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mode2MyPage;

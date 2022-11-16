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
import { totalAmountM2Action } from "../redux/actions/totalAmountM2Action";
import { totalTicketM2Action } from "../redux/actions/totalTicketM2Action";
import { winningNumberM2Action } from "../redux/actions/winningNumberM2Action";
import { winningTicketIdM2Action } from "../redux/actions/winningTicketIdM2Action";
import { isClaimedM2Action } from "../redux/actions/isClaimedM2Action";
import { tieTicketM2Action } from "../redux/actions/tieTicketM2Action";
import { claimRewardM2Action } from "../redux/actions/claimRewardM2Action";

const Mode2MyPage = () => {
  const dispatch = useDispatch();

  let currentEpochM2 = useSelector((state) => parseInt(state.epochM2.epochM2));
  const myTicketInfoM2 = useSelector((state) => state.userM2.myTicketInfoM2);
  const detailState = useSelector((state) => state.userM2.detailState);
  const totalAmountM2 = useSelector((state) => state.ticketM2.totalAmountM2);
  const totalTicketAmountM2 = useSelector(
    (state) => state.ticketM2.totalTicketAmountM2
  );
  const winningNumberM2 = useSelector(
    (state) => state.ticketM2.winningNumberM2
  );
  const winningTicketIdM2 = useSelector(
    (state) => state.ticketM2.winningTicketIdM2
  );
  const isClaimedM2 = useSelector((state) => state.userM2.isClaimedM2);
  const tieTicketM2 = useSelector((state) => state.ticketM2.tieTicketM2);
  let [changeEpochM2, setChangeEpochM2] = useState(currentEpochM2);
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);
  let TicketArr = [];

  const setData = () => {
    setChangeEpochM2(currentEpochM2);
  };

  const visiblity = (number, epoch, id) => {
    dispatch({ type: "GET_MY_TICKET_DETAILM2", payload: [number, epoch, id] });
    dispatch({ type: "DETAIL_STATE" });
  };

  const claimRewardM2 = () => {
    if (isClaimedM2 === "0") {
      alert("Not the winner of this round");
    } else if (isClaimedM2 === "1") {
      dispatch(claimRewardM2Action.claimRewardM2Act(changeEpochM2));
    } else if (isClaimedM2 === "2") {
      alert("You have already received the reward for this round");
    }
  };

  for (let i = 0; i < myTicketInfoM2[0].length; i++) {
    TicketArr.push(
      <div
        className="img-wrap"
        onClick={() =>
          visiblity(myTicketInfoM2[0][i], changeEpochM2, myTicketInfoM2[1][i])
        }
      >
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
    dispatch(totalAmountM2Action.totalAmountM2Act(changeEpochM2));
    dispatch(totalTicketM2Action.totalTicketM2Act(changeEpochM2));
    dispatch(winningNumberM2Action.winningNumberM2Act(changeEpochM2));
    dispatch(winningTicketIdM2Action.winningTicketIdM2Act(changeEpochM2));
    dispatch(isClaimedM2Action.isClaimedM2Act(account, changeEpochM2));
    dispatch(tieTicketM2Action.tieTicketM2Act(changeEpochM2));
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
              <div className="mode2TicketInfo">
                <div className="mode2totalTicketSection">
                  <p>Total Ticket : {totalTicketAmountM2} EA</p>
                </div>
                <div className="mode2totalAmountSection">
                  <p>Total Prize : {totalAmountM2} KLAY</p>
                </div>
              </div>

              <div className="winningTicketSection">
                {winningNumberM2 === "0" ? (
                  <div className="currnetEpochWinningTicket">
                    <h2>Winning Ticket</h2>
                    <h2>Proceeding...</h2>
                  </div>
                ) : tieTicketM2.length !== 0 ? (
                  <>
                    <div className="winningTicket">
                      <div className="winningTicketTitle">
                        <h4>winningTicket </h4>
                      </div>
                      <div className="winningTicketimgSection">
                        <img src={mode1ticket}></img>
                        <div className="winningNumberData">
                          <p>#{winningNumberM2}</p>
                          <p>
                            {changeEpochM2}, {winningTicketIdM2}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="tieTicket">
                      <div className="tieTicketTitle">
                        <h4>Tie Ticket</h4>
                      </div>
                      <div className="tieTicketImgSection">
                        <div className="tieImgSmallSection">
                          <img src={mode1ticket}></img>
                          <div className="tieNumberData">
                            <p>#{winningNumberM2}</p>
                            <p>{changeEpochM2}, 2</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                    <div className="winningTicketNotTie">
                      <div className="winningTicketTitle">
                        <h3>winningTicket</h3>
                      </div>
                      <div className="winningTicketimgSection">
                        <img src={mode1ticket}></img>
                        <div className="winningNumberData">
                          <p>#{winningNumberM2}</p>
                          <p>
                            {changeEpochM2}, {winningTicketIdM2}
                          </p>
                        </div>
                      </div>
                    </div>
                )}
              </div>
              <div className="mode2Result">
                {winningNumberM2 === "0" ? (
                  <div className="resultSection">
                    <p>Result : Proceeding...</p>{" "}
                  </div>
                ) : isClaimedM2 === "0" ? (
                  <div className="resultSection">
                    <p>Result : False</p>{" "}
                  </div>
                ) : isClaimedM2 === "1" ? (
                  <>
                    <div className="winningresultSection">
                      <p>Result : Success</p>
                    </div>
                    <div className="winningclaimSection">
                      <p>Claim : Possible</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="winningresultSection">
                      <p>Result : Success</p>
                    </div>
                    <div className="winningclaimSection">
                      <p>Claim : Already Did it</p>
                    </div>
                  </>
                )}
              </div>
              <div className="mode2Claim">
                <Button variant="outline-dark" onClick={claimRewardM2}>
                  Claim
                </Button>
              </div>
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

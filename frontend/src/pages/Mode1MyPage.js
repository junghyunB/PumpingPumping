import React, { useEffect, useState } from "react";
import "./Mode1MyPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OneTimerM1, OneTimerM2 } from "../components/";
import { epochAction } from "../redux/actions/epochAction";
import { myTicketCountAction } from "../redux/actions/myTicketCountAction";
import { userM1TicketNumAction } from "../redux/actions/userM1TicketNumAction";
import { totalAmountAction } from "../redux/actions/totalAmountAction";
import { totalTicketAmountAction } from "../redux/actions/totalTicketAmountAction";
import { myRatioAction } from "../redux/actions/myRatioAction";
import { epochWinnerAction } from "../redux/actions/epochWinnerAction";
import { claimRewardM1Action } from "../redux/actions/claimRewardM1Action";
import { isClaimedAction } from "../redux/actions/isClaimedAction";
import { winningTicketAction } from "../redux/actions/winningTicketAction";
import { epochM2Action } from "../redux/actions/epochM2Action";
import Swal from "sweetalert2";
import {
  ticket_basic,
  klaytn,
  trophy,
  result_false,
  result_success,
  proceeding,
  leftarrow,
  rightarrow,
  mode1ticket,
  ticket_false,
} from "../assets/images";

const Mode1MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currentEpoch = useSelector((state) => parseInt(state.epochM1.epoch));
  const ownedMyTicket = useSelector((state) =>
    parseInt(state.user.myTicketAmount)
  );
  const ownedMyTicketNum = useSelector(
    (state) => state.user.userM1TicketNumList
  );
  const totalAmount = useSelector((state) => state.ticket.totalAmount);
  const totalTicketAmount = useSelector(
    (state) => state.ticket.totalTicketAmount
  );
  const winningTicket = useSelector((state) => state.ticket.winningTicketId);
  const myRatio = useSelector((state) => state.user.myRatio);
  const isClaimM1 = useSelector((state) => state.user.isclaimM1);
  let epochWinner = useSelector((state) => state.epochM1.epochWinner);
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);
  let [changeEpoch, setChangeEpoch] = useState(currentEpoch);
  const epochM2 = useSelector((state) => state.epochM2.epochM2);
  epochWinner = epochWinner.toLowerCase();
  let maxTicketAmount = 20;
  let userTicketArr = [];
  const setData = () => {
    setChangeEpoch(currentEpoch);
  };

  const addEpoch = () => {
    if (changeEpoch === currentEpoch) {
      Swal.fire({
        title: "Last Round!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (changeEpoch < currentEpoch) {
      setChangeEpoch(changeEpoch + 1);
    }
  };

  const subEpoch = () => {
    if (changeEpoch === 1) {
      Swal.fire({
        title: "First Round!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      setChangeEpoch(changeEpoch - 1);
    }
  };

  const notWinner = () => {
    Swal.fire({
      title: `You are not a winner of the ${changeEpoch}round`,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const alreadyClaim = () => {
    Swal.fire({
      title: `You have already received the reward for the ${changeEpoch}round`,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  for (let i = 0; i < maxTicketAmount; i++) {
    if (i + 1 <= ownedMyTicketNum.length) {
      if (winningTicket !== 0 && ownedMyTicketNum[i] === winningTicket) {
        userTicketArr.push(
          <div className="mode1mypageOwnedTicketEASection" key={i}>
            <div className="mode1mypageTicketWrap">
              <img src={mode1ticket}></img>
              <div className="mode1myTicketNumber">
                <p>
                  {changeEpoch}, {ownedMyTicketNum[i]}
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        userTicketArr.push(
          <div className="mode1mypageOwnedTicketEASection" key={i}>
            <div className="mode1mypageTicketWrap">
              <img src={ticket_basic}></img>
              <div className="mode1myTicketNumber">
                <p>
                  {changeEpoch}, {ownedMyTicketNum[i]}
                </p>
              </div>
            </div>
          </div>
        );
      }
    } else {
      userTicketArr.push(
        <div className="mode1mypageOwnedTicketEASection" key={i}>
          <div className="mode1mypageTicketWrap">
            <img src={ticket_false}></img>
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    dispatch(epochAction.epochAct());
    setData();
  }, [currentEpoch]);

  const ClaimRewardM1 = () => {
    dispatch(claimRewardM1Action.claimRewardM1Act(changeEpoch));
  };

  useEffect(() => {
    dispatch(myTicketCountAction.myTicketCountAct(account, changeEpoch));
    dispatch(userM1TicketNumAction.userM1TicketNumAct(account, changeEpoch));
    dispatch(totalAmountAction.totalAmountAct(changeEpoch));
    dispatch(totalTicketAmountAction.totalTicketAmountAct(changeEpoch));
    dispatch(myRatioAction.myRatioAct(account, changeEpoch));
    dispatch(epochWinnerAction.epochWinnerAct(changeEpoch));
    dispatch(isClaimedAction.isClaimedAct(account, changeEpoch));
    dispatch(epochM2Action.epochM2Act());
    dispatch(winningTicketAction.winningTicketAct(changeEpoch));
  }, [account, changeEpoch, epochM2]);

  return (
    <div className="mode1MyPageContainer">
      <div className="mypageTopLine">
        <div className="OnetimerSection">
          <div className="Onemode1Timer">
            <OneTimerM1 />
          </div>
        </div>
        <div className="OnetimerSection">
          <div className="Onemode2Timer">
            <OneTimerM2 />
          </div>
        </div>
      </div>
      <div className="mode1myPageContainer">
        <div className="mode1mypageTitle">
          <p>MODE #1</p>
        </div>
        <div className="mode1mypageText">
          <p>
            Participate by spending 5 Klay and take a draw ticket.
            <br />
            Winners are chosen randomly.
          </p>
        </div>
        <div className="mode1mypageSelectSection">
          <div
            className="mode1mybuySection"
            onClick={() => navigate("/mode1buy")}
          >
            <p>Buy</p>
          </div>
          <div
            className="mode1mymypageSection"
            onClick={() => navigate("/mode1my")}
          >
            <p>My Page</p>
          </div>
        </div>
        <div className="mode1mypagepaddingSection"></div>
        <div className="mode1mypageDataContainer">
          <div className="mode1mypageDataSection">
            <div className="mode1mypagetotalTicketTitle">
              <p>Total Ticket</p>
            </div>
            <div className="mode1mypagetotalTicketimage">
              <img src={ticket_basic}></img>
              <p>{totalTicketAmount} EA</p>
            </div>
            <div className="mode1mypagetotalPrizeTitle">
              <p>Total Prize</p>
            </div>
            <div className="mode1mypagetotalPrizeimage">
              <img src={klaytn}></img>
              <p>{totalAmount} Klay</p>
            </div>
            <div className="mode1mypageWinningrate">
              <p>Winning Rate</p>
            </div>
            <div className="mode1mypageWinningrateimage">
              <img src={trophy}></img>
              {totalAmount === 0 ? <p>0 %</p> : <p>{myRatio} %</p>}
            </div>
            <div className="mode1mypageResultTitle">
              <p>Result</p>
            </div>
            <div className="mode1mypageResultImage">
              {epochWinner === account && isClaimM1 === "1" ? (
                <>
                  <img src={result_success}></img>
                  <p style={{ color: "#28D182" }}>Success</p>
                </>
              ) : currentEpoch === changeEpoch ? (
                <>
                  <img src={proceeding}></img>
                  <p style={{ color: "#FF9140" }}>Proceeding</p>
                </>
              ) : epochWinner === account && isClaimM1 === "2" ? (
                <>
                  <img src={result_success}></img>
                  <p style={{ color: "#28D182" }}>Success</p>
                </>
              ) : (
                <>
                  <img src={result_false}></img>
                  <p style={{ color: "#F56060" }}>False</p>
                </>
              )}
            </div>
          </div>
          <div className="mode1mycolPaddingSection"></div>
          <div className="mode1myRoundTicketSection">
            <div className="mode1myRoundSection">
              <div className="mode1mypagebtn" onClick={subEpoch}>
                <img src={leftarrow}></img>
              </div>
              <div className="mode1mypageRoundBox">
                <p>{changeEpoch}th Round</p>
              </div>
              <div className="mode1mypagewinningBox">
                <div className="mode1mypageWinningTicketTitle">
                  <img src={trophy}></img>
                  <p>Winning Ticket</p>
                </div>
                <div className="mode1mypageWinningTicketimage">
                  <img src={mode1ticket}></img>
                  <div className="mode1mypageWinningTicketData">
                    {changeEpoch}, {winningTicket}
                  </div>
                </div>
              </div>
              <div className="mode1mypagebtn" onClick={addEpoch}>
                <img src={rightarrow}></img>
              </div>
            </div>
            <div className="mode1mypagepaddingSection2"></div>
            <div className="mode1mypageOwnedTicketSection">
              <div className="mode1mypageOwnedTitleSection">
                <p>Own Mode#1 Ticket </p> <img src={ticket_basic}></img>{" "}
                <div className="ownMyTicketText">
                  <p>{ownedMyTicket} EA</p>
                </div>
              </div>
              <div className="mode1mypageOwnedTikcetImage">
                {userTicketArr.map((item) => item)}
              </div>
            </div>
          </div>
        </div>
        <div className="mode1mypageClaimSection">
          {epochWinner === account && isClaimM1 === "1" ? (
            <div className="mode1SuccessClaimButton" onClick={ClaimRewardM1}>
              Claim
            </div>
          ) : currentEpoch === changeEpoch ? (
            <div className="mode1profalseButton" onClick={notWinner}>
              Claim
            </div>
          ) : epochWinner === account && isClaimM1 === "2" ? (
            <div className="mode1profalseButton" onClick={alreadyClaim}>
              Already Claim
            </div>
          ) : (
            <div className="mode1profalseButton" onClick={notWinner}>
              False
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mode1MyPage;

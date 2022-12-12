import React, { useEffect, useState } from "react";
import "./Mode1MyPage.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import { epochAction } from "../redux/actions/epochAction";
import { myTicketCountAction } from "../redux/actions/myTicketCountAction";
import { userM1TicketNumAction } from "../redux/actions/userM1TicketNumAction";
import { totalAmountAction } from "../redux/actions/totalAmountAction";
import { totalTicketAmountAction } from "../redux/actions/totalTicketAmountAction";
import { myRatioAction } from "../redux/actions/myRatioAction";
import { epochWinnerAction } from "../redux/actions/epochWinnerAction";
import { claimRewardM1Action } from "../redux/actions/claimRewardM1Action";
import { isClaimedAction } from "../redux/actions/isClaimedAction";
import { epochM2Action } from "../redux/actions/epochM2Action";
import Swal from 'sweetalert2';

const Mode1MyPage = () => {
  const dispatch = useDispatch();
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
  const myRatio = useSelector((state) => state.user.myRatio);
  const isClaimM1 = useSelector((state) => state.user.isclaimM1);
  let epochWinner = useSelector((state) => state.epochM1.epochWinner);
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);
  let [changeEpoch, setChangeEpoch] = useState(currentEpoch);
  const epochM2 = useSelector(state => state.epochM2.epochM2);
  epochWinner = epochWinner.toLowerCase();
  const setData = () => {
    setChangeEpoch(currentEpoch);
  };

  const addEpoch = () => {
    if (changeEpoch === currentEpoch) {
      Swal.fire({
        title: "Last Round!",
        icon:"error",
        confirmButtonText: "OK",
      })
    } else if (changeEpoch < currentEpoch) {
      setChangeEpoch(changeEpoch + 1);
    }
  };

  const subEpoch = () => {
    if (changeEpoch === 1) {
      Swal.fire({
        title: "First Round!",
        icon:"error",
        confirmButtonText: "OK",
      })
    } else {
      setChangeEpoch(changeEpoch - 1);
    }
  };

  const notWinner = () => {
    Swal.fire({
      title: `You are Not a winner of the ${changeEpoch}round`,
      icon:"error",
      confirmButtonText: "OK",
    })
  };

  const alreadyClaim = () => {
    Swal.fire({
      title: `You have already received the reward for the ${changeEpoch}round`,
      icon:"error",
      confirmButtonText: "OK",
    })
  }

  useEffect(() => {
    dispatch(epochAction.epochAct());
    setData();
  }, [currentEpoch]);

  const ClaimRewardM1 = () => {
    dispatch(claimRewardM1Action.claimRewardM1Act(changeEpoch));
  };

  const WinningAndClaim = () => {
    if (epochWinner === account && isClaimM1 === "1") {
      return (
        <>
          <div className="dataSection2">
            <h5>Result : Success</h5>
            <h5>Claim : Possible</h5>
          </div>
          <div className="claimButtonSection">
            <Button onClick={ClaimRewardM1} variant="outline-dark">
              Claim
            </Button>
          </div>
        </>
      );
    } else if (currentEpoch === changeEpoch) {
      return (
        <>
          <div className="dataSection">
            <h5>Result : proceeding...</h5>
          </div>
          <div className="claimButtonSection">
            <Button onClick={notWinner} variant="outline-dark">
              Claim
            </Button>
          </div>
        </>
      );
    } else if (epochWinner === account && isClaimM1 === "2") {
      return (
        <>
          <div className="dataSection2">
            <h5>Result : Success</h5>
            <h5>Claim : Already did it</h5>
          </div>
          <div className="claimButtonSection">
            <Button onClick={alreadyClaim} variant="outline-dark">
              Claim
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="dataSection">
            <h5>Result : Failed</h5>
          </div>
          <div className="claimButtonSection">
            <Button onClick={notWinner} variant="outline-dark">
              Claim
            </Button>
          </div>
        </>
      );
    }
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
  }, [account, changeEpoch, epochM2]);

  return (
    <div className="mode1MyPageContainer">
      <div className="mode1MyPageSection">
        <Card className="mod1MyPageSection1">
          <div className="buyMypageselect">
            <div className="buybuttonSection">
              <Link to="/mode1buy" className="z-indexZone">
                <Button variant="outline-dark">BuyTicket</Button>
              </Link>
            </div>
            <div className="mypagebuttonSection">
              <Link to="/mode1my" className="z-indexZone">
                <Button variant="outline-dark">MyPage</Button>
              </Link>
            </div>
          </div>
          <div className="mode1epochSection">
            <button onClick={subEpoch}>
              <BiLeftArrow size={30} />
            </button>
            {changeEpoch === currentEpoch ? (
              <h3>{changeEpoch} round proceeding...</h3>
            ) : (
              <h3>{changeEpoch} round</h3>
            )}
            <button onClick={addEpoch}>
              <BiRightArrow size={30} />
            </button>
          </div>
          <hr></hr>
          <div className="ownedTicketSection">
            <div className="ownedTicketEaSection">
              <p>Own Mode#1 Ticket : {ownedMyTicket} EA</p>
            </div>
            {ownedMyTicketNum.map((item) => (
              <div className="ownedTicketNumSection">
                [{changeEpoch}, {item}]
              </div>
            ))}
          </div>
          <div className="dataSection">
            <h5>Total Ticket : {totalTicketAmount} EA</h5>
          </div>
          <div className="dataSection">
            <h5>Total Prize : {totalAmount} Klay</h5>
          </div>
          <div className="dataSection">
            <h5>Winning Rate : {totalAmount === 0 ? "0 %" : `${myRatio} %`}</h5>
          </div>
          <WinningAndClaim />
        </Card>
      </div>
    </div>
  );
};

export default Mode1MyPage;

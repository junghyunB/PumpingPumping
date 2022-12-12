import React, { useEffect, useState } from "react";
import "./Mode1BuyPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { klaytn } from "../assets/images";
import { epochAction } from "../redux/actions/epochAction";
import { epochM2Action } from "../redux/actions/epochM2Action";
import { myTicketCountAction } from "../redux/actions/myTicketCountAction";
import { buyTicketAction } from "../redux/actions/buyTicketAction";
import { OneTimerM1, OneTimerM2 } from "../components/";
import Swal from 'sweetalert2'

const Mode1BuyPage = () => {
  const dispatch = useDispatch();
  const epoch = useSelector((state) => state.epochM1.epoch);
  const epochM2 = useSelector((state) => state.epochM2.epochM2);
  const ownedMyTicket = useSelector((state) => state.user.myTicketAmount);
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);
  const availavble = 20 - ownedMyTicket;
  const [amount, setAmount] = useState("");
  const payKlay = amount * 5;

  const navigate = useNavigate();

  const displayAmount = (e) => {
    setAmount(e.target.value);
  };

  const maxBuy = () => {
    setAmount(availavble);
  };
  useEffect(() => {
    dispatch(epochAction.epochAct());
    dispatch(epochM2Action.epochM2Act());
    dispatch(myTicketCountAction.myTicketCountAct(account, epoch));
  }, [account, epoch, epochM2]);

  const buyTicketM1 = () => {
    availavble < amount
      ? 
      Swal.fire({
        title: "Exceeded the allowable number.",
        icon:"error",
        confirmButtonText: "OK"
      })
      : dispatch(buyTicketAction.buyTicketAct(amount));
  };

  return (
    <div className="mode1BuyPageContainer">
      <div className="mode1BuyTopLine">
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
      <div className="mode1BuyPageSection">
        <div className="mode1buypagetitle">
          <p>MODE #1</p>
        </div>
        <div className="mode1buypagetext">
          <p>
            Mode#1 game Information.
            <br />
            Design comment
          </p>
        </div>
        <div className="mode1SelectSection">
          <div
            className="mode1buySection"
            onClick={() => navigate("/mode1buy")}
          >
            <p>Buy</p>
          </div>
          <div
            className="mode1mypageSection"
            onClick={() => navigate("/mode1my")}
          >
            <p>My Page</p>
          </div>
        </div>
        <div className="mode1buyroundpaddingsection"></div>
        <div className="mode1buyroundContainer">
          <p>{epoch}th Round</p>
        </div>
        <div className="mode1buyavailableSection">
          <span className="mode1available1">Available</span>
          <span className="mode1available2">{availavble}</span>
        </div>
        <div className="mode1userselectSection">
          <input
            type="number"
            placeholder="Amount"
            onChange={displayAmount}
            className="mode1availInput"
            value={amount}
          />
          <div className="mode1usermaxSection" onClick={maxBuy}>
            <p>MAX</p>
          </div>
        </div>
        <div className="mode1useramountpaddingsection"></div>
        <div className="mode1priceamountsection">
          <p>Amount</p>
        </div>
        <div className="mode1klaytnamountsection">
          <img src={klaytn}></img>
          {payKlay} Klay
        </div>
        <div className="mode1buysection">
          <div className="mode1buybutton" onClick={buyTicketM1}>
            Buy Ticket
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mode1BuyPage;

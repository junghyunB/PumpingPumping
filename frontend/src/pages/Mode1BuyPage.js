import React, { useEffect, useState } from "react";
import "./Mode1BuyPage.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { mode1ticket } from "../assets/images";
import { epochAction } from "../redux/actions/epochAction";
import { epochM2Action } from "../redux/actions/epochM2Action";
import { myTicketCountAction } from "../redux/actions/myTicketCountAction";
import { buyTicketAction } from "../redux/actions/buyTicketAction";

const Mode1BuyPage = () => {
  const dispatch = useDispatch();
  const epoch = useSelector(state => state.epochM1.epoch);
  const epochM2 = useSelector(state => state.epochM2.epochM2);
  const ownedMyTicket = useSelector(state => state.user.myTicketAmount)
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);
  const availavble = 20 - ownedMyTicket;
  const [amount, setAmount] = useState(0);
  const payKlay = amount * 5;


  const displayAmount = (e) => {
    setAmount(e.target.value)
  }

  const maxBuy = () => {
    setAmount(availavble);
  }

  useEffect(() => {
    dispatch(epochAction.epochAct());
    dispatch(epochM2Action.epochM2Act());
    dispatch(myTicketCountAction.myTicketCountAct(account, epoch));
  }, [account, epoch, epochM2])

  const buyTicketM1 = () => {
    availavble < amount ? alert("허용 갯수보다 많습니다.") : 
    dispatch(buyTicketAction.buyTicketAct(amount));
  }



  return (
    <div className="mode1BuyPageContainer">
      <div className="mode1BuyPageSection">
        <Card className="mod1BuyPageSection1">
          <div className="buymypageselect">
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
          <div className="ticketPictureSection">
            <img src={mode1ticket} className="mode1ticket"></img>
            <h2>{epoch}회차 Mode#1</h2>
          </div>
          <div className="ownedTicketAmountSection">
            <h4>Available : {availavble} </h4>
          </div>
          <div className="ticketAmountSection">
            <input type="number" onChange={displayAmount} value={amount}/>
            <Button onClick={maxBuy} className="maxbuttonposition" variant="outline-dark">MAX</Button>
          </div>
          <div className="totalTicketPriceSection"><h4>Amount : {payKlay} Klay</h4></div>
          <div className="buyTicketButtonSection"><Button onClick={buyTicketM1} variant="outline-dark">BuyTicket</Button></div>
        </Card>
      </div>
    </div>
  );
};

export default Mode1BuyPage;

import React, { useEffect } from "react";
import "./Mode2BuyPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { epochAction } from "../redux/actions/epochAction";
import { epochM2Action } from "../redux/actions/epochM2Action";
import {
  raffle_ball1,
  raffle_ball2,
  raffle_ball3,
  raffle_ball4,
  raffle_ball5,
  smallball1,
  smallball2,
  smallball3,
  smallball4,
  smallball5,
  klaytn,
} from "../assets/images";
import { OneTimerM1, OneTimerM2 } from "../components";

const Mode2BuyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const epoch = useSelector((state) => state.epochM1.epoch);
  const epochM2 = useSelector((state) => state.epochM2.epochM2);
  useEffect(() => {
    dispatch(epochAction.epochAct());
    dispatch(epochM2Action.epochM2Act());
  }, [epoch, epochM2]);

  return (
    <div className="mode2BuyPageContainer">
      <div className="mode2BuyTopLine">
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
      <div className="mode2BuyPageSection">
        <div className="mode2buypagetitle">
          <p>MODE #2</p>
        </div>
        <div className="mode2buypagetext">
          <p>
            This is an event to guess the winning number.
            <br />
            Select a number between 1 and 250.
          </p>
        </div>
        <div className="mode2SelectSection">
          <div
            className="mode2buySection"
            onClick={() => navigate("/mode2buy")}
          >
            <p>Buy</p>
          </div>
          <div
            className="mode2mypageSection"
            onClick={() => navigate("/mode2my")}
          >
            <p>My Page</p>
          </div>
        </div>
        <div className="mode2SelectTicketContainer">
          <div
            className="firstmode2SelectTicketSection"
            onClick={() => navigate("/mode2buy/ticket1")}
          >
            <img src={raffle_ball1}></img>
            <div className="mode2joinTitle">Ball#1</div>
            <div className="mode2joinNumber">
              <img src={smallball1}></img>1~50
            </div>
            <div className="mode2joinPrice">
              <img src={klaytn}></img>6 Klay
            </div>
          </div>
          <div
            className="mode2SelectTicketSection"
            onClick={() => navigate("/mode2buy/ticket2")}
          >
            <img src={raffle_ball2}></img>
            <div className="mode2joinTitle">Ball#2</div>
            <div className="mode2joinNumber">
              <img src={smallball2}></img>51~100
            </div>
            <div className="mode2joinPrice">
              <img src={klaytn}></img>9 Klay
            </div>
          </div>
          <div
            className="mode2SelectTicketSection"
            onClick={() => navigate("/mode2buy/ticket3")}
          >
            <img src={raffle_ball3}></img>
            <div className="mode2joinTitle">Ball#3</div>
            <div className="mode2joinNumber">
              <img src={smallball3}></img>101~150
            </div>
            <div className="mode2joinPrice">
              <img src={klaytn}></img>12 Klay
            </div>
          </div>
          <div
            className="mode2SelectTicketSection"
            onClick={() => navigate("/mode2buy/ticket4")}
          >
            <img src={raffle_ball4}></img>
            <div className="mode2joinTitle">Ball#4</div>
            <div className="mode2joinNumber">
              <img src={smallball4}></img>151~200
            </div>
            <div className="mode2joinPrice">
              <img src={klaytn}></img>15 Klay
            </div>
          </div>
          <div
            className="mode2SelectTicketSection"
            onClick={() => navigate("/mode2buy/ticket5")}
          >
            <img src={raffle_ball5}></img>
            <div className="mode2joinTitle">Ball#5</div>
            <div className="mode2joinNumber">
              <img src={smallball5}></img>201~250
            </div>
            <div className="mode2joinPrice">
              <img src={klaytn}></img>18 Klay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mode2BuyPage;

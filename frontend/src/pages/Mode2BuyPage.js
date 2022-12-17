import React, { useEffect, useState } from 'react'
import "./Mode2BuyPage.css";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { epochAction } from "../redux/actions/epochAction";
import { epochM2Action } from "../redux/actions/epochM2Action";
import { raffle_ball1, raffle_ball2} from '../assets/images';
import { OneTimerM1, OneTimerM2 } from '../components';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Mode2BuyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const epoch = useSelector(state => state.epochM1.epoch);
  const epochM2 = useSelector(state => state.epochM2.epochM2);
  useEffect(() => {
    dispatch(epochAction.epochAct());
    dispatch(epochM2Action.epochM2Act());
  }, [epoch, epochM2])

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
        <div className='mode2SelectTicketContainer'>
          <div className='firstmode2SelectTicketSection' onClick={() => navigate("/mode2buy/ticket1")}>
          </div>
          <div className='mode2SelectTicketSection' onClick={() => navigate("/mode2buy/ticket2")}></div>
          <div className='mode2SelectTicketSection' onClick={() => navigate("/mode2buy/ticket3")}></div>
          <div className='mode2SelectTicketSection' onClick={() => navigate("/mode2buy/ticket4")}></div>
          <div className='mode2SelectTicketSection' onClick={() => navigate("/mode2buy/ticket5")}></div>
        </div>
        </div>
    </div>
  );
};

export default Mode2BuyPage;

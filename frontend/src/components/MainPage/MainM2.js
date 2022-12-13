import React, {useState, useEffect}from 'react'
import './MainM2.css'
import {useSelector, useDispatch} from "react-redux";
import { TimerM2 } from "../"
import { epochM2Action } from '../../redux/actions/epochM2Action';
import { winningNumberM2Action } from '../../redux/actions/winningNumberM2Action';
import { winningTicketIdM2Action } from '../../redux/actions/winningTicketIdM2Action';
import { totalAmountM2Action } from '../../redux/actions/totalAmountM2Action';
import { leftarrow, rightarrow, klaytn, mode2ball, trophy } from "../../assets/images";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'



const MainM2 = () => {
    const dispatch = useDispatch();

    let currentEpochM2 = useSelector(state => parseInt(state.epochM2.epochM2));
    let [changeEpochM2, setChangeEpochM2] = useState(currentEpochM2);
    const winningNumberM2 = useSelector(state => state.ticketM2.winningNumberM2);
    const winningTicketIdM2 = useSelector(state => state.ticketM2.winningTicketIdM2);
    const totalAmountM2 = useSelector(state => state.ticketM2.totalAmountM2);

    const setData = () => {
        setChangeEpochM2(currentEpochM2);
    }

    const addEpoch = () => {
        if(changeEpochM2 === currentEpochM2) {
          Swal.fire({
            title: "Last Round!",
            icon:"error",
            confirmButtonText: "OK",
          })
    } else if(changeEpochM2 < currentEpochM2){
        setChangeEpochM2(changeEpochM2 + 1);
    }
      };
    
      const subEpoch = () => {
        if(changeEpochM2 === 1) {
          Swal.fire({
            title: "First Round",
            icon:"error",
            confirmButtonText: "OK",
          })
        } else {
            setChangeEpochM2(changeEpochM2 - 1);
        }
      };

      useEffect(() => {
        dispatch(epochM2Action.epochM2Act());
        setData()
    }, [currentEpochM2]);

    useEffect(() => {
        dispatch(winningNumberM2Action.winningNumberM2Act(changeEpochM2));
        dispatch(winningTicketIdM2Action.winningTicketIdM2Act(changeEpochM2));
        dispatch(totalAmountM2Action.totalAmountM2Act(changeEpochM2));
      }, [changeEpochM2])


  return (
      <div className='mainPageRightContainer'>
        <div className='timerSaction'>
          <div className='mode2Timer'>
            <TimerM2 />
          </div>
        </div>
              <div className="mode2maintitle">
        <p>MODE #2</p>
      </div>
      <div className="mode2maintext">
        <p>
        This is an event to guess the winning number.
        <br />
        Select a number between 1 and 250.
        </p>
      </div>
      <div className="mode2mainround">
        <div className="mode2mainbtn1" onClick={subEpoch}>
          <img src={leftarrow}></img>
        </div>
        <div className="mode2mainroundsection">
          <div className="mode2mainroundsection1">
            <p>{changeEpochM2}th ROUND</p>
          </div>
          <div className="mode2mainroundsection2">
          {winningNumberM2 === "0" ? 
          <p>Proceeding...</p> : 
          (
            <>
            <div className='mode2winningBallTitle'>
              <img src={trophy}></img><p>Winning Ball</p>
            </div>
            <div className='mode2BallData'>
              <img src={mode2ball}></img>
              <div className='mode2MainWinningNumber'>
          <p>#{winningNumberM2}</p>
          </div>
          <div className='mode2MainWinningData'>
          <p>{changeEpochM2}, {winningTicketIdM2}</p>
          </div>
            </div>
            </>
          )}
          </div>
        </div>
        <div className="mode2mainbtn2" onClick={addEpoch}>
          <img src={rightarrow}></img>
        </div>
      </div>
      <div className="mode2reaminSection"></div>
      <div className="mode1mainprize">
        <div className="mode1mainprizetitle">
          <p>Total Prize</p>
        </div>
        <div className="mode1mainprizeklaytn">
          <img src={klaytn}></img>
          <p>{totalAmountM2} klay</p>
        </div>
      </div>
      <Link to="/mode2buy" style={{ textDecoration: "none" }}>
        <div className="mode2mainBtn">
          <Button>Buy Ticket</Button>
        </div>
      </Link>
      </div>
  )
}

export default MainM2
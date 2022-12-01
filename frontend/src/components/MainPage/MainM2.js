import React, {useState, useEffect}from 'react'
import './MainM2.css'
import {useSelector, useDispatch} from "react-redux";
import { epochM2Action } from '../../redux/actions/epochM2Action';
import { winningNumberM2Action } from '../../redux/actions/winningNumberM2Action';
import { winningTicketIdM2Action } from '../../redux/actions/winningTicketIdM2Action';
import { totalAmountM2Action } from '../../redux/actions/totalAmountM2Action';
import { leftarrow, rightarrow, klaytn } from "../../assets/images";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


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
        alert("Last Round.");
    } else if(changeEpochM2 < currentEpochM2){
        setChangeEpochM2(changeEpochM2 + 1);
    }
      };
    
      const subEpoch = () => {
        if(changeEpochM2 === 1) {
          alert("First Round.");
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
              <div className="mode2maintitle">
        <p>MODE #2</p>
      </div>
      <div className="mode2maintext">
        <p>
          Mode#2 game Information.
          <br />
          Design comment
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
          {<p>{winningNumberM2 === "0" ? "Proceeding..." : (<a># {winningNumberM2} [{changeEpochM2}, {winningTicketIdM2}]</a>)}</p>}
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
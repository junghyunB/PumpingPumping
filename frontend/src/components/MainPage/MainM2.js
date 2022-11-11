import React, {useState, useEffect}from 'react'
import './MainM2.css'
import {BiLeftArrow} from "react-icons/bi";
import {BiRightArrow} from "react-icons/bi";
import {useSelector, useDispatch} from "react-redux";
import { epochM2Action } from '../../redux/actions/epochM2Action';
import { winningNumberM2Action } from '../../redux/actions/winningNumberM2Action';
import { winningTicketIdM2Action } from '../../redux/actions/winningTicketIdM2Action';
import { totalAmountM2Action } from '../../redux/actions/totalAmountM2Action';
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
        alert("마지막 회차 입니다");
    } else if(changeEpochM2 < currentEpochM2){
        setChangeEpochM2(changeEpochM2 + 1);
    }
      };
    
      const subEpoch = () => {
        if(changeEpochM2 === 1) {
          alert("첫번째 회차 입니다");
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
    <div className='mainPageRightSection'>
    <div className='mainPageRightSection1'>
        <div className='mainPageRightSectionTitle'> 
            <p>Mode#2</p>
            <hr/>
        </div>
        <div className='mainPageRightInfoSection'>
            <div className='mainPageRightSectionSilder'>
                <button className='rightSectionLeftBtn' onClick={subEpoch}><BiLeftArrow size={30}/></button>
                <button className='rightSectionRightBtn' onClick={addEpoch}><BiRightArrow size={30}/></button>
                <p>{changeEpochM2} 회차 당첨 번호</p>
                <p>{winningNumberM2 === "0" ? "Proceeding..." : (<a># {winningNumberM2} [{changeEpochM2}, {winningTicketIdM2}]</a>)}</p>
                <br></br>
                <br></br>

            </div>
            <div className='mainPageRightPrizedSection'>
                <table>
                    <tr className='tableTitle'>
                        <td>Total Prized</td>
                    </tr>
                    <tr className='tableInfo'> 
                        <td>{totalAmountM2} Klay</td>
                    </tr>
                </table>
            </div>
            <Link to="/mode2buy" style={{ textDecoration: "none" }}>
            <div className='rightBuyBtn'>
            <Button variant="outline-dark">BuyTicket</Button>
            </div>
            </Link>
        </div>
    </div>

</div>
  )
}

export default MainM2
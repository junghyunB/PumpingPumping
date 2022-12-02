import React, { useEffect } from 'react'
import './DashBoard.css'
import { DashBoardM1, DashBoardM2 } from '../components'
import { useSelector, useDispatch } from "react-redux";
import { epochAction } from "../redux/actions/epochAction";
import { epochM2Action } from "../redux/actions/epochM2Action";


const DashBoard = () => {
  const dispatch = useDispatch();

  const epoch = useSelector(state => state.epochM1.epoch);
  const epochM2 = useSelector(state => state.epochM2.epochM2);
  useEffect(() => {
    dispatch(epochAction.epochAct());
    dispatch(epochM2Action.epochM2Act());
  }, [epoch, epochM2])

  return (
    <div className='dashBoardPageContainer'>
        <DashBoardM1 />
        <DashBoardM2 />
    </div>
  )
}

export default DashBoard
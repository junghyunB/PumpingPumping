import React, { useEffect } from 'react'
import "./Mode2BuyPage.css";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { epochAction } from "../redux/actions/epochAction";
import { epochM2Action } from "../redux/actions/epochM2Action";

const Mode2BuyPage = () => {
  const dispatch = useDispatch();

  const epoch = useSelector(state => state.epochM1.epoch);
  const epochM2 = useSelector(state => state.epochM2.epochM2);
  useEffect(() => {
    dispatch(epochAction.epochAct());
    dispatch(epochM2Action.epochM2Act());
  }, [epoch, epochM2])

  return (
    <div className="mode2BuyPageContainer">
      <div className='mode2BuySection'></div>
    </div>
  );
};

export default Mode2BuyPage;

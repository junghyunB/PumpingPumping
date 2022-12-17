import React, { useEffect } from "react";
import "./ChoiceMode.css";
import { useSelector, useDispatch } from "react-redux";
import { mode1main, mode2main } from "../assets/images";
import { Link } from "react-router-dom";
import { epochAction } from "../redux/actions/epochAction";
import { epochM2Action } from "../redux/actions/epochM2Action";

const ChoiceMode = () => {
  const dispatch = useDispatch();

  const epoch = useSelector((state) => state.epochM1.epoch);
  const epochM2 = useSelector((state) => state.epochM2.epochM2);
  useEffect(() => {
    dispatch(epochAction.epochAct());
    dispatch(epochM2Action.epochM2Act());
  }, [epoch, epochM2]);

  return (
    <div className="choicePageContainer">
      <div className="choicePageLeftSection">
        <Link
          to="/mode1buy"
          style={{ textDecoration: "none" }}
          className="link-Mode"
        >
          <div className="choicePageLeftSection1">
            <img className="choiceImageLeftSection" src={mode1main}></img>
            <h1 className="choiceImageLeftSectionText">Mode#1</h1>
          </div>
        </Link>
      </div>
      <div className="choicePageRightSection">
        <Link
          to="/mode2buy"
          style={{ textDecoration: "none" }}
          className="link-Mode"
        >
          <div className="choicePageRightSection1">
            <img className="choiceImageRightSection" src={mode2main}></img>
            <h1 className="choiceImageRightSectionText">Mode#2</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChoiceMode;

import React from "react";
import "./ChoiceMode.css";
import { mode1main, mode2main } from "../assets/images";
import { Link } from "react-router-dom";
const ChoiceMode = () => {
  return (
    <div className="choicePageContainer">
      <div className="choicePageLeftSection">
        <Link to="/mode1buy" style={{ textDecoration: "none" }} className="link-Mode">
        <div className="choicePageLeftSection1">
      <img className="choiceImageLeftSection" src={mode1main}></img>
        <h1 className="choiceImageLeftSectionText">Mode#1</h1>
        </div>
        </Link>
      </div>
      <div className="choicePageRightSection">
      <Link to="/mode2buy" style={{ textDecoration: "none" }} className="link-Mode">
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

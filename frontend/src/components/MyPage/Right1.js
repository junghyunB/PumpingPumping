import React from "react";
import "./Right1.css";
import { useDispatch, useSelector } from "react-redux";
import { mode1ticket } from "../../assets/images";
const Right1 = () => {
  const dispatch = useDispatch();
  const ticketData = useSelector((state) => state.userM2.myTicketDetailM2);

  const closeDetail = () => {
    dispatch({ type: "CLOSE_DETAIL" });
  };
  return (
    <div className="mode2MyContents-detail">
      <div className="closeSection">
        <div onClick={closeDetail} className="closeButton">
          Close
        </div>
      </div>
      <div className="ticketDetailSection">
        <div className="img-Section">
        <img src={mode1ticket} alt="ticket"></img>
        </div>
        <div className="TicketNumberSection"><p>#{ticketData[0]}</p></div>
      </div>
      <div className="ticketIdSection">
        <div><h3>Mode#2 [{ticketData[1]}, {ticketData[2]}]</h3></div>
      </div>
    </div>
  );
};

export default Right1;

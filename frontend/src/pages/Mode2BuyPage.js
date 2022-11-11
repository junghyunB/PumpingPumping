import React from "react";
import "./Mode2BuyPage.css";
import Button from "react-bootstrap/Button";
import { mode2main } from "../assets/images";
import { Link } from "react-router-dom";

const Mode2BuyPage = () => {
  return (
    <div className="mode2BuyPageContainer">
      <div className="mode2BuyPageSection">
        <div className="mode2selectSection">
          <Link to="/mode2buy" className="z-indexZone">
            <Button variant="outline-dark">BuyTicket</Button>
          </Link>
          <Link to="/" className="z-indexZone">
            <Button variant="outline-dark">MyPage</Button>
          </Link>
        </div>
        <div className="mode2selectTicketSection1">
          <div className="TicketSection1">
            <Link to="/mode2buy/ticket1" className="z-indexZone">
              <div className="Ticket1">
                <div className="imageSection">
                  <img alt="mode2!" className="imgSize" src={mode2main}></img>
                </div>
                <div className="textSection">
                  <p className="ticketText">Ticket#1</p>
                  <p>(6 klay)</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="TicketSection2">
            <Link to="/mode2buy/ticket2" className="z-indexZone">
              <div className="Ticket2">
                <div className="imageSection">
                  <img alt="mode2!" className="imgSize" src={mode2main}></img>
                </div>
                <div className="textSection">
                  <p className="ticketText">Ticket#2</p>
                  <p>(9 klay)</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="TicketSection3">
            <Link to="/mode2buy/ticket3" className="z-indexZone">
              <div className="Ticket3">
                <div className="imageSection">
                  <img alt="mode2!" className="imgSize" src={mode2main}></img>
                </div>
                <div className="textSection">
                  <p className="ticketText">Ticket#3</p>
                  <p>(12 klay)</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="mode2selectTicketSection2">
          <div className="TicketSection4">
            <div className="ticketSection4-1"></div>
            <div className="ticketSection4-2">
              <Link to="/mode2buy/ticket4" className="z-indexZone">
                <div className="Ticket4">
                  <div className="imageSection">
                    <img alt="mode2!" className="imgSize" src={mode2main}></img>
                  </div>
                  <div className="textSection">
                    <p className="ticketText">Ticket#4</p>
                    <p>(15 klay)</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="TicketSection5">
            <div className="ticketSection5-1">
              <Link to="/mode2buy/ticket5" className="z-indexZone">
                <div className="Ticket5">
                  <div className="imageSection">
                    <img alt="mode2!" className="imgSize" src={mode2main}></img>
                  </div>
                  <div className="textSection">
                    <p className="ticketText">Ticket#5</p>
                    <p>(18 klay)</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="ticketSection5-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mode2BuyPage;

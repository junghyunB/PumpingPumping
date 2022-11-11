import React from "react";
import "./Mode2DetailPage.css";
import { useParams } from "react-router-dom";
import { mode1ticket } from "../assets/images";
import {BiLeftArrow} from "react-icons/bi";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Mode2DetailPage = () => {
  const { id } = useParams();
  let section1 = [];
  let section2 = [];
  let section3 = [];
  let section4 = [];
  let section5 = [];
 
    for (let i = 1; i < 51; i++) {
      if (i < 11){
        section1.push(
          <div className="ticketSmallSection">
            <button>
              <img alt="ticket" className="ticketSize" src={mode1ticket}></img>
              <div className="imgText">#{i + (id - 1) * 50}</div>
            </button>
          </div>
        );
      } else if (i < 21) {
        section2.push(
          <div className="ticketSmallSection">
            <button>
              <img alt="ticket" className="ticketSize" src={mode1ticket}></img>
              <div className="imgText">#{i + (id - 1) * 50}</div>
            </button>
          </div>
        );
      } else if (i < 31) {
        section3.push(
          <div className="ticketSmallSection">
            <button>
              <img alt="ticket" className="ticketSize" src={mode1ticket}></img>
              <div className="imgText">#{i + (id - 1) * 50}</div>
            </button>
          </div>
        );
      } else if(i < 41) {
        section4.push(
          <div className="ticketSmallSection">
            <button>
              <img alt="ticket" className="ticketSize" src={mode1ticket}></img>
              <div className="imgText">#{i + (id - 1) * 50}</div>
            </button>
          </div>
        );
      } else if(i < 51) {
        section5.push(
          <div className="ticketSmallSection">
            <button>
              <img alt="ticket" className="ticketSize" src={mode1ticket}></img>
              <div className="imgText">#{i + (id - 1) * 50}</div>
            </button>
          </div>
        );
      }
    }



  return (
    <div className="mode2BuyDetailContainer">
      <div className="mode2BuyDetailSection">
        <div className="mode2selectSection">
          <div className="chooseNumberSection">
            <Link to="/mode2buy" className="BackPage"><BiLeftArrow size={33} /></Link>
            <h2>Choose Number : </h2>
          </div>
          <div className="availableSection">
            <div className="availableSection1">
              <h2>Available : </h2>
            </div>
            <div className="amountSection">
              <h2>Amount : </h2>
            </div>
          </div>
        </div>
        <div className="choiceSection">
          <div className="ticketSection">
            <div className="ticketContainer1">{section1.map((item) => (
              item
            ))}</div>
            <div className="ticketContainer1">
            {section2.map((item) => (
              item
            ))}
            </div>
            <div className="ticketContainer1">
            {section3.map((item) => (
              item
            ))}
            </div>
            <div className="ticketContainer1">
            {section4.map((item) => (
              item
            ))}
            </div>
            <div className="ticketContainer1">
            {section5.map((item) => (
              item
            ))}
            </div>
          </div>
          <div className="buyButtonSection">
            <Button variant="outline-dark">Buy Ticket</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mode2DetailPage;

import React, { useState, useEffect } from "react";
import "./Mode2DetailPage.css";
import { useParams } from "react-router-dom";
import { mode1ticket } from "../assets/images";
import { BiLeftArrow } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { myTicketCountM2Action } from "../redux/actions/myTicketCountM2Action";
import { epochM2Action } from "../redux/actions/epochM2Action";
import { buyTicketM2Action } from "../redux/actions/buyTicketM2Action";
import { epochAction } from "../redux/actions/epochAction";
import Swal from 'sweetalert2';


const Mode2DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectTicket, setSelectTicket] = useState([]);
  const [transTicket, setTransTicket] = useState([]);
  const epochM1 = useSelector((state) => state.epochM1.epoch);
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);
  const epoch = useSelector((state) => state.epochM2.epochM2);
  const myTicketCountM2 = useSelector((state) => state.userM2.myTicketCountM2);
  const remainBuyTicket = 10 - myTicketCountM2;
  const Ticket1 = 6;
  const amount =
    id === "1"
      ? transTicket.length * Ticket1
      : transTicket.length * (parseInt(id) + 1) * 3;

  const choiceTicket = (num) => {
    if (
      transTicket.length < remainBuyTicket &&
      selectTicket.includes(num) === false &&
      selectTicket.includes(", " + num) === false
    ) {
      setSelectTicket(
        selectTicket.length === 0
          ? (selectTicket) => [...selectTicket, num]
          : (selectTicket) => [...selectTicket, ", ", num]
      );
      setTransTicket((transTicket) => [...transTicket, num]);
    } else if (
      transTicket.length <= remainBuyTicket &&
      selectTicket.includes(num)
    ) {
      const numIndex = selectTicket.indexOf(num);
      if (numIndex === 0) {
        const removeItem = selectTicket.splice(0, 2);
        setSelectTicket(
          selectTicket.filter((element) => element !== removeItem)
        );
        setTransTicket(transTicket.filter((element) => element !== num));
      } else {
        const removeItem = [...selectTicket.splice(numIndex - 1, 2)];
        setSelectTicket(
          selectTicket.filter((element) => element !== removeItem)
        );
        setTransTicket(transTicket.filter((element) => element !== num));
      }
    } else if (
      selectTicket.includes(num) === false &&
      transTicket.length === remainBuyTicket
    ) {
      Swal.fire({
        title: `In Mode 2, you can only hold up to 10 tickets at a time.`,
        icon:"error",
        confirmButtonText: "OK",
      })
    }
  };

  let section1 = [];
  let section2 = [];
  let section3 = [];
  let section4 = [];
  let section5 = [];

  for (let i = 1; i < 51; i++) {
    if (i < 11) {
      section1.push(
        <div className="ticketSmallSection">
          <button
            onClick={() => {
              choiceTicket(i + (id - 1) * 50);
            }}
          >
            <img alt="ticket" className="ticketSize" src={mode1ticket}></img>
            <div className="imgText">#{i + (id - 1) * 50}</div>
          </button>
        </div>
      );
    } else if (i < 21) {
      section2.push(
        <div className="ticketSmallSection">
          <button
            onClick={() => {
              choiceTicket(i + (id - 1) * 50);
            }}
          >
            <img alt="ticket" className="ticketSize" src={mode1ticket}></img>
            <div className="imgText">#{i + (id - 1) * 50}</div>
          </button>
        </div>
      );
    } else if (i < 31) {
      section3.push(
        <div className="ticketSmallSection">
          <button
            onClick={() => {
              choiceTicket(i + (id - 1) * 50);
            }}
          >
            <img alt="ticket" className="ticketSize" src={mode1ticket}></img>
            <div className="imgText">#{i + (id - 1) * 50}</div>
          </button>
        </div>
      );
    } else if (i < 41) {
      section4.push(
        <div className="ticketSmallSection">
          <button
            onClick={() => {
              choiceTicket(i + (id - 1) * 50);
            }}
          >
            <img alt="ticket" className="ticketSize" src={mode1ticket}></img>
            <div className="imgText">#{i + (id - 1) * 50}</div>
          </button>
        </div>
      );
    } else if (i < 51) {
      section5.push(
        <div className="ticketSmallSection">
          <button
            onClick={() => {
              choiceTicket(i + (id - 1) * 50);
            }}
          >
            <img alt="ticket" className="ticketSize" src={mode1ticket}></img>
            <div className="imgText">#{i + (id - 1) * 50}</div>
          </button>
        </div>
      );
    }
  }

  const buyTicketM2 = () => {
    remainBuyTicket < transTicket.length
      ? 
      Swal.fire({
        title: `Exceeded the allowable number.`,
        icon:"error",
        confirmButtonText: "OK",
      })
      : dispatch(buyTicketM2Action.buyTicketM2Act(amount, id, transTicket));
  };

  useEffect(() => {
    dispatch(epochM2Action.epochM2Act());
    dispatch(myTicketCountM2Action.myTicketCountM2Act(account, epoch));
    dispatch(epochAction.epochAct());
  }, [account, epoch, epochM1]);

  return (
    <div className="mode2BuyDetailContainer">
      <div className="mode2BuyDetailSection">
        <div className="mode2selectSection">
          <div className="chooseNumberSection">
            <Link to="/mode2buy" className="BackPage">
              <BiLeftArrow size={40} />
            </Link>
            <p>Choose Number : {selectTicket} </p>
          </div>
          <div className="availableSection">
            <div className="availableSection1">
              <h3>Available : {remainBuyTicket} EA</h3>
            </div>
            <div className="amountSection">
              <h3>Amount : {amount} KLAY</h3>
            </div>
          </div>
        </div>
        <div className="choiceSection">
          <div className="ticketSection">
            <div className="ticketContainer1">
              {section1?.map((item) => item)}
            </div>
            <div className="ticketContainer1">
              {section2?.map((item) => item)}
            </div>
            <div className="ticketContainer1">
              {section3?.map((item) => item)}
            </div>
            <div className="ticketContainer1">
              {section4?.map((item) => item)}
            </div>
            <div className="ticketContainer1">
              {section5?.map((item) => item)}
            </div>
          </div>
          <div className="buyButtonSection">
            <Button variant="outline-dark" onClick={buyTicketM2}>
              Buy Ticket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mode2DetailPage;

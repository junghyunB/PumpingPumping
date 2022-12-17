import React, { useState, useEffect } from "react";
import "./Mode2DetailPage.css";
import { useParams, useNavigate} from "react-router-dom";
import { ball_blue, ball_green, ball_orange, ball_pink, ball_purple, rightarrow } from "../assets/images";
import { useSelector, useDispatch } from "react-redux";
import { myTicketCountM2Action } from "../redux/actions/myTicketCountM2Action";
import { epochM2Action } from "../redux/actions/epochM2Action";
import { buyTicketM2Action } from "../redux/actions/buyTicketM2Action";
import { epochAction } from "../redux/actions/epochAction";
import Swal from 'sweetalert2';


const Mode2DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectTicket, setSelectTicket] = useState([]);
  const [transTicket, setTransTicket] = useState([]);
  const [imgSelectTicket, setImgSelectTicket] = useState([]);
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
          ? (selectTicket) => [...selectTicket,"#", num]
          : (selectTicket) => [...selectTicket, "/", "#", num]
      );
      setImgSelectTicket((imgSelectTicket) => [imgSelectTicket, num % 50 < 11 && num % 50 > 0 ?  <div className="mode2SelectImg"><div className="mode2SelectText">#{num}</div><img src={ball_orange}></img></div> : 
    num % 50 < 21 && num % 50 > 10 ? <div className="mode2SelectImg"><div className="mode2SelectText">#{num}</div><img src={ball_blue}></img></div> : num % 50 < 31 && num % 50 > 20 ? <div className="mode2SelectImg"><div className="mode2SelectText">#{num}</div><img src={ball_purple}></img></div>
    : num % 50 < 41 && num % 50 > 30 ? <div className="mode2SelectImg"><div className="mode2SelectText">#{num}</div><img src={ball_pink}></img></div> : <div className="mode2SelectImg"><div className="mode2SelectText">#{num}</div><img src={ball_green}></img></div>
    ])
      setTransTicket((transTicket) => [...transTicket, num]);
    } else if (
      transTicket.length <= remainBuyTicket &&
      selectTicket.includes(num)
    ) {
      const numIndex = selectTicket.indexOf(num);
      if (numIndex === 1) {
        const removeItem = selectTicket.splice(0, 3);
        setSelectTicket(
          selectTicket.filter((element) => element !== removeItem)
        );
        setTransTicket(transTicket.filter((element) => element !== num));

      } else {
        const removeItem = [...selectTicket.splice(numIndex - 2, 3)];
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
  console.log(imgSelectTicket)
  let chooseBall = [];

  for (let i = 1; i < 51; i++) {
    if (i < 11) {
      chooseBall.push(
        <div className="mode2BallWrap" key={i} onClick={() => {
          choiceTicket(i + (id - 1) * 50);
        }}>
          <div className="mode2BallNumText">
            <p>#{i + (id - 1) * 50}</p>
            </div>
          <img src={ball_orange}></img>
          </div>
      );
    } else if (i < 21) {
      chooseBall.push(
        <div className="mode2BallWrap" key={i} onClick={() => {
          choiceTicket(i + (id - 1) * 50);
        }}>
          <div className="mode2BallNumText">
            <p>#{i + (id - 1) * 50}</p>
            </div>
          <img src={ball_blue}></img>
          </div>
      );
    } else if (i < 31) {
      chooseBall.push(
        <div className="mode2BallWrap" key={i} onClick={() => {
          choiceTicket(i + (id - 1) * 50);
        }}>
          <div className="mode2BallNumText">
            <p>#{i + (id - 1) * 50}</p>
            </div>
          <img src={ball_purple}></img>
          </div>
      );
    } else if (i < 41) {
      chooseBall.push(
        <div className="mode2BallWrap" key={i} onClick={() => {
          choiceTicket(i + (id - 1) * 50);
        }}>
          <div className="mode2BallNumText">
            <p>#{i + (id - 1) * 50}</p>
            </div>
          <img src={ball_pink}></img>
          </div>
      );
    } else if (i < 51) {
      chooseBall.push(
        <div className="mode2BallWrap" key={i} onClick={() => {
          choiceTicket(i + (id - 1) * 50);
        }}>
          <div className="mode2BallNumText">
            <p>#{i + (id - 1) * 50}</p>
            </div>
          <img src={ball_green}></img>
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
      <div className="mode2BuyDetailBg" onClick={() => navigate("/mode2buy")}></div>
      <div className="mode2BuyDetailSection1">
      <div className="mode2BuyDetailSection2">
          <div className="mode2BuyDetailTitle">
            <p>Ball#{id} Choose Number</p>
          </div>
          <div className="mode2BuyDetailButton">
            <div className="mode2BuyDetailClose" onClick={() => navigate("/mode2buy")}><p>Close</p></div>
            <div className="mode2BuyDetailBuy" onClick={buyTicketM2}><p>Buy Ball</p></div>
          </div>
          </div>
        <div className="mode2BuyDetailSection3">
          <div className="mode2buyDetailChooseBallContainer">
            <div className="mode2DetailData1">
              <div className="mode2ChooseNumSection"><p>Choose Number </p> &nbsp;&nbsp;<p className="ChooseNumFont">{selectTicket}</p></div>
              <div className="mode2ChooseNumCount"><p>select {transTicket.length} ball</p></div>
            </div>
            <div className="mode2DetailData2"><div className="mode2DetailrightArrowimage"><img src={rightarrow}></img></div>{imgSelectTicket.map((item) => item)}</div>
          </div>
          <div className="mode2buyDetailBallTrailer">
              {chooseBall.map((item) => item)}
              </div>
        </div>
      </div>
    </div>
  );
};

export default Mode2DetailPage;

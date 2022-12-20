import React, { useState, useEffect } from "react";
import "./Mode2MyPage.css";
import { useNavigate } from "react-router-dom";
import { ball_basic, klaytn, proceeding, result_false, result_success, rightarrow, leftarrow, trophy, ball_proceeding, mode2ball, ball_blue, ball_green, ball_orange, ball_pink, ball_purple, ball_false } from "../assets/images";
import { OneTimerM1, OneTimerM2 } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { epochM2Action } from "../redux/actions/epochM2Action";
import { epochAction } from "../redux/actions/epochAction";
import { myTicketInfoM2Action } from "../redux/actions/myTicketInfoM2Action";
import { totalAmountM2Action } from "../redux/actions/totalAmountM2Action";
import { totalTicketM2Action } from "../redux/actions/totalTicketM2Action";
import { winningNumberM2Action } from "../redux/actions/winningNumberM2Action";
import { winningTicketIdM2Action } from "../redux/actions/winningTicketIdM2Action";
import { isClaimedM2Action } from "../redux/actions/isClaimedM2Action";
import { claimRewardM2Action } from "../redux/actions/claimRewardM2Action";
import { myTicketCountM2Action } from "../redux/actions/myTicketCountM2Action";
import Swal from 'sweetalert2';


const Mode2MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const epochM1 = useSelector(state => state.epochM1.epoch);
  let currentEpochM2 = useSelector((state) => parseInt(state.epochM2.epochM2));
  const myTicketCountM2 = useSelector((state) => state.userM2.myTicketCountM2);
  const myTicketInfoM2 = useSelector((state) => state.userM2.myTicketInfoM2);
  const totalAmountM2 = useSelector((state) => state.ticketM2.totalAmountM2);
  const totalTicketAmountM2 = useSelector(
    (state) => state.ticketM2.totalTicketAmountM2
  );
  const winningNumberM2 = useSelector(
    (state) => state.ticketM2.winningNumberM2
  );
  const winningTicketIdM2 = useSelector(
    (state) => state.ticketM2.winningTicketIdM2
  );
  const isClaimedM2 = useSelector((state) => state.userM2.isClaimedM2);
  let [changeEpochM2, setChangeEpochM2] = useState(currentEpochM2);
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);
  const limitedTicketCount = 10;
  let TicketArr = [];

  const setData = () => {
    setChangeEpochM2(currentEpochM2);
  };

  const claimRewardM2 = () => {
    if (isClaimedM2 === "0") {
      Swal.fire({
        title: `Not the winner of ${changeEpochM2}round`,
        icon:"error",
        confirmButtonText: "OK",
      })
    } else if (isClaimedM2 === "1") {
      dispatch(claimRewardM2Action.claimRewardM2Act(changeEpochM2));
    } else if (isClaimedM2 === "2") {

      Swal.fire({
        title: `You have already received the reward for ${changeEpochM2}round`,
        icon:"error",
        confirmButtonText: "OK",
      })
    }
  };
  const mode2OwnTicket = () => {
  for (let i = 0; i < limitedTicketCount; i++) {
    if(i + 1 <= myTicketInfoM2[0].length) {
      if(myTicketInfoM2[0][i] % 50 > 0 && myTicketInfoM2[0][i] % 50 < 11) {
        TicketArr.push(
          <div className="mode2OwnBallEAImage" key={i}>
          <div className="mode2OwnBallText">#{myTicketInfoM2[0][i]} <br /> {changeEpochM2}, {myTicketInfoM2[1][i]}</div>
          {myTicketInfoM2[0][i] === winningNumberM2 && myTicketInfoM2[1][i] === winningTicketIdM2 ?
          <img src={mode2ball}></img>
          :
          <img src={ball_orange}></img>
        }
        </div>
        );
      } else if(myTicketInfoM2[0][i] % 50 > 10 && myTicketInfoM2[0][i] % 50 < 21) {
        TicketArr.push(
          <div className="mode2OwnBallEAImage" key={i}>
          <div className="mode2OwnBallText">#{myTicketInfoM2[0][i]} <br /> {changeEpochM2}, {myTicketInfoM2[1][i]}</div>
          {myTicketInfoM2[0][i] === winningNumberM2 && myTicketInfoM2[1][i] === winningTicketIdM2 ?
          <img src={mode2ball}></img>
          :
          <img src={ball_blue}></img>
        }
        </div>
        );
      } else if(myTicketInfoM2[0][i] % 50 > 20 && myTicketInfoM2[0][i] % 50 < 31) {
        TicketArr.push(
          <div className="mode2OwnBallEAImage" key={i}>
          <div className="mode2OwnBallText">#{myTicketInfoM2[0][i]} <br /> {changeEpochM2}, {myTicketInfoM2[1][i]}</div>
          {myTicketInfoM2[0][i] === winningNumberM2 && myTicketInfoM2[1][i] === winningTicketIdM2 ?
          <img src={mode2ball}></img>
          :
          <img src={ball_purple}></img>
        }
        </div>
        );
      } else if(myTicketInfoM2[0][i] % 50 > 30 && myTicketInfoM2[0][i] % 50 < 41) {
        TicketArr.push(
          <div className="mode2OwnBallEAImage" key={i}>
          <div className="mode2OwnBallText">#{myTicketInfoM2[0][i]} <br /> {changeEpochM2}, {myTicketInfoM2[1][i]}</div>
          {myTicketInfoM2[0][i] === winningNumberM2 && myTicketInfoM2[1][i] === winningTicketIdM2 ?
          <img src={mode2ball}></img>
          :
          <img src={ball_pink}></img>
        }
        </div>
        );
      } else {
        TicketArr.push(
          <div className="mode2OwnBallEAImage" key={i}>
          <div className="mode2OwnBallText">#{myTicketInfoM2[0][i]} <br /> {changeEpochM2}, {myTicketInfoM2[1][i]}</div>
          {myTicketInfoM2[0][i] === winningNumberM2 && myTicketInfoM2[1][i] === winningTicketIdM2 ?
          <img src={mode2ball}></img>
          :
          <img src={ball_green}></img>
        }
        </div>
        );
      }
    } else {
      TicketArr.push(
        <div className="mode2OwnBallEAImage" key={i}>
        <img src={ball_false}></img>
      </div>
      );
    }
  }
}

  const addEpoch = () => {
    if (changeEpochM2 === currentEpochM2) {
      Swal.fire({
        title: `Last Round`,
        icon:"error",
        confirmButtonText: "OK",
      })
    } else if (changeEpochM2 < currentEpochM2) {
      setChangeEpochM2(changeEpochM2 + 1);
    }
  };

  const subEpoch = () => {
    if (changeEpochM2 === 1) {
      Swal.fire({
        title: `First Round`,
        icon:"error",
        confirmButtonText: "OK",
      })
    } else {
      setChangeEpochM2(changeEpochM2 - 1);
    }
  };

  mode2OwnTicket();

  useEffect(() => {
    dispatch(epochM2Action.epochM2Act());
    dispatch(epochAction.epochAct());
    setData();
  }, [epochM1,currentEpochM2]);

  useEffect(() => {
    dispatch(myTicketInfoM2Action.myTicketInfoM2Act(account, changeEpochM2));
    dispatch(totalAmountM2Action.totalAmountM2Act(changeEpochM2));
    dispatch(totalTicketM2Action.totalTicketM2Act(changeEpochM2));
    dispatch(winningNumberM2Action.winningNumberM2Act(changeEpochM2));
    dispatch(winningTicketIdM2Action.winningTicketIdM2Act(changeEpochM2));
    dispatch(isClaimedM2Action.isClaimedM2Act(account, changeEpochM2));
    dispatch(myTicketCountM2Action.myTicketCountM2Act(account, changeEpochM2))
  }, [account, changeEpochM2]);

  return (
      <div className="mode2MyPageContainer">
      <div className="mode2MyTopLine">
        <div className="OnetimerSection">
          <div className="Onemode1Timer">
            <OneTimerM1 />
          </div>
        </div>
        <div className="OnetimerSection">
          <div className="Onemode2Timer">
            <OneTimerM2 />
          </div>
        </div>
      </div>
        <div className="mode2MySection">
        <div className="mode2Mypagetitle">
          <p>MODE #2</p>
        </div>
        <div className="mode2Mypagetext">
          <p>
            This is an event to guess the winning number.
            <br />
            Select a number between 1 and 250.
          </p>
        </div>
        <div className="mode2SelectSection">
          <div
            className="mode2mybuySection"
            onClick={() => navigate("/mode2buy")}
          >
            <p>Buy</p>
          </div>
          <div
            className="mode2myMySection"
            onClick={() => navigate("/mode2my")}
          >
            <p>My Page</p>
          </div>
        </div>
        <div className="mode2MypaddingSection"></div>
        <div className="mode2MyDataContainer">
        <div className="mode2MyDataSection">
          <div className="mode2MytotalballTitle">
            Total Ball
          </div>
          <div className="mode2MyTotalBallEA"><img src={ball_basic}></img>{totalTicketAmountM2} EA</div>
          <div className="mode2MyTotalPrizeTitle">Total Prize</div>
          <div className="mode2MyTotalPrizeKlay"><img src={klaytn}></img>{totalAmountM2} Klay</div>
          <div className="mode2MyResultTitle">Result</div>
          <div className="mode2MyResultStatus">
            {winningNumberM2 === "0" ?
            <>
            <img src={proceeding}></img><a style={{color: "#FF9140"}}>Proceeding</a> 
            </>
            : isClaimedM2 === "1" || isClaimedM2 === "2" ?
            <>
            <img src={result_success}></img><a style={{color: "#28D182"}}>Success</a>
            </>
            : 
            <>
            <img src={result_false}></img><a style={{color: "#F56060"}}>False</a>
            </>
          }
            </div>
        </div>
        <div className="mode2MyPaddingsection2"></div>
        <div className="mode2MyWinningOwnBallContainer">
        <div className="mode2MyRoundWinningSection">
          <div className="mode2MyRoundBtn" onClick={subEpoch}><img src={leftarrow}></img></div>
          <div className="mode2MyRoundContainer">{changeEpochM2}th Round</div>
          <div className="mode2MyRoundWinningBallContainer">
            <div className="mode2MyWinningTicketTitle">
              <img src={trophy}></img>Winning Ball
            </div>
            <div className="mode2MyWinningTicketNumber">
              {winningNumberM2 === "0" ? 
              <img src={ball_proceeding}></img>
              :
              <>
              <div className="mode2MyWinningTicketNumberText">#{winningNumberM2}<br /><a className="mode2WinningRoundId">{changeEpochM2}, {winningTicketIdM2}</a></div>
              <img src={mode2ball}></img>
              </>
              }
            </div>
          </div>
          <div className="mode2MyRoundBtn" onClick={addEpoch}><img src={rightarrow}></img></div>
        </div>
        <div className="mode2MypaddingSection3"></div>
        <div className="mode2MyOwnBallSection">
          <div className="mode2OwnBallNumber">
            Own Mode#2 Ball <img src={ball_basic}></img> <a className="modeMyOnwBallNumberText">{myTicketCountM2} EA</a>
          </div>
          <div className="mode2OwnBallImage">
              {TicketArr.map((item) => item)}
          </div>
        </div>
        </div>
        </div>
        <div className="mode2MyClaimSection">
          {isClaimedM2 === "1" ?
          <div className="modeMyClaimSuccessButton" onClick={claimRewardM2}>Claim</div>
          : isClaimedM2 === "2" ? 
          <div className="modeMyClaimButton" onClick={claimRewardM2}>Already Claim</div>
          : 
          <div className="modeMyClaimButton" onClick={claimRewardM2}>Claim</div>
        }
        </div>
        </div>
      </div>
  );
};

export default Mode2MyPage;

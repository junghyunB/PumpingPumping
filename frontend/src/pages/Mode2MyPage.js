import React, { useState } from 'react'
import "./Mode2MyPage.css"
import Button from "react-bootstrap/Button";
import { mode2main } from "../assets/images";
import { Link } from "react-router-dom";
import {Right1} from "../components"

const Mode2MyPage = () => {

    const [visible, setVisible] = useState(true);

   
  return (
<>
    <div className="mode2MyPageContainer">
      <div className="mode2MyPageSection">
        <div className="mode2selectSection">
          <Link to="/mode2buy" className="z-indexZone">
            <Button variant="outline-dark">BuyTicket</Button>
          </Link>
          <Link to="/mode2my" className="z-indexZone">
            <Button variant="outline-dark">MyPage</Button>
          </Link>
        </div>
        <div className='mode2MyPageMainSelectSection'>
            <div className='mode2MyPageInfoSection'>
                <div className='mode2MyPageOwnTicketSection'>
                    <div className='mode2MyPageOwnTicketTitleTxt'>
                        <p>Own Ticket : </p>
                    </div>
                    <div className='mode2MyPageOwnTicketSelectModeSection'>
                        <div className='mode2MyPageOwnTicketSelectModeInfoSection'>
                            
                            <div className='mode2MyPageOwnTicketSelectModeTxt1'>
                                <button >Mode#2
                                </button>
                            </div>
                            <div className='mode2MyPageOwnTicketSelectModeTxt2'>
                                <p>[1,1]</p>
                            </div>
                        </div>
                        <div className='mode2MyPageOwnTicketSelectModeInfoSection'>
                        <div className='mode2MyPageOwnTicketSelectModeTxt1'>
                                <p>Mode#2</p>
                            </div>
                            <div className='mode2MyPageOwnTicketSelectModeTxt2'>
                                <p>[1,2]</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className='mode2MyPageTotalTicketSection'>
                    <p>Total Ticket : 100 EA </p>
                </div>
                <hr/>
                <div className='mode2MyPageResultSection'>
                    <p>Result : Success / Failed</p>
                </div>
                <div className='mode2MyPageClaimBtnSection'>
                    <button>CLAIM</button>
                </div>
            </div>
        </div>
        {/* <div className='mode2MyPageLeftSelectSection1'>
            <div className='mode2MyPageInfoSection'>
                <div className='mode2MyPageOwnTicketSection'>
                    <div className='mode2MyPageOwnTicketTitleTxt'>
                        <p>Own Ticket : </p>
                    </div>
                    <div className='mode2MyPageOwnTicketSelectModeSection'>
                        <div className='mode2MyPageOwnTicketSelectModeInfoSection'>
                            <div className='mode2MyPageOwnTicketSelectModeTxt1'>
                                <p>Mode#2</p>
                            </div>
                            <div className='mode2MyPageOwnTicketSelectModeTxt2'>
                                <p>[1,1]</p>
                            </div>
                        </div>
                        <div className='mode2MyPageOwnTicketSelectModeInfoSection'>
                        <div className='mode2MyPageOwnTicketSelectModeTxt1'>
                                <p>Mode#2</p>
                            </div>
                            <div className='mode2MyPageOwnTicketSelectModeTxt2'>
                                <p>[1,2]</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className='mode2MyPageTotalTicketSection'>
                    <p>Total Ticket : 100 EA </p>
                </div>
                <hr/>
                <div className='mode2MyPageResultSection'>
                    <p>Result : Success / Failed</p>
                </div>
                <div className='mode2MyPageClaimBtnSection'>
                    <button>CLAIM</button>
                </div>
            </div>
            <div className='mode2MyPageRightModeSelectContainer'>
                <div className='mode2MyPageRightModeSelectSection'>
                    <div className='mode2MyPageRightModeCircleSection'>
                        <div className='modeMyPageRightModeCircle'>
                            <p className='rightCircleTxt'>5</p>
                        </div>
                    </div>
                    <div className='mode2MyPageRightTxtSection'>
                        <div>
                            <div className=''>
                                <p>Mode#2</p>
                            </div>
                            <div>
                                <p>[1,2]</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        <div>
            <button
                onClick={()=>{
                    setVisible(!visible);
                    }}
            >
                {visible ? "숨기기" : "보이기"}
            </button>
            <hr/>
            {visible && <Right1/>}
        </div>
      </div>
        

    </div>
    
</>
  )
}

export default Mode2MyPage
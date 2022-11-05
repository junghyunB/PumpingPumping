import React from 'react'
import './MainPage.css'
import {BiLeftArrow} from "react-icons/bi";
import {BiRightArrow} from "react-icons/bi";

const MainPage = () => { 
  return (
    <div className='mainPageContainer'>
        {/* =============== Main Left Section =============== */}
        <div className='mainPageLeftSection'>
            <div className='mainPageLeftSection1'>
                <div className='mainPageLeftSectionTitle'> 
                    <p>Mode#1</p>
                    <hr/>
                </div>
                <div className='mainPageLeftInfoSection'>
                    <div className='mainPageLeftSectionSilder'>
                        <BiLeftArrow className='leftSectionLeftBtn'/>
                        <BiRightArrow className='leftSectionRightBtn'/>
                        <p>N 회차 당첨</p>
                        <p>티켓</p>
                        <p>Mode#1</p>
                        <p>[ 1 , 1]</p>

                    </div>
                    <div className='mainPageLeftPrizedSection'>
                        <table>
                            <tr className='tableTitle'>
                                <td>Total Prized</td>
                            </tr>
                            <tr className='tableInfo'> 
                                <td>N Klay</td>
                            </tr>
                        </table>
                    </div>
                    <div className='LeftBuyBtn'>
                        <button>Buy</button>
                    </div>
                </div>
            </div>

        </div>
        {/* =============== Main Right Section =============== */}
        <div className='mainPageRightSection'>
            <div className='mainPageRightSection1'>
                <div className='mainPageRightSectionTitle'> 
                    <p>Mode#2</p>
                    <hr/>
                </div>
                <div className='mainPageRightInfoSection'>
                    <div className='mainPageRightSectionSilder'>
                        <BiLeftArrow className='rightSectionLeftBtn'/>
                        <BiRightArrow className='rightSectionRightBtn'/>
                        <p>N 회차 당첨</p>
                        <p>번호</p>
                        <p>#245</p>
                        <br></br>
                        <br></br>

                    </div>
                    <div className='mainPageRightPrizedSection'>
                        <table>
                            <tr className='tableTitle'>
                                <td>Total Prized</td>
                            </tr>
                            <tr className='tableInfo'> 
                                <td>N Klay</td>
                            </tr>
                        </table>
                    </div>
                    <div className='rightBuyBtn'>
                        <button>Buy</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default MainPage
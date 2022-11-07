import React from 'react'
import './MainM2.css'
import {BiLeftArrow} from "react-icons/bi";
import {BiRightArrow} from "react-icons/bi";


const MainM2 = () => {
  return (
    <div className='mainPageRightSection'>
    <div className='mainPageRightSection1'>
        <div className='mainPageRightSectionTitle'> 
            <p>Mode#2</p>
            <hr/>
        </div>
        <div className='mainPageRightInfoSection'>
            <div className='mainPageRightSectionSilder'>
                <button className='rightSectionLeftBtn'><BiLeftArrow size={30}/></button>
                <button className='rightSectionRightBtn'><BiRightArrow size={30}/></button>
                <p>N 회차 당첨 번호</p>
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
  )
}

export default MainM2
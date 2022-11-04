import React from 'react'
import './Main.css'

const Main = () => {
  return (
    <div className='mainPageContainer'>
        <div className='mainPageLeftSection'>
            <div className='mainPageLeftSection1'>
                <div className='mainPageLeftSectionTitle'></div>
                <div className='mainPageLeftInfoSection'>
                    <div className='mainPageLeftSectionSilder'>
                    </div>
                    <div className='mainPageLeftBtnSection'>
                        <div className='btn1'></div>
                        <div className='btn2'></div>
                    </div>
                    <div className='mainPageBtn'>
                        <button>Buy</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='mainPageRightSection'>
            <div className='mainPageRightSection1'>
                <div className='mainPageRightSectionTitle'></div>
                <div className='mainPageRightInfoSection'>
                    <div className='mainPageRightSectionSilder'>
                    </div>
                    <div className='mainPageRightBtnSection'>
                        <div className='btn1'></div>
                        <div className='btn2'></div>
                    </div>
                    <div className='mainPageBtn'>
                        <button>Buy</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Main
import React from 'react'
import './Navbartest.scss'

const Navbartest = () => {
  return (
    <div className='navbarContainer'>
        <div className='topNav'>
            <nav className="menu">
                <ol>
                    {/* <li className="menu-item"><a href="#0">Home</a></li> */}
                    {/* <li className="menu-item"><a href="#0">About</a></li> */}
                    <li className="menu-item">
                    <a href="#0">Widgets</a>
                    <ol className="sub-menu">
                        <li className="menu-item"><a href="#0">Big Widgets</a></li>
                        <li className="menu-item"><a href="#0">Bigger Widgets</a></li>
                        <li className="menu-item"><a href="#0">Huge Widgets</a></li>
                    </ol>
                    </li>
                    <li className="menu-item">
                    <a href="#0">Kabobs</a>
                    <ol className="sub-menu">
                        <li className="menu-item"><a href="#0">Shishkabobs</a></li>
                        <li className="menu-item"><a href="#0">BBQ kabobs</a></li>
                        <li className="menu-item"><a href="#0">Summer kabobs</a></li>
                    </ol>
                    </li>
                    <li className="menu-item"><a href="#0">Contact</a></li>
                </ol>
            </nav>
        </div>

        <div className='leftNavContainer'>
            <div className='leftNavSection'>
                <div className='firstLeftNav'><button className='firstLeftNavBtn'>Klay</button></div>
                <div className='secondLeftNav'>
                    <p className='secondLeftNavTxt1'>Your Wallet Address : </p>
                    <p className='secondLeftNavTxt2'>Not Connected </p>
                    </div>
                <div className='thirdLeftNav'>
                    <div className='thirdLeftNav1'><button>DashBorad</button></div>
                    <div className='thirdLeftNav2'><button>Raffle</button></div>
                    <div className='thirdLeftNav3'><button>Guide</button></div>
                </div>
                <div className='fotLeftNav'>
                    <div className='fotLeftNav1'><button>Twitter</button></div>
                    <div className='fotLeftNav2'><button>Discord</button></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbartest
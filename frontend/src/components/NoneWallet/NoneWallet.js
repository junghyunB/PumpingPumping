import React from 'react'
import "./NoneWallet.css";
import { kaikas, metamask } from '../../assets/images';

const NoneWallet = () => {
  return (
      <div className='noneWalletContainer'>
        <div className='explainContainer'>
          <div className='explainSection'>
            <p>In order to use pumpingpumping, metamask or kaikas wallet must be installed.</p><p>Please install it through the link below and use it again.</p>
          </div>
        </div>
        <div className='downloadContainer'>
        <div className='downloadKaikasSection' onClick={() => window.open("https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=ko")}><img src={kaikas}></img>
        <h4>KaiKas Download</h4>
        </div>
        <div className='downloadMetamaskSection' onClick={() => window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn")}>
        <img src={metamask}></img>
        <h4>Metamask Download</h4>
        </div>
        </div>
      </div>
    
  )
}

export default NoneWallet
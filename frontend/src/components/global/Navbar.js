import React, { useEffect } from "react";
import "./Navbar.scss";
import { homebutton } from "../../assets/images";
import { Link } from "react-router-dom";
import { SiDiscord, SiTwitter } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { connectKaiKasAccount } from "../../redux/actions/connectKaiKasAccount";
import { connectMetaMaskAccount } from "../../redux/actions/connectMetaMaskAccount";
import {TimerM1, TimerM2} from "../"
import { changeNetworkAction } from "../../redux/actions/changeNetworkAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const metamaskChainId = useSelector((state) => state.account.metamaskChainId);
  const selectMetamask = useSelector((state) => state.account.accountMetaMask);
  const selectKaiKas = useSelector((state) => state.account.accountKaiKas);
  const localKey = localStorage.key(0);
  const storedMetaMask = localStorage.getItem("metamaskAccount");
  const storedKaiKas = localStorage.getItem("kaikasAccount");
  const metaMaskNetWork = window.ethereum?.networkVersion;
  const kaiKasNetWork = window.klaytn?.networkVersion;


  const connectKaiKasWallet = () => {
    dispatch(connectKaiKasAccount.getKaiKasAccount());
  };

  const connectMetaMaskWallet = () => {
    metamaskChainId !== "0x2019" ? dispatch(changeNetworkAction.changeNetworkAct()) : 
    // metamaskChainId !== "0x3e9" ? dispatch(changeNetworkAction.changeNetworkAct()) : 
    dispatch(connectMetaMaskAccount.getMetaMaskAccount());
  };

  const disabledLogin = () => {
    localStorage.removeItem("metamaskAccount");
    localStorage.removeItem("kaikasAccount");
    window.location.reload();
  };


  window.ethereum?.on('chainChanged', () => {
    if(localKey === "metamaskAccount") window.location.reload();
  });

  const colorstyle = {
    color : "red",
  }
  const IsConnectedWallet = () => {

    if (localKey === "kaikasAccount") {
      return (
        <>
          <p className="secondLeftNavTxt1">Your Wallet Address : </p>
          <p>
            {storedKaiKas.substr(0, 10)}...{storedKaiKas.slice(-10)}
          </p>
          <p>NetWork : {kaiKasNetWork} ( Supported )</p>
        </>
      );
    } else if (localKey === "metamaskAccount") {
      return (
        <>
          <p className="secondLeftNavTxt1">Your Wallet Address : </p>
          <p>
            {storedMetaMask.substr(0, 10)}...{storedMetaMask.slice(-10)}
          </p>
          <p>
            NetWork : {metaMaskNetWork}
            {/* {metaMaskNetWork === "1001" ? ( */}
            {metaMaskNetWork === "8217" ? (
              <a> ( Supported )</a>
            ) : (
              <a style={colorstyle}> ( Unsupported NetWork )</a>
            )}
          </p>
        </>
      );
    } else if (localKey === null) {
      return (
        <>
          <p>Not Connected</p>
          <p>please Connected Wallet</p>
        </>
      );
    }
  };

  useEffect(() => {
    if(localKey !== "metamaskAccount" && localKey !== null) {
      window.klaytn?.on("accountsChanged", (handler) => {
        dispatch(connectKaiKasAccount.getKaiKasAccount());
        localStorage.setItem("kaikasAccount", handler);
      });
    }

    return () => {
      window.klaytn?.removeListener("accountsChanged", () => {})
    }
  }, [selectKaiKas])

  useEffect(() => {
    if(localKey !== "kaikasAccount" && localKey !== null) {
      window.ethereum?.on("accountsChanged", (handler) => {
        dispatch(connectMetaMaskAccount.getMetaMaskAccount());
        localStorage.setItem("metamaskAccount", handler);
      })
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", () => {})
    }
  },[selectMetamask]);

  useEffect(() => {
    dispatch({type:"KAIKAS_NETWORK", payload:kaiKasNetWork});
    dispatch({type:"METAMASK_NETWORK", payload:metaMaskNetWork});
  },[metaMaskNetWork, kaiKasNetWork])


  return (
    <div className="navbarContainer">
      <div className="topNav">
        <nav className="menu">
          <ol>
            <li className="menu-item">
              <a className="text-color">Buy Klay</a>
              <ol className="sub-menu">
                <li className="menu-item">
                  <a href="https://swapscanner.io/ko" target="_blank">
                    Swap Scanner
                  </a>
                </li>
                <li className="menu-item">
                  <a href="https://klayswap.com/" target="_blank">
                    Klay Swap
                  </a>
                </li>
              </ol>
            </li>
            <li className="menu-item">
              <a className="text-color">Wallet Scan</a>
              <ol className="sub-menu">
                <li className="menu-item">
                  <a href="https://debank.com/" target="_blank">
                    DeBank
                  </a>
                </li>
              </ol>
            </li>
            {localKey === null ? (
              <>
                <li className="menu-item">
                  <a className="text-color">Connect Wallet</a>
                  <ol className="sub-menu">
                    <li className="menu-item" onClick={connectKaiKasWallet}>
                      <a>KaiKas</a>
                    </li>
                    <li className="menu-item" onClick={connectMetaMaskWallet}>
                      <a>MetaMask</a>
                    </li>
                  </ol>
                </li>
              </>
            ) : (
              <li className="menu-item" onClick={disabledLogin}>
                <a className="text-color">DisConnected</a>
              </li>
            )}
          </ol>
        </nav>
     
      </div>
              <div className="timerSaction">
                <div className="mode1Timer"><TimerM1 /></div>
                <div className="mode2Timer"><TimerM2 /></div>
              </div>
      <div className="leftNavContainer">
        <div className="leftNavSection">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="firstLeftNav">
              <img src={homebutton} className="homeimg"></img>
              <h1>Klay Raffle</h1>
            </div>
          </Link>
          <hr></hr>
          <div className="secondLeftNav">
            <IsConnectedWallet />
          </div>
          <hr></hr>
          <div className="thirdLeftNav">
            <div className="thirdLeftNav1">
              <Link to="/dashboard">
                <button>
                  <span>DashBorad</span>
                </button>
              </Link>
            </div>
            <div className="thirdLeftNav1">
              <Link to="/choicemode">
                <button>
                  <span>Raffle</span>
                </button>
              </Link>
            </div>
            <div className="thirdLeftNav1">
              <Link to="/">
                <button>
                  <span>Guide</span>
                </button>
              </Link>
            </div>
          </div>
          <hr></hr>
          <div className="fotLeftNav">
            <div className="fotLeftNav1">
              <SiTwitter size={30} />
            </div>
            <div className="fotLeftNav2">
              <SiDiscord size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

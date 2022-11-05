import React, { useEffect } from "react";
import "./Navbartest.scss";
import { homebutton } from "../../assets/images";
import { Link } from "react-router-dom";
import { SiDiscord, SiTwitter } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { connectKaiKasAccount } from "../../redux/actions/connectKaiKasAccount";
import { connectMetaMaskAccount } from "../../redux/actions/connectMetaMaskAccount";

const Navbartest = () => {
  const dispatch = useDispatch();
  const accountKaiKas = useSelector((state) => state.account.accountKaiKas);
  const accountMetaMask = useSelector((state) => state.account.accountMetaMask);
  const connectKaiKasWallet = () => {
    dispatch(connectKaiKasAccount.getKaiKasAccount());
  };

  const connectMetaMaskWallet = () => {
    dispatch(connectMetaMaskAccount.getMetaMaskAccount());
  };

  const disabledLogin = () => {
    localStorage.removeItem("metamaskAccount");
    localStorage.removeItem("kaikasAccount");
    window.location.reload();
  };

  const walletChangeMetaMask = () => {
    if (storedMetaMask !== null) {
      dispatch(connectMetaMaskAccount.getMetaMaskAccount());
    }
  };
  const walletChangeKaiKas = () => {
    if (storedKaiKas !== null) {
      dispatch(connectKaiKasAccount.getKaiKasAccount());
    }
  };

  const IsConnectedWallet = () => {
    if (storedKaiKas !== null) {
      return (
        <>
          <p className="secondLeftNavTxt1">Your Wallet Address : </p>
          <p>{storedKaiKas.substr(0,10)}...{storedKaiKas.slice(0,10)}</p>
        </>
      );
    } else if (storedMetaMask !== null) {
      return (
        <>
          <p className="secondLeftNavTxt1">Your Wallet Address : </p>
          <p>{storedMetaMask.substr(0,10)}...{storedMetaMask.slice(0,10)}</p>
        </>
      );
    } else if (storedKaiKas === null && storedMetaMask === null) {
      return (
        <>
          <p>Not Connected</p>
          <p>please Connected Wallet</p>
        </>
      );
    }
  };

  const storedMetaMask = localStorage.getItem("metamaskAccount");
  const storedKaiKas = localStorage.getItem("kaikasAccount");

  useEffect(() => {
    if (accountKaiKas === "") walletChangeKaiKas();
  }, []);

  useEffect(() => {
    if (accountMetaMask === "") walletChangeMetaMask();
  }, []);

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
            {storedKaiKas === null && storedMetaMask === null ? (
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
                <a className="text-color">Disabled</a>
              </li>
            )}
          </ol>
        </nav>
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
              <Link to="/">
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

export default Navbartest;

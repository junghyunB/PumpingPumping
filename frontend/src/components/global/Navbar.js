import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectKaiKasAccount } from "../../redux/actions/connectKaiKasAccount";
import { connectMetaMaskAccount } from "../../redux/actions/connectMetaMaskAccount";
import { changeNetworkAction } from "../../redux/actions/changeNetworkAction";
import { balanceAction } from "../../redux/actions/balanceAction";
import { swapscanner, klayswap, discord, twitter, maintext, mainimg, metamask, kaikas } from "../../assets/images";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectMetamask = useSelector((state) => state.account.accountMetaMask);
  const selectKaiKas = useSelector((state) => state.account.accountKaiKas);
  const klaybalance = useSelector((state) => state.account.klaybalance);
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);  
  const storedMetaMask = localStorage.getItem("metamaskAccount");
  const storedKaiKas = localStorage.getItem("kaikasAccount");
  const metaMaskNetWork = window.ethereum?.networkVersion;
  const kaiKasNetWork = window.klaytn?.networkVersion;
  const innerWidth = useSelector(state => state.user.innerWidth);

  const [show, setShow] = useState(false);
  const [connectShow, setConnectShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConnectClose = () => setConnectShow(false);
  const handleConnectShow = () => setConnectShow(true);

  const connectKaiKasWallet = () => {
    dispatch(connectKaiKasAccount.getKaiKasAccount());
  };

  const connectMetaMaskWallet = () => {
    if (metaMaskNetWork !== "8217")
      dispatch(changeNetworkAction.changeNetworkAct());
    // metamaskChainId !== "0x3e9" ? dispatch(changeNetworkAction.changeNetworkAct()) :
    else dispatch(connectMetaMaskAccount.getMetaMaskAccount());
  };


  const disabledLogin = () => {
    localStorage.removeItem("metamaskAccount");
    localStorage.removeItem("kaikasAccount");
    window.location.reload();
  };

  window.ethereum?.on("chainChanged", () => {
    if (localKey === "metamaskAccount") window.location.reload();
  });

  const IsConnectedWallet = () => {
    if (localKey === "kaikasAccount") {
      return (
        <>
          <div className="secondLeftNavMyKlay">
            <p className="leftnavsmalltitle">My Klay</p>
            <p className="leftnavsmalldata">{klaybalance} Klay</p>
          </div>

          <div className="secondLeftNavWallet">
            <p className="leftnavsmalltitle">Your Wallet Address </p>
            <p className="leftnavsmalldata">
              {storedKaiKas.substr(0, 10)}...{storedKaiKas.slice(-10)}
            </p>
          </div>

          <div className="secondLeftNavNetWork">
            <div className="secondLeftNavNetWork1">
              <p className="leftnavsmalltitle">NetWork</p>
            </div>
            <div className="secondLeftNavNetWork2">
              <div className="secondLeftNavNetWork3">
                <p className="leftnavsmalldata">{kaiKasNetWork}</p>
              </div>
              <div className="secondLeftNavNetWork4">
                {/* {metaMaskNetWork === "1001" ? ( */}
                {kaiKasNetWork === 8217 ? (
                  <div className="networkstatus">
                    Supported
                  </div>
                ) : (
                  <div className="networkstatus2">
                  UnSupported
                </div>
                )}
              </div>
            </div>
          </div>
        </>
      );
    } else if (localKey === "metamaskAccount") {
      return (
        <>
          <div className="secondLeftNavMyKlay">
            <p className="leftnavsmalltitle">My Klay</p>
            <p className="leftnavsmalldata">{klaybalance} Klay</p>
          </div>

          <div className="secondLeftNavWallet">
            <p className="leftnavsmalltitle">Your Wallet Address </p>
            <p className="leftnavsmalldata">
              {storedMetaMask.substr(0, 10)}...{storedMetaMask.slice(-10)}
            </p>
          </div>

          <div className="secondLeftNavNetWork">
            <div className="secondLeftNavNetWork1">
              <p className="leftnavsmalltitle">NetWork</p>
            </div>
            <div className="secondLeftNavNetWork2">
              <div className="secondLeftNavNetWork3">
                <p className="leftnavsmalldata">{metaMaskNetWork}</p>
              </div>
              <div className="secondLeftNavNetWork4">
                {/* {metaMaskNetWork === "1001" ? ( */}
                {metaMaskNetWork === "8217" ? (
                 <div className="networkstatus">
                 Supported
               </div>
                ) : (
                  <div className="networkstatus2">
                  UnSupported
                </div>
                )}
              </div>
            </div>
          </div>
        </>
      );
    } else if (localKey === null) {
      return (
        <>
          <div className="notConnectSection">
          <p>Not Connected</p>
          <p>please Connected Wallet</p>
          </div>
        </>
      );
    }
  };


  useEffect(() => {
    if (localKey !== "metamaskAccount" && localKey !== null) {
      window.klaytn?.on("accountsChanged", (handler) => {
        dispatch(connectKaiKasAccount.getKaiKasAccount());
        localStorage.setItem("kaikasAccount", handler);
      });
    }

    return () => {
      window.klaytn?.removeListener("accountsChanged", () => {});
    };
  }, [selectKaiKas]);

  useEffect(() => {
    if (localKey !== "kaikasAccount" && localKey !== null) {
      window.ethereum?.on("accountsChanged", (handler) => {
        dispatch(connectMetaMaskAccount.getMetaMaskAccount());
        localStorage.setItem("metamaskAccount", handler);
      });
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", () => {});
    };
  }, [selectMetamask]);

  useEffect(() => {
    dispatch({ type: "KAIKAS_NETWORK", payload: kaiKasNetWork });
    dispatch({ type: "METAMASK_NETWORK", payload: metaMaskNetWork });
  }, [metaMaskNetWork, kaiKasNetWork]);

  useEffect(() => {
    dispatch(balanceAction.balanceAct(account));
  },[account])


  return (
    <div className="navbarContainer">
        <div className="leftNavSection">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="firstLeftNav">
              <div className="firstLeftNavimgSection"><img src={mainimg}></img></div>
              <div className="firstLeftNavtextSection"><img src={maintext}></img></div>
            </div>
          </Link>
          <div className="secondLeftNav">
            <IsConnectedWallet />
          </div>
          <div className="klaybuyscanNav">
            <div className="buyklayBtn">
              <Button onClick={handleShow}>
                Buy Klay
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                contentClassName="connectModal"
                centered={true}
              >
                <div className="klayswapSection">
                  <div className="klayswapButtonSection" onClick={() => window.open("https://swapscanner.io/ko")}>
                    <img src={klayswap}></img> 
                    <p>Klay Swap</p>                    
                  </div>
                  </div>
                  <div className="metamaskSection">
                  <div className="metamaskButtonSection"  onClick={() => window.open("https://klayswap.com/")}> 
                  <img src={swapscanner}></img> 
                    <p>Swap Scanner</p>                                 
                  </div>
                </div>
              </Modal>
            </div>
            <div className="walletscanBtn">
              <Button
                onClick={() => window.open("https://debank.com/")}
              >
                Wallet Scan
              </Button>
            </div>
          </div>
          <div className="thirdLeftNav">
            {localKey === null ? (
              <>
              <Button variant="outline-success" onClick={handleConnectShow}>
                Connect Wallet
              </Button>

              <Modal
                show={connectShow}
                onHide={handleConnectClose}
                contentClassName="ConnectModal"
                centered={true}
              > 
              <div className="kaikasSection">
                <div className="kaikasButtonSection" onClick={connectKaiKasWallet}>
                  <img src={kaikas}></img>
                  <p>Connect KaiKas</p>
                </div>
              </div>
              <div className="metamaskSection">
                <div className="metamaskButtonSection" onClick={connectMetaMaskWallet}>
                <img src={metamask}></img>
                  <p>Connect MetaMask</p>
                </div>
              </div>
              </Modal>
              </>
            ) : (
              <Button variant="outline-danger" onClick={disabledLogin}>
                DisConnected Wallet
              </Button>
            )}
          </div>
          <div className="forthLeftNav">
            <div
              className="contentsection"
              onClick={() => navigate("/dashboard")}
            >
              <label className="rad-label">
                <input type="radio" className="rad-input" name="rad" />
                <div className="rad-design"></div>
                <div className="rad-text">DashBorad</div>
              </label>
            </div>
            <div
              className="contentsection"
              onClick={() => navigate("/choicemode")}
            >
              <label className="rad-label">
                <input type="radio" className="rad-input" name="rad" />
                <div className="rad-design"></div>
                <div className="rad-text">Raffle</div>
              </label>
            </div>
            <div className="contentsection" onClick={() => navigate("/")}>
              <label className="rad-label">
                <input type="radio" className="rad-input" name="rad" />
                <div className="rad-design"></div>
                <div className="rad-text">Guide</div>
              </label>
            </div>
          </div>
          <div className="channelSection"><a>Channel</a></div>
          <div className="fotLeftNav">
            <div className="twitterSection"><button><img src={twitter}></img></button></div>
            <div className="discordSection"><button><img src={discord}></img></button></div>
          </div>
        </div>
      <div className="rightNavContainer">
      </div>
      </div>
  );
};

export default Navbar;

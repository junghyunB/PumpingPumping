import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectKaiKasAccount } from "../../redux/actions/connectKaiKasAccount";
import { connectMetaMaskAccount } from "../../redux/actions/connectMetaMaskAccount";
import { TimerM1, TimerM2 } from "../";
import { changeNetworkAction } from "../../redux/actions/changeNetworkAction";
import { balanceAction } from "../../redux/actions/balanceAction";
import { swapscanner, klayswap, discord, twitter } from "../../assets/images";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const metamaskChainId = useSelector((state) => state.account.metamaskChainId);
  const selectMetamask = useSelector((state) => state.account.accountMetaMask);
  const selectKaiKas = useSelector((state) => state.account.accountKaiKas);
  const klaybalance = useSelector((state) => state.account.klaybalance);
  const localKey = localStorage.key(0);
  const account = localStorage.getItem(localKey);  
  const storedMetaMask = localStorage.getItem("metamaskAccount");
  const storedKaiKas = localStorage.getItem("kaikasAccount");
  const metaMaskNetWork = window.ethereum?.networkVersion;
  const kaiKasNetWork = window.klaytn?.networkVersion;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                {kaiKasNetWork === "8217" ? (
                  <Badge pill bg="success">
                    Supported
                  </Badge>
                ) : (
                  <Badge pill bg="danger">
                    UnSupported
                  </Badge>
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
                  <Badge pill bg="success">
                    Supported
                  </Badge>
                ) : (
                  <Badge pill bg="danger">
                    UnSupported
                  </Badge>
                )}
              </div>
            </div>
          </div>
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
      <div className="leftNavContainer">
        <div className="leftNavSection">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="firstLeftNav">
              <a className="istmainword">P</a>
              <a className="lastmainword">umping</a>
              <a className="istmainword">P</a>
              <a className="lastmainword">umping</a>
            </div>
          </Link>
          <div className="secondLeftNav">
            <IsConnectedWallet />
          </div>
          <div className="klaybuyscanNav">
            <div className="buyklayBtn">
              <Button variant="success" onClick={handleShow}>
                Buy Klay
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                contentClassName="buyklayModal"
                centered={true}
              >
                <div className="buyklayModalContainer">
                  <div className="buyKlayModalLeftContainer">
                    <div
                      className="swapscannerzone"
                      onClick={() => window.open("https://swapscanner.io/ko")}
                    >
                      <img src={swapscanner}></img>
                    </div>
                  </div>
                  <div className="buyKlayModalRightContainer">
                    <div
                      className="klayswapzone"
                      onClick={() => window.open("https://klayswap.com/")}
                    >
                      <img src={klayswap}></img>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="walletscanBtn">
              <Button
                variant="light"
                onClick={() => window.open("https://debank.com/")}
              >
                Wallet Scan
              </Button>
            </div>
          </div>
          <div className="thirdLeftNav">
            {localKey === null ? (
              <Button variant="outline-success" onClick={connectMetaMaskWallet}>
                Connect Wallet
              </Button>
            ) : (
              <Button variant="outline-danger" onClick={disabledLogin}>
                DisConnected Wallet
              </Button>
            )}
          </div>
          {/* <div className="thirdLeftNav">
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
                <button onClick={handleShow}>
                  <span>Guide</span>
                </button>
              </Link>
            </div>
          </div> */}
          <div className="forthLeftNav">
            <div
              className="contentsection"
              onClick={() => navigate("/dashboard")}
            >
              <label class="rad-label">
                <input type="radio" class="rad-input" name="rad" />
                <div class="rad-design"></div>
                <div class="rad-text">DashBorad</div>
              </label>
            </div>
            <div
              className="contentsection"
              onClick={() => navigate("/choicemode")}
            >
              <label class="rad-label">
                <input type="radio" class="rad-input" name="rad" />
                <div class="rad-design"></div>
                <div class="rad-text">Raffle</div>
              </label>
            </div>
            <div className="contentsection" onClick={() => navigate("/")}>
              <label class="rad-label">
                <input type="radio" class="rad-input" name="rad" />
                <div class="rad-design"></div>
                <div class="rad-text">Guide</div>
              </label>
            </div>
          </div>
          <div className="channelSection"><a>Channel</a></div>
          <div className="fotLeftNav">
            <div className="twitterSection"><button><img src={twitter}></img></button></div>
            <div className="discordSection"><button><img src={discord}></img></button></div>
          </div>
        </div>
      </div>
      <div className="rightNavContainer">
        <div className="timerSaction">
          <div className="mode1Timer">
            <TimerM1 />
          </div>
          <div className="mode2Timer">
            <TimerM2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

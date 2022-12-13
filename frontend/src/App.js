import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectMetaMaskAccount } from "./redux/actions/connectMetaMaskAccount";
import { connectKaiKasAccount } from "./redux/actions/connectKaiKasAccount";
import { metaMaskNetworkAction } from "./redux/actions/metaMaskNetworkAction";
import {
  MainPage,
  DashBoard,
  ChoiceMode,
  Mode1BuyPage,
  Mode1MyPage,
  Mode2BuyPage,
  Mode2DetailPage,
  Mode2MyPage,
} from "./pages/index";
import {
  Navbar,
  NotConnectedWallet,
  NotSupportedNetWork,
  NoneWallet,
} from "./components/index";
import "./App.css";
import SliderT from "./lib/SliderT";

function App() {
  const localKey = localStorage.key(0);
  const dispatch = useDispatch();
  const metamaskNetWork = useSelector((state) => state.account.metamaskNetWork);
  const selectMetamask = useSelector((state) => state.account.accountMetaMask);
  const selectKaiKas = useSelector((state) => state.account.accountKaiKas);
  const klaytnNetWork = window.klaytn.networkVersion;

  const networkChangeMetaMask = () => {
    dispatch(metaMaskNetworkAction.metaMaskNetworkAct());
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

  const WalletRoute = () => {
    if (window.klaytn === undefined && window.ethereum === undefined) {
      return (
        <div className="App">
          <Navbar />
          <NoneWallet />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar />
          {localKey === null ? (
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/choicemode" element={<NotConnectedWallet />} />
              <Route path="/mode1buy" element={<NotConnectedWallet />} />
              <Route path="/mode1my" element={<NotConnectedWallet />} />
              <Route path="/mode2buy" element={<NotConnectedWallet />} />
              <Route
                path="/mode2buy/ticket:id"
                element={<NotConnectedWallet />}
              />
              <Route path="/mode2my" element={<NotConnectedWallet />} />
            </Routes>
          ) : (localKey === "metamaskAccount" && metamaskNetWork !== "8217") ||
            (localKey === "kaikasAccount" && klaytnNetWork !== 8217) ? (
            // : localKey === "metamaskAccount" && metamaskNetWork !== "1001" ?
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/choicemode" element={<NotSupportedNetWork />} />
              <Route path="/mode1buy" element={<NotSupportedNetWork />} />
              <Route path="/mode1my" element={<NotSupportedNetWork />} />
              <Route path="/mode2buy" element={<NotSupportedNetWork />} />
              <Route
                path="/mode2buy/ticket:id"
                element={<NotSupportedNetWork />}
              />
              <Route path="/mode2my" element={<NotSupportedNetWork />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/choicemode" element={<ChoiceMode />} />
              <Route path="/mode1buy" element={<Mode1BuyPage />} />
              <Route path="/mode1my" element={<Mode1MyPage />} />
              <Route path="/mode2buy" element={<Mode2BuyPage />} />
              <Route path="/mode2buy/ticket:id" element={<Mode2DetailPage />} />
              <Route path="/mode2my" element={<Mode2MyPage />} />
              <Route path="/test" element={<SliderT />} />
            </Routes>
          )}
        </div>
      );
    }
  };

  useEffect(() => {
    networkChangeMetaMask();
  }, [metamaskNetWork]);

  return (
    <div>
      <WalletRoute />
    </div>
  );
}

export default App;

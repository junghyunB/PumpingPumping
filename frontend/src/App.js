import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
} from "./components/index";
import "./App.css";

function App() {
  const localKey = localStorage.key(0);
  const dispatch = useDispatch();
  const metamaskNetWork = useSelector((state) => state.account.metamaskNetWork);
  
  

  useEffect(() => {
    dispatch(metaMaskNetworkAction.metaMaskNetworkAct());
  }, [metamaskNetWork]);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
      {localKey === null ? (
        <NotConnectedWallet />
      ) : localKey === "metamaskAccount" && metamaskNetWork !== "1001" ? (
        <NotSupportedNetWork />
      ) : (
        <Routes>
          <Route path="/choicemode" element={<ChoiceMode />} />
          <Route path="/mode1buy" element={<Mode1BuyPage />} />
          <Route path="/mode1my" element={<Mode1MyPage />} />
          <Route path="/mode2buy" element={<Mode2BuyPage />} />
          <Route path="/mode2buy/ticket:id" element={<Mode2DetailPage />} />
          <Route path="/mode2my" element={<Mode2MyPage />} />
          <Route path="/not" element={<NotConnectedWallet />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

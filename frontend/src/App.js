import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { MainPage, DashBoard, ChoiceMode, Mode1BuyPage, Mode1MyPage, Mode2BuyPage, Mode2DetailPage, Mode2MyPage } from "./pages/index";
import {Navbar} from "./components/index";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/choicemode" element={<ChoiceMode />} />
        <Route path="/mode1buy" element={<Mode1BuyPage />} />
        <Route path="/mode1my" element={<Mode1MyPage />} />
        <Route path="/mode2buy" element={<Mode2BuyPage />} />
        <Route path="/mode2buy/ticket:id" element={<Mode2DetailPage />} />
        <Route path="/mode2my" element={<Mode2MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
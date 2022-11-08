import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Mode1, Mode2, MainPage, DashBoard, ChoiceMode, Mode1BuyPage, Mode1MyPage } from "./pages/index";
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
      </Routes>
    </div>
  );
}

export default App;
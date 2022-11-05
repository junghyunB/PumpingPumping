import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navibar from "./components/global/Navibar";
import { Routes, Route } from "react-router-dom";
import { Mode1, Mode2, MainPage, DashBoard } from "./pages/index";
import Navbartest from "./components/global/Navbartest";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbartest/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
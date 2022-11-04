import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navibar from "./components/global/Navibar";
import { Routes, Route } from "react-router-dom";
import { Mode1, Mode2 } from "./pages/index";
import Navbartest from "./components/global/Navbartest";
import Main from "./components/mainpage/Main";

function App() {
  return (
    <div>
      <Navbartest/>
      {/* <Navibar /> */}
      <Routes>
        {/* <Route path="/mode1" element={<Mode1 />} /> */}
        {/* <Route path="/mode2" element={<Mode2 />} /> */}
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;

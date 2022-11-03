import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navibar from "./components/global/Navibar";
import { Routes, Route } from "react-router-dom";
import { Mode1, Mode2 } from "./pages/index";

function App() {
  return (
    <div>
      <Navibar />
      <Routes>
        <Route path="/mode1" element={<Mode1 />} />
        <Route path="/mode2" element={<Mode2 />} />
      </Routes>
    </div>
  );
}

export default App;

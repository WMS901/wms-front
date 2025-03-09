import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inventory from "./pages/Inventory";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 초기 페이지 설정 */}
        <Route path="/" element={<Navigate to="/inventory" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  );
};

export default App;

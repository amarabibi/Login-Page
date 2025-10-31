import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./dashboard_login/login";
import StudentsPage from "./dashboard_login/dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/students" element={<StudentsPage />} />
      </Routes>
    </Router>
  );
}

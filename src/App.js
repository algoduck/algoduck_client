import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage"; // 추가
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ProblemListPage from "./pages/ProblemListPage";
import ProblemSolvePage from "./pages/ProblemSolvePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/update-profile" element={<UpdateProfilePage />} />
        <Route path="/problems" element={<ProblemListPage />} />
        <Route path="/problems/:problemId" element={<ProblemSolvePage />} />
      </Routes>
    </Router>
  );
}

export default App;

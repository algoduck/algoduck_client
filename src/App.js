import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage"; // 추가
import UpdateProfilePage from "./pages/UpdateProfilePage";

function App() {
  console.log("hello");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/update-profile" element={<UpdateProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;

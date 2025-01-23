import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* SignupPage를 루트 경로로 설정 */}
        <Route path="/" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
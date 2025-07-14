import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage"; // 추가
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ProblemListPage from "./pages/ProblemListPage";
import ProblemSolvePage from "./pages/ProblemSolvePage";
import RankingPage from "./pages/RankingPage";
import MemberDetailPage from "./pages/MemberDetailPage";
import SubmissionListPage from "./pages/SubmissionListPage";
import useSessionGuard from "./hooks/useSessionGuard";

const AppRoutes = () => {
  useSessionGuard(); // Router 안쪽에서 사용

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/update-profile" element={<UpdateProfilePage />} />
      <Route path="/problems" element={<ProblemListPage />} />
      <Route path="/problems/:problemId" element={<ProblemSolvePage />} />
      <Route path="/ranking" element={<RankingPage />} />
      <Route path="/members/:memberId" element={<MemberDetailPage />} />
      <Route path="/submissions" element={<SubmissionListPage />} />
      <Route path="/submissions/member/:memberId" element={<SubmissionListPage />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

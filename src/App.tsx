import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import LoginPage from "./pages/login_page/LoginPage";
import SignupPage from "./pages/signup_page/SignupPage";
import FindIDPage from "./pages/findID_page/FindIDPage";
import IntroPage from "./pages/main/IntroPage";
import MyPageContainer from "./pages/myPage/MyPageContainer";
import logo from './logo.svg';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/findID" element={<FindIDPage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/mypage" element={<MyPageContainer />} />
        </Routes>
      </Router>
  );
};

export default App;

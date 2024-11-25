import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./main_page/MainPage";
import LoginPage from "./login_page/LoginPage";
import SignupPage from "./signup_page/SignupPage";
import FindIDPage from "./findID_page/FindIDPage";
import IntroPage from "./main_page/IntroPage";

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
      </Routes>
    </Router>
  );
};

export default App;

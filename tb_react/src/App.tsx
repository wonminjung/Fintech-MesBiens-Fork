import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./main_page/MainPage";
import LoginPage from "./login_page/LoginPage";
import SignupPage from "./signup_page/SignupPage";
import FindIDPage from "./findID_page/FindIDPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/findID" element={<FindIDPage />} />
      </Routes>
    </Router>
  );
};

export default App;

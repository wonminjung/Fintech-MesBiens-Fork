import React from "react";
import "./IntroPage.css";
import "./Calendar.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

const IntroPage: React.FC = () => {
  return (
    <div className="container_main">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="main_container">
          <div className="container_right">
            <h2>Who we are</h2>
            <hr style={{ borderStyle: "solid" }} />
          </div>
        </div>
      </main>
    </div>
  );
};
export default IntroPage;

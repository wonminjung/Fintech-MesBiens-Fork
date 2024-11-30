import React from "react";
// import './MainPage.css'
import "./Calendar/Calendar.css";
import Calendar from "./Calendar/Calendar";
import Summary from "./Summary/Summary";

const MainPage: React.FC = () => {
  return (
    <>
      <Calendar />
      <Summary />
    </>
  );
};
export default MainPage;

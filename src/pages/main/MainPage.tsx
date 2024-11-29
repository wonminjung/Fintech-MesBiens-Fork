import React from "react";
// import './MainPage.css'
// import './Calendar.css'
import Calendar from "./Calendar";
import Summary from "./Summary";

const MainPage: React.FC = () => {
  return (
    <>
      <Calendar />
      <Summary />
    </>
  );
};
export default MainPage;

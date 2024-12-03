import React from "react";
// import './MainPage.css'
import "./Calendar/Calendar.css";
import Calendar from "./Calendar/Calendar";
import Summary from "./Summary/Summary";
import VerticalDivider from "../../components/divider/VerticalDivider";

const MainPage: React.FC = () => {
  return (
    <>
      <Calendar />
        <VerticalDivider margin="40px 0"/>
      <Summary />
    </>
  );
};
export default MainPage;

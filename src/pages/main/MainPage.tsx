import React, { useState } from "react";
// import './MainPage.css'
import "./Calendar/Calendar.css";
import Calendar from "./Calendar/Calendar";
import Summary from "./Summary/Summary";
import VerticalDivider from "../../components/divider/VerticalDivider";
import SmallCalendar from "./Calendar/SmallCalendar";

const MainPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <SmallCalendar onDateSelect={handleDateSelect} />
      <VerticalDivider margin="40px 0" />
      <Summary />
    </>
  );
};

export default MainPage;

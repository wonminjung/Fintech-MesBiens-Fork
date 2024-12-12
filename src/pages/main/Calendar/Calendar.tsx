import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { C } from "./style";
import "./Calendar.css";

interface SmallCalendarProps {
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<SmallCalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const CalendarHeader = () => {
    return (
      <C.CalendarHeader>
        <C.CalendarHeaderButton
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        >
          &lt;
        </C.CalendarHeaderButton>
        <div>
          <span>{format(currentDate, "MMMM")}</span>{" "}
          <span>{format(currentDate, "yyyy")}</span>
        </div>
        <C.CalendarHeaderButton
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        >
          &gt;
        </C.CalendarHeaderButton>
      </C.CalendarHeader>
    );
  };

  const renderDays = () => {
    const days: JSX.Element[] = [];
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    weekDays.forEach((day) => {
      days.push(
        <div className="calendar-day-name" key={day}>
          {day}
        </div>
      );
    });
    return <div className="calendar-days-row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        days.push(
          <C.CalendarDayCellButton
            className={`calendar-cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day.toString()}
            onClick={() => {
              setSelectedDate(cloneDay);
              onDateSelect(cloneDay); // 날짜를 부모로 전달
            }}
          >
            <span>{formattedDate}</span>
          </C.CalendarDayCellButton>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };

  return (
    <div>
      {CalendarHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;

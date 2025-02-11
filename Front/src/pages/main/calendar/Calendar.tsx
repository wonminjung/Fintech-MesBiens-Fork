import React, { useEffect, useState } from "react";
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
import { RootState } from "../../../modules/store/store";
import { useSelector } from "react-redux";

interface SmallCalendarProps {
  onDateSelect: (date: Date, records: RecentData[]) => void;
}

type RecentData = {
  trnsCreateAt: string;
  bankName: string;
  accountNumber: string;
  memberName: string;
  trnsMemo: string;
  categoryName: string;
  trnsBalance: number;
  trnsTypeName: string;
};

const Calendar: React.FC<SmallCalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [recentRecords, setRecentRecords] = useState<RecentData[]>([]);
  const { member } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const newStartDate = oneMonthAgo.toISOString().split("T")[0];
    const newEndDate = today.toISOString().split("T")[0];

    fetchRecentData(newStartDate, newEndDate);
  }, []);

  const fetchRecentData = async (start: string, end: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/transaction/recent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            memberNo: member.memberNo,
            recentStartDate: start,
            recentEndDate: end,
          }),
        }
      );
      const data: RecentData[] = await response.json();
      setRecentRecords(
        data.sort(
          (a, b) =>
            new Date(b.trnsCreateAt).getTime() -
            new Date(a.trnsCreateAt).getTime()
        )
      );
    } catch (error) {
      alert("Failed to fetch recent transactions.");
      console.error(error);
    }
  };

  const handleDateClick = (selectedDay: Date) => {
    setSelectedDate(selectedDay);
    const filteredRecords = recentRecords.filter(
      (record) =>
        record.trnsCreateAt.split("T")[0] === format(selectedDay, "yyyy-MM-dd")
    );
    onDateSelect(selectedDay, filteredRecords);
  };

  const getStatusColor = (trnsTypeName: string) => {
    return trnsTypeName === "DEPOSIT" ? "green" : "red";
  };

  const handleMonthChange = (newDate: Date) => {
    setCurrentDate(newDate);
    const previousMonthStart = startOfMonth(subMonths(newDate, 1));
    const monthEnd = endOfMonth(newDate);

    const today = new Date();
    const isCurrentMonth =
      newDate.getMonth() === today.getMonth() &&
      newDate.getFullYear() === today.getFullYear();

    const newStartDate = previousMonthStart.toISOString().split("T")[0];
    const newEndDate = today.toISOString().split("T")[0];

    fetchRecentData(newStartDate, newEndDate);
  };

  const CalendarHeader = () => (
    <C.CalendarHeader>
      <C.CalendarHeaderButton
        onClick={() => handleMonthChange(subMonths(currentDate, 1))}
      >
        &lt;
      </C.CalendarHeaderButton>
      <div>
        <span>{format(currentDate, "MMMM")}</span>{" "}
        <span>{format(currentDate, "yyyy")}</span>
      </div>
      <C.CalendarHeaderButton
        onClick={() => handleMonthChange(addMonths(currentDate, 1))}
      >
        &gt;
      </C.CalendarHeaderButton>
    </C.CalendarHeader>
  );

  const renderDays = () => {
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    return (
      <div className="calendar-days-row">
        {weekDays.map((day) => (
          <div className="calendar-day-name" key={day}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(endOfMonth(monthStart));

    let day = startDate;
    const rows: JSX.Element[] = [];

    while (day <= endDate) {
      const days: JSX.Element[] = [];

      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const cloneDay = day;

        const recordsForDay = recentRecords.filter(
          (record) =>
            record.trnsCreateAt.split("T")[0] === format(day, "yyyy-MM-dd")
        );

        const totalSum = recordsForDay.reduce((sum, record) => {
          return record.trnsTypeName === "DEPOSIT"
            ? sum + record.trnsBalance
            : sum - record.trnsBalance;
        }, 0);

        days.push(
          <C.CalendarDayCellButton
            key={day.toString()}
            className={`calendar-cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            onClick={() => handleDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
            {recordsForDay.length > 0 && (
              <div style={{ fontSize: "0.8em", marginTop: "25px" }}>
                <div>
                  <div
                    style={{
                      color: totalSum >= 0 ? "green" : "red",
                      marginRight: "10px",
                    }}
                  >
                    {totalSum >= 0
                      ? `+₩${totalSum.toLocaleString()}`
                      : `-₩${Math.abs(totalSum).toLocaleString()}`}
                  </div>
                  <div> 총 {recordsForDay.length} 건</div>
                </div>
              </div>
            )}
          </C.CalendarDayCellButton>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div className="calendar-row" key={day.toString()}>
          {days}
        </div>
      );
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

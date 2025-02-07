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

interface SmallCalendarProps {
  onDateSelect: (date: Date) => void;
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
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [recentRecords, setRecentRecords] = useState<RecentData[]>([]);

  useEffect(() => {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const newStartDate = oneMonthAgo.toISOString().split("T")[0];
    const newEndDate = today.toISOString().split("T")[0];

    setStartDate(newStartDate);
    setEndDate(newEndDate);

    fetchRecentData(newStartDate, newEndDate);

    // 날짜를 설정한 후에 로그 출력
    console.log("Start Date:", newStartDate);
    console.log("End Date:", newEndDate);
    console.log("Today: ", today);
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
            recentStartDate: start,
            recentEndDate: end,
          }),
        }
      );
      const data: RecentData[] = await response.json();
      const sortedRecords = data.sort(
        (a, b) =>
          new Date(b.trnsCreateAt).getTime() -
          new Date(a.trnsCreateAt).getTime()
      );
      setRecentRecords(sortedRecords);
    } catch (error) {
      alert("Failed to fetch recent transactions.");
      console.error(error);
    }
  };

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

  const getStatusColor = (trnsTypeName: string) => {
    switch (trnsTypeName) {
      case "DEPOSIT":
        return "green"; // 입금은 초록색
      case "WITHDRAWAL":
        return "red"; // 출금은 빨간색
      default:
        return "black"; // 기본 색상
    }
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

        // 해당 날짜의 거래 내역을 필터링
        const recordsForDay = recentRecords.filter(
          (record) =>
            record.trnsCreateAt.split("T")[0] === format(day, "yyyy-MM-dd")
        );

        // 계산된 총 거래내역
        const totalSum = recordsForDay.reduce((sum, record) => {
          return record.trnsTypeName === "DEPOSIT"
            ? sum + record.trnsBalance
            : sum - record.trnsBalance;
        }, 0);

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

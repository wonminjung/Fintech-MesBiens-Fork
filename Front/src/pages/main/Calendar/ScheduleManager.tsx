import React, { useState } from "react";
import Calendar from "./Calendar";
import "./Calendar.css";
import { SM, C } from "./style";
import HorizontalDivider from "../../../components/divider/HorizontalDivider";
import { records } from "../../Recent/data";
import CategoryIconMap from "./CategoryIconMap";

interface Schedules {
  [date: string]: string[];
}

const ScheduleManager: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [schedules, setSchedules] = useState<Schedules>({});

  // 날짜 선택 핸들러
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 상태에 따른 색상 반환 함수
  const getStatusColor = (status: string) => {
    switch (status) {
      case "입금":
        return "green"; // 입금은 초록색
      case "출금":
        return "red"; // 출금은 빨간색
      default:
        return "black"; // 기본 색상
    }
  };

  return (
    <SM.ScheduleManager>
      {/* 캘린더 컴포넌트 */}
      <C.Calendar>
        <Calendar onDateSelect={handleDateSelect} />
      </C.Calendar>

      {/* 일정 등록 및 표시 영역 */}
      <SM.ScheduleContainer>
        {selectedDate ? (
          <SM.ScheduleDetails>
            <h3>{`수입 • 지출 내역 | ${formatDate(selectedDate)}`}</h3>
            <HorizontalDivider />
            <br />
            {/* 일정 목록 */}
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              {(schedules[selectedDate.toDateString()] || []).map(
                (schedule, index) => (
                  <li key={index}>{schedule}</li>
                )
              )}
              {records
                .filter((record) => record.date === formatDate(selectedDate))
                .map((record, index) => {
                  const CategoryIconComponent =
                    record.category && CategoryIconMap[record.category]
                      ? CategoryIconMap[record.category]
                      : null; // 카테고리에 따른 아이콘 가져오기
                  return (
                    <SM.ScheduleDetailsCell key={index}>
                      <SM.ImgContainer>
                        {CategoryIconComponent && <CategoryIconComponent />}
                      </SM.ImgContainer>
                      <li style={{ color: getStatusColor(record.status) }}>
                        {record.amount} | [{record.status}]
                      </li>
                    </SM.ScheduleDetailsCell>
                  );
                })}
            </ul>
          </SM.ScheduleDetails>
        ) : (
          <p>날짜를 선택하세요</p>
        )}
      </SM.ScheduleContainer>
    </SM.ScheduleManager>
  );
};

export default ScheduleManager;

import React, { FormEvent, useState } from "react";
import S from "./style";

interface Schedules {
  [date: string]: string[];
}

const Summary: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  ); // 초기값으로 오늘 날짜 문자열 사용
  const [schedules, setSchedules] = useState<Schedules>({});

  // 일정 등록 핸들러
  const handleAddSchedule = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const schedule = (
      form.elements.namedItem("schedule") as HTMLInputElement
    ).value.trim();
    if (!schedule) return;
    // 날짜별로 일정 추가
    setSchedules((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), schedule],
    }));
    form.reset(); //  입력 폼 초기화
  };

  return (
    <S.ContainerRight>
      <h2>요약</h2>
      <hr style={{ borderStyle: "solid" }} />
      <h4>수입 / 지출 내역</h4>
      <form onSubmit={handleAddSchedule}>
        <input name="schedule" placeholder="일정 입력" />
        <button type="submit">추가</button>
      </form>

      <div>
        <h2>일정 목록</h2>
        {schedules[selectedDate]?.map((schedule, index) => (
          <div key={index}>{schedule}</div>
        ))}
      </div>
    </S.ContainerRight>
  );
};

export default Summary;

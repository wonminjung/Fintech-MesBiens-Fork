import React, { FormEvent, useState, ChangeEvent } from "react";
import Calendar from "./Calendar";
import "./Calendar.css";
import { SM, C } from "./style";
import HorizontalDivider from "../../../components/divider/HorizontalDivider";
import DefaultButton from "../../../components/button/DefaultButton";

interface Schedules {
  [date: string]: string[];
}

const ScheduleMaganer: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [schedules, setSchedules] = useState<Schedules>({});

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddSchedule = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const schedule = (form.schedule as HTMLInputElement).value.trim();
    if (!schedule) return;

    setSchedules((prev) => ({
      ...prev,
      [selectedDate!.toDateString()]: [
        ...(prev[selectedDate!.toDateString()] || []),
        schedule,
      ],
    }));
    form.reset();
  };

  return (
    <SM.ScheduleManager>
      {/*캘린더 */}
      <C.Calendar>
        <Calendar onDateSelect={handleDateSelect} />
      </C.Calendar>

      {/* 일정 등록 및 표시 */}
      <SM.ScheduleContainer>
        {selectedDate ? (
          <div className="schedule-details">
            <h3>{`지출 내역 (${selectedDate.toLocaleDateString()})`}</h3>
            <HorizontalDivider />
            <br />
            {/* 일정 등록 폼 */}
            <form onSubmit={handleAddSchedule}>
              <SM.TextInput
                name="schedule"
                placeholder="지출 내역을 입력하세요"
                required
              />
              <SM.Button type="submit">등록</SM.Button>
            </form>
            {/* 일정 목록 */}
            <ul>
              {(schedules[selectedDate.toDateString()] || []).map(
                (schedule, index) => (
                  <li key={index}>{schedule}</li>
                )
              )}
            </ul>
          </div>
        ) : (
          <p>날짜를 선택하세요</p>
        )}
      </SM.ScheduleContainer>
    </SM.ScheduleManager>
  );
};

export default ScheduleMaganer;

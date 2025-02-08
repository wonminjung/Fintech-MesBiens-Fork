import React, { useState } from "react";
import Calendar from "./Calendar";
import "./Calendar.css";
import { SM, C } from "./style";
import HorizontalDivider from "../../../components/divider/HorizontalDivider";
import CategoryIconMap from "./CategoryIconMap";
import { format } from "date-fns";

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

const ScheduleManager: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<RecentData[]>([]);

  const handleDateSelect = (date: Date, records: RecentData[]) => {
    setSelectedDate(date);
    setSelectedRecords(records);
  };

  const formatDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  const getStatusColor = (status: string) => {
    return status === "DEPOSIT" ? "green" : "red";
  };

  return (
    <SM.ScheduleManager>
      <C.Calendar>
        <Calendar onDateSelect={handleDateSelect} />
      </C.Calendar>

      <SM.ScheduleContainer>
        {selectedDate ? (
          <SM.ScheduleDetails>
            <h3>{`수입 • 지출 내역 | ${formatDate(selectedDate)}`}</h3>
            <HorizontalDivider />
            <br />
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              {selectedRecords.length > 0 ? (
                selectedRecords.map((record, index) => {
                  const CategoryIconComponent =
                    record.categoryName && CategoryIconMap[record.categoryName]
                      ? CategoryIconMap[record.categoryName]
                      : null;

                  return (
                    <SM.ScheduleDetailsCell key={index}>
                      <SM.ImgContainer>
                        {CategoryIconComponent && <CategoryIconComponent />}
                      </SM.ImgContainer>
                      <li
                        style={{ color: getStatusColor(record.trnsTypeName) }}
                      >
                        {record.trnsBalance.toLocaleString()}원
                        {/* [{record.trnsTypeName}] */}
                      </li>
                    </SM.ScheduleDetailsCell>
                  );
                })
              ) : (
                <p>해당 날짜의 거래 내역이 없습니다.</p>
              )}
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

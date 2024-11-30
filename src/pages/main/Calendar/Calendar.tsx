import React from "react";
import C from "./style";
import { Button } from "../../../components/button/style";

const Calendar: React.FC = () => {
  return (
    <C.Calendar>
      <h2>지출 캘린더</h2>
      <hr style={{ borderStyle: "solid" }} />
      <C.Month>
        <Button width="45px" height="30px" style={{ margin: "5px" }}>
          ◀
        </Button>
        <h2 id="monthYear">October 2024</h2> {/* 변수 지정하기 */}
        <Button width="45px" height="30px" style={{ margin: "5px" }}>
          ▶
        </Button>
      </C.Month>
      <C.Days>
        <C.Day>일</C.Day>
        <C.Day>월</C.Day>
        <C.Day>화</C.Day>
        <C.Day>수</C.Day>
        <C.Day>목</C.Day>
        <C.Day>금</C.Day>
        <C.Day>토</C.Day>
        {/* 날짜 추가 */}
      </C.Days>
      <C.DateGrid id="dateGrid"></C.DateGrid>
      <hr style={{ borderStyle: "dashed" }} />
    </C.Calendar>
  );
};

export default Calendar;

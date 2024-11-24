import React from 'react'

const Calendar: React.FC = () => {
  return (
    <div className="calendar">
      <header className="calendar_header">
        <h2>지출 캘린더</h2>
        <hr style={{borderStyle: 'solid'}} />
        <div className="month">
          <button id="prevMonth">◀</button>
          <h2 id="monthYear">October 2024</h2>
          <button id="nextMonth">▶</button>
        </div>
      </header>
      <div className="days">
        <div className="day">일</div>
        <div className="day">월</div>
        <div className="day">화</div>
        <div className="day">수</div>
        <div className="day">목</div>
        <div className="day">금</div>
        <div className="day">토</div>
        {/* 날짜 추가 */}
      </div>
      <div className="date-grid" id="dateGrid"></div>
      <hr style={{borderStyle: 'dashed'}} />
    </div>
  )
}

export default Calendar

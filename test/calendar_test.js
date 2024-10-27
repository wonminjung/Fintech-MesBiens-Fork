const dateGrid = document.getElementById('dateGrid');
const monthYear = document.getElementById('monthYear');
const transactionDetails = document.getElementById('transactionDetails');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

let currentMonth = 9; // 0: 1월, 1: 2월, ..., 9: 10월
let currentYear = 2019;

const transactions = {}; // 날짜별 수입/지출 내역 저장

// 달력 생성
function createCalendar(month, year) {
    monthYear.textContent = `${month + 1} ${year}`;
    dateGrid.innerHTML = '';

    const firstDay = new Date(year, month).getDay(); // 첫 번째 날의 요일
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 일 수

    // 빈 공간 추가
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        const emptyDiv = document.createElement('div');
        dateGrid.appendChild(emptyDiv);
    }

    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'date';
        dateDiv.textContent = day;

        // 클릭 이벤트 추가
        dateDiv.addEventListener('click', () => showTransactions(day));

        // 수입 및 지출 내역 추가
        const dateKey = `${day}-${month + 1}-${year}`;
        if (transactions[dateKey]) {
            transactions[dateKey].forEach(trans => {
                const transDiv = document.createElement('div');
                transDiv.className = 'transaction';
                transDiv.textContent = `${trans.type}: ${trans.amount}`;
                dateDiv.appendChild(transDiv);
            });
        }

        dateGrid.appendChild(dateDiv);
    }
}

// 수입/지출 내역 표시
function showTransactions(day) {
    const dateKey = `${day}-${currentMonth + 1}-${currentYear}`;
    const transactionsForDate = transactions[dateKey] || [];

    transactionDetails.innerHTML = `<h3>${monthYear.textContent} ${day}의 내역</h3>`;

    transactionsForDate.forEach(item => {
        transactionDetails.innerHTML += `<div class="transaction">${item.type}: ${item.amount}</div>`;
    });

    // 예시 데이터 추가
    transactionsForDate.push({ type: '수입', amount: `예시 수입 ${day}` });
    transactionsForDate.push({ type: '지출', amount: `예시 지출 ${day}` });

    transactions[dateKey] = transactionsForDate;
}

// 이전 달로 이동
prevMonthButton.addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11; // 12월로 돌아감
        currentYear--;
    } else {
        currentMonth--;
    }
    createCalendar(currentMonth, currentYear);
});

// 다음 달로 이동
nextMonthButton.addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0; // 1월로 돌아감
        currentYear++;
    } else {
        currentMonth++;
    }
    createCalendar(currentMonth, currentYear);
});

// 초기 달력 생성 (10월 2019)
createCalendar(currentMonth, currentYear);

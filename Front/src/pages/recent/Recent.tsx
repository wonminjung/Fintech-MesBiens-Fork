import React, { useState, useEffect, useMemo } from "react";
import "./style.css";
import { R } from "./style";
import { records, Record } from "./data";
import { faBank } from "@fortawesome/free-solid-svg-icons";
import { H1 } from "../../components/htags/style";
import S from "../assets/style";

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

const Recent: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
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

  const filteredRecords = useMemo(
    () =>
      recentRecords.filter((record) => {
        const recordDate = new Date(record.trnsCreateAt);
        return (
          recordDate >= new Date(startDate) &&
          recordDate <= new Date(endDate) &&
          (selectedCategory
            ? record.categoryName === selectedCategory
            : true) &&
          (selectedStatus ? record.trnsTypeName === selectedStatus : true) &&
          (selectedBank ? record.bankName === selectedBank : true)
        );
      }),
    [
      recentRecords,
      startDate,
      endDate,
      selectedCategory,
      selectedStatus,
      selectedBank,
    ]
  );

  const categories = useMemo(
    () =>
      Array.from(new Set(recentRecords.map((record) => record.categoryName))),
    [recentRecords]
  );

  // 상태 배열
  const statuses = ["DEPOSIT", "WITHDRAWAL"];

  // 은행 배열
  const banks = [
    "KB국민은행",
    "우리은행",
    "신한은행",
    "하나은행",
    "IBK기업은행",
  ];

  return (
    <R.TransferContainer>
      <R.TransferHeader>
        <H1>최근 거래내역</H1>
        <R.DateInputContainer>
          <R.DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label style={{ margin: "0 10px" }}>~</label>
          <R.DateInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </R.DateInputContainer>
      </R.TransferHeader>
      <R.TransferTable>
        <R.Table>
          <R.TableHeader>
            <R.TableHeaderRow>날짜</R.TableHeaderRow>
            <R.TableHeaderRow>
              <R.CategorySelectContainer>
                <R.CategorySelect
                  id="bank-select"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                >
                  <option value="">은행</option>
                  {banks.map((banks) => (
                    <option key={banks} value={banks}>
                      {banks}
                    </option>
                  ))}
                </R.CategorySelect>
              </R.CategorySelectContainer>
            </R.TableHeaderRow>
            <R.TableHeaderRow>계좌</R.TableHeaderRow>
            <R.TableHeaderRow>거래 대상</R.TableHeaderRow>
            <R.TableHeaderRow>거래 내용</R.TableHeaderRow>
            <R.TableHeaderRow>
              <R.CategorySelectContainer>
                <R.CategorySelect
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">카테고리</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </R.CategorySelect>
              </R.CategorySelectContainer>
            </R.TableHeaderRow>
            <R.TableHeaderRow>금액</R.TableHeaderRow>
            <R.TableHeaderRow>
              <R.CategorySelectContainer>
                <R.CategorySelect
                  id="status-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">입/출금</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </R.CategorySelect>
              </R.CategorySelectContainer>
            </R.TableHeaderRow>
          </R.TableHeader>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record, index) => (
              <tr key={index}>
                <R.TableRow>{record.trnsCreateAt.split("T")[0]}</R.TableRow>
                <R.TableRow>{record.bankName}</R.TableRow>
                <R.TableRow>{record.accountNumber}</R.TableRow>
                <R.TableRow>{record.memberName}</R.TableRow>
                <R.TableRow>{record.trnsMemo}</R.TableRow>
                <R.TableRow>{record.categoryName}</R.TableRow>
                <R.TableRow>{record.trnsBalance}</R.TableRow>
                <R.TableRow
                  className={`status ${
                    record.trnsTypeName === "DEPOSIT" ? "success" : "failure"
                  }`}
                >
                  {record.trnsTypeName === "DEPOSIT" ? "입금" : "출금"}
                </R.TableRow>
              </tr>
            ))
          ) : (
            <tr>
              <R.TableRow colSpan={7}>
                해당 날짜의 거래 내역이 없습니다.
              </R.TableRow>
            </tr>
          )}
        </R.Table>
      </R.TransferTable>
    </R.TransferContainer>
  );
};

export default Recent;

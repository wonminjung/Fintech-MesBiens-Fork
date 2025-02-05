import React, { useState, useEffect } from "react";
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
  const [records, setRecords] = useState<RecentData[]>([]);

  useEffect(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );

    const newStartDate = firstDayOfMonth.toISOString().split("T")[0];
    const newEndDate = lastDayOfMonth.toISOString().split("T")[0];

    setStartDate(newStartDate);
    setEndDate(newEndDate);

    // 날짜를 설정한 후에 로그 출력
    console.log("Start Date:", newStartDate);
    console.log("End Date:", newEndDate);

    const requestDate = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/transaction/recent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            recentStartDate: newStartDate,
            recentEndDate: newEndDate,
          }),
        }
      );
      const data: RecentData[] = await response.json();
      return data;
    };
    requestDate()
      .then((response) => {
        setRecords(response);
        console.log(response);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  // 특정 날짜에 해당하는 거래 내역을 반환하는 함수
  const getRecordsInRange = (start: string, end: string) => {
    return records.filter(
      (record) =>
        record.trnsCreateAt >= start &&
        record.trnsCreateAt <= end &&
        (selectedCategory ? record.categoryName === selectedCategory : true) &&
        (selectedStatus ? record.trnsTypeName === selectedStatus : true) &&
        (selectedBank ? record.bankName === selectedBank : true)
    );
  };

  const filteredRecords = getRecordsInRange(startDate, endDate);

  // 카테고리 배열 생성 (중복 제거)
  const categories = Array.from(
    new Set(records.map((record) => record.categoryName).filter(Boolean))
  ) as string[];

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
                <R.TableRow>{record.trnsCreateAt}</R.TableRow>
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

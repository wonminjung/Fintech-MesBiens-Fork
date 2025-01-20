import React, { useState, useEffect } from "react";
import "./style.css";
import { R } from "./style";
import { records, Record } from "./data";
import { faBank } from "@fortawesome/free-solid-svg-icons";
import { H1 } from "../../components/htags/style";

const Recent: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    setStartDate(firstDayOfMonth.toISOString().split("T")[0]);
    setEndDate(lastDayOfMonth.toISOString().split("T")[0]);
  }, []);

  // 특정 날짜에 해당하는 거래 내역을 반환하는 함수
  const getRecordsInRange = (start: string, end: string) => {
    return records.filter(
      (record) =>
        record.date >= start &&
        record.date <= end &&
        (selectedCategory ? record.category === selectedCategory : true) &&
        (selectedStatus ? record.status === selectedStatus : true) &&
        (selectedBank ? record.bank === selectedBank : true)
    );
  };

  const filteredRecords = getRecordsInRange(startDate, endDate);

  // 카테고리 배열 생성 (중복 제거)
  const categories = Array.from(
    new Set(records.map((record) => record.category).filter(Boolean))
  ) as string[];

  // 상태 배열
  const statuses = ["입금", "출금"];

  // 은행 배열
  const banks = ["국민", "우리", "신한", "하나", "IBK기업"];

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
                <R.TableRow>{record.date}</R.TableRow>
                <R.TableRow>{record.bank}</R.TableRow>
                <R.TableRow>{record.account}</R.TableRow>
                <R.TableRow>{record.target}</R.TableRow>
                <R.TableRow>{record.details}</R.TableRow>
                <R.TableRow>{record.category}</R.TableRow>
                <R.TableRow>{record.amount}</R.TableRow>
                <R.TableRow
                  className={`status ${record.status === "입금" ? "success" : "failure"
                    }`}
                >
                  {record.status}
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

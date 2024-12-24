import React from "react";
import "./style.css";
import { R } from "./style";

interface Record {
  bank: string;
  date: string;
  account: string;
  target: string;
  details: string;
  amount: string;
  status: string;
}

const Recent: React.FC = () => {
  // 데이터 샘플
  const records: Record[] = [
    {
      bank: "KB국민",
      date: "2024-11-01",
      account: "942902-00-234985",
      target: "서울 월세",
      details: "11월 월세",
      amount: "₩1,200,000",
      status: "완료",
    },
    {
      bank: "우리",
      date: "2024-11-15",
      account: "1002-432-451012",
      target: "김영수",
      details: "용돈 송금",
      amount: "₩300,000",
      status: "완료",
    },
    {
      bank: "신한",
      date: "2024-11-20",
      account: "5678-1234-9876",
      target: "KT 통신비",
      details: "인터넷 요금",
      amount: "₩45,000",
      status: "완료",
    },
  ];

  return (
    <R.AutoTransferContainer>
      <h2 style={{ marginLeft: "40px" }}>최근 거래내역</h2>
      <R.AutoTransferTable>
        <R.Table>
          <R.TableHeader>
            <R.TableHeaderRow>은행</R.TableHeaderRow>
            <R.TableHeaderRow>날짜</R.TableHeaderRow>
            <R.TableHeaderRow>계좌</R.TableHeaderRow>
            <R.TableHeaderRow>거래 대상</R.TableHeaderRow>
            <R.TableHeaderRow>거래 내용</R.TableHeaderRow>
            <R.TableHeaderRow>금액</R.TableHeaderRow>
            <R.TableHeaderRow>상태</R.TableHeaderRow>
          </R.TableHeader>
          {records.map((record, index) => (
            <tr key={index}>
              <R.TableRow>{record.bank}</R.TableRow>
              <R.TableRow>{record.date}</R.TableRow>
              <R.TableRow>{record.account}</R.TableRow>
              <R.TableRow>{record.target}</R.TableRow>
              <R.TableRow>{record.details}</R.TableRow>
              <R.TableRow>{record.amount}</R.TableRow>
              <R.TableRow
                className={`status ${
                  record.status === "완료" ? "success" : "failure"
                }`}
              >
                {record.status}
              </R.TableRow>
            </tr>
          ))}
        </R.Table>
      </R.AutoTransferTable>
    </R.AutoTransferContainer>
  );
};

export default Recent;

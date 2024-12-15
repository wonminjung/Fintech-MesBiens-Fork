import React, { useState } from "react";
import { M, I } from "./style";
// import L from "../login/LoginStyle";
import DefaultInputField from "../../components/inputfield/InputField";
import DefaultButton from "../../components/button/DefaultButton";
import { useNavigate } from "react-router-dom";
import VerticalDivider from "../../components/divider/VerticalDivider";
import { useCookies } from "react-cookie";

const IntroPage_afterLogin: React.FC = () => {
  const [userID, setUserID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const navigate = useNavigate();
  const [cookies] = useCookies<string>(["useID"]); // 쿠키 가져오기

  return (
    <M.MainContainer>
      <M.LeftAreaContainer>
        <h2 style={{ textAlign: "center" }}>Who we are</h2>
        <hr style={{ borderStyle: "solid", width: "200px" }} />
        <h2>금융 종합 웹 서비스 프로그램 개요</h2>
        <h3>1. 기본 기능</h3>
        <ul>
          <li>
            가계부 캘린더: 개인 및 가정의 재정 관리를 돕기 위한 가계부 기능.
            월별, 주별, 일별로 지출과 수입을 기록하고 관리할 수 있습니다.
          </li>
          <li>
            지출 내역 확인 서비스: 각종 지출 내역을 쉽게 확인하고 분석할 수
            있도록 지원합니다. 사용자는 특정 기간 동안의 지출 내역을 조회할 수
            있습니다.
          </li>
          <li>
            송금 서비스: 사용자 간에 간편하고 빠르게 송금할 수 있는 기능을
            제공합니다. 이체 내역을 쉽게 확인할 수 있으며, 자주 사용하는 송금
            대상을 즐겨찾기로 저장할 수 있습니다.
          </li>
          <li>
            계좌 관리: 다양한 은행 계좌를 통합적으로 관리할 수 있는 기능을
            포함합니다. 잔액 조회, 거래 내역 확인, 입출금 등을 손쉽게 수행할 수
            있습니다.
          </li>
        </ul>
        계좌 관리: 다양한 은행 계좌를 통합적으로 관리할 수 있는 기능을
        포함합니다. 잔액 조회, 거래 내역 확인, 입출금 등을 손쉽게 수행할 수
        있습니다.
        <h3>2. 추가 기능</h3>
        <ul>
          <li>
            주식 포트폴리오 서비스: 개인의 투자 성향을 테스트하고 이에 맞는 주식
            종목을 추천해주는 서비스입니다. 투자 성향 분석 결과를 바탕으로
            맞춤형 포트폴리오를 제공합니다.
          </li>
          <li>
            주요 뉴스 확인: 웹 프로그램 내에서 최신 금융 및 경제 뉴스를 확인할
            수 있습니다. 사용자에게 중요한 뉴스를 실시간으로 제공하여 투자
            결정에 도움을 줍니다.
          </li>
        </ul>
      </M.LeftAreaContainer>
      <VerticalDivider margin="40px 0" />

      <div>{cookies.userID ? `저장된 ID: ${cookies.userID}` : ""}</div>
    </M.MainContainer>
  );
};
export default IntroPage_afterLogin;

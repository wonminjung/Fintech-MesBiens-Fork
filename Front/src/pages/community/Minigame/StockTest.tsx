import React from "react";
import DefaultButton from "../../../components/button/DefaultButton";
import { M, ST } from "./style";
import HorizontalDivider from "../../../components/divider/HorizontalDivider";
import ModalFunc from "../../../components/modal/utils/ModalFunc";
import { ModalKeys } from "../../../components/modal/keys/ModalKeys";
import MenuBar from "../MenuBar";
import P from "../style";

const StockTest: React.FC = () => {
  const { handleModal } = ModalFunc();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = document.getElementById("StockTestForm") as HTMLFormElement;
    let totalScore = 0;
    let allAnswered = true;

    // 각 질문의 점수를 합산
    for (let i = 1; i <= 2; i++) {
      // 질문 수에 맞게 숫자 조정
      const answer = form["q" + i] as RadioNodeList;
      const selectedOption = Array.from(answer).find(
        (option) => (option as HTMLInputElement).checked
      );

      if (!selectedOption) {
        allAnswered = false;
        break;
      } else {
        totalScore += parseInt((selectedOption as HTMLInputElement).value);
      }
    }

    // 모든 질문에 응답하지 않았으면 alert 표시
    if (!allAnswered) {
      alert("모든 질문에 답변해 주세요.");
    } else {
      // 점수를 저장하고 추천 페이지로 이동
      localStorage.setItem("investmentScore", totalScore.toString());
      console.log("제출 완료");
      handleModal(ModalKeys.STOCK_TEST_RESULT);
    }
  };

  return (
    <P.MainContainer>
      <MenuBar />
      <ST.StockTestContainer>
        <ST.H1>투자 성향 테스트</ST.H1>
        <HorizontalDivider />
        <ST.StockTestForm id="StockTestForm" onSubmit={onSubmit}>
          <div className="question">
            <ST.Label>1. 당신은 안전한 투자보다 고수익을 원하십니까?</ST.Label>
            <ST.Table>
              <tr>
                <th>전혀 아니다</th>
                <ST.RadioButton name="q1" value="2" />
                <th>아니다</th>
                <ST.RadioButton name="q1" value="4" />
                <th>보통이다</th>
                <ST.RadioButton name="q1" value="6" />
                <th>그렇다</th>
                <ST.RadioButton name="q1" value="8" />
                <th>매우 그렇다</th>
                <ST.RadioButton name="q1" value="10" />
              </tr>
            </ST.Table>
          </div>
          <div className="question">
            <ST.Label>2. 단기 수익보다 장기 투자를 선호하십니까?</ST.Label>
            <ST.Table>
              <tr>
                <th>전혀 아니다</th>
                <ST.RadioButton name="q2" value="2" />
                <th>아니다</th>
                <ST.RadioButton name="q2" value="4" />
                <th>보통이다</th>
                <ST.RadioButton name="q2" value="6" />
                <th>그렇다</th>
                <ST.RadioButton name="q2" value="8" />
                <th>매우 그렇다</th>
                <ST.RadioButton name="q2" value="10" />
              </tr>
            </ST.Table>
          </div>
          {/* 추가적인 질문을 여기에 추가 */}
        </ST.StockTestForm>
        <DefaultButton onClick={onSubmit} width="6em">
          테스트 완료
        </DefaultButton>
      </ST.StockTestContainer>
    </P.MainContainer>
  );
};

export default StockTest;

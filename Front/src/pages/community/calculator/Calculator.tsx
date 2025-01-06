import React, { useState } from "react";
import MenuBar from "../MenuBar";
import C from "./style";
import { H1, H2 } from "../../../components/htags/style";
import ToggleBtn from "../../../components/button/ToggleButton";

const Calculator = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const toggleExplanation = () => {
    setShowExplanation(() => !showExplanation);
  };

  return (
    <C.MainContainer>
      <MenuBar />
      <C.CalculatorContainer>
        <C.TitleContainer>
          <H1>금융 계산기</H1>
          <C.ToggleContainer>
            <H2>용어설명</H2>
            <ToggleBtn onClick={toggleExplanation}>
              {showExplanation ? "용어 설명" : "용어 설명"}{" "}
            </ToggleBtn>
          </C.ToggleContainer>
        </C.TitleContainer>
        <C.TabContainer>
          <H2>예금</H2>
        </C.TabContainer>
        {showExplanation && (
          <C.ExplanationContainer>
            <C.H2>
              예금 계산기 일정 금액을 한번에 납입하는 정기예금입니다. 원하시는
              계산 방식을 선택해 주세요.
            </C.H2>
          </C.ExplanationContainer>
        )}
        <C.ContentContainer>
          <C.Label>
            예치금액
            <C.Input type="string" placeholder="0 원" />
          </C.Label>
          <C.Label>
            에금기간
            <C.Input type="string" placeholder="0 년" />
          </C.Label>
          <C.Label>
            연이자율
            <C.Input type="string" placeholder="0 %" />
          </C.Label>
          <C.Label>이자과세</C.Label>
          <C.ButtonContainer>
            <C.WhiteBtn>초기화</C.WhiteBtn>
            <C.ColorBtn>계산하기</C.ColorBtn>
          </C.ButtonContainer>
        </C.ContentContainer>
      </C.CalculatorContainer>
    </C.MainContainer>
  );
};

export default Calculator;

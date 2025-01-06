import React, { useState } from "react";
import MenuBar from "../MenuBar";
import C from "./style";
import { H1, H2 } from "../../../components/htags/style";

const Calculator = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <C.MainContainer>
      <MenuBar />
      <C.CalculatorContainer>
        <C.TitleContainer>
          <H1>금융계산기</H1>
          <C.ToggleContainer>
            <H2>용어설명</H2>
            <C.ToggleBtn onClick={toggleExplanation}>
              {showExplanation ? "숨기기" : "보기"}{" "}
            </C.ToggleBtn>
          </C.ToggleContainer>
        </C.TitleContainer>
        {showExplanation && (
          <C.ExplanationContainer>
            <H2>
              예금 계산기 일정 금액을 한번에 납입하는 정기예금입니다. 원하시는
              계산 방식을 선택해 주세요.
            </H2>
          </C.ExplanationContainer>
        )}
      </C.CalculatorContainer>
    </C.MainContainer>
  );
};

export default Calculator;

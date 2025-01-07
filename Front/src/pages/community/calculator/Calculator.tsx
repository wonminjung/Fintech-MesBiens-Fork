import React, { useEffect, useState } from "react";
import MenuBar from "../MenuBar";
import C from "./style";
import { H1, H2 } from "../../../components/htags/style";
import ToggleBtn from "../../../components/button/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

type Info = {
  tab: string;
  ex: string;
};

const Calculator = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [info, setInfo] = useState<Info>({ tab: "", ex: "" });

  const toggleExplanation = () => {
    setShowExplanation((prev) => !prev);
  };

  useEffect(() => {
    const fetchCalcExplanationData = async () => {
      try {
        const response = await fetch(
          `${process.env.PUBLIC_URL}/dummyDatas/calculatorExplanation.json`
        );
        const data = await response.json();
        setInfo(data[0]);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };

    fetchCalcExplanationData();
  }, []);

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
          <H2>{info.tab}</H2>
        </C.TabContainer>
        {showExplanation && (
          <C.ExplanationContainer>
            <C.H2>{info.ex}</C.H2>
          </C.ExplanationContainer>
        )}
        <C.ContentContainer>
          <C.Label>
            예치금액
            <C.Input type="string" placeholder="0" /> 원
          </C.Label>
          <C.Label>
            에금기간
            <C.Input type="string" placeholder="0" />
          </C.Label>
          <C.Label>
            연이자율
            <C.Input type="string" placeholder="0 %" />
          </C.Label>
          <C.Label>이자과세</C.Label>
          <C.ButtonContainer>
            <C.WhiteBtn>
              <FontAwesomeIcon icon={faRotateRight} />
              초기화
            </C.WhiteBtn>
            <C.ColorBtn>계산하기</C.ColorBtn>
          </C.ButtonContainer>
        </C.ContentContainer>
      </C.CalculatorContainer>
    </C.MainContainer>
  );
};

export default Calculator;

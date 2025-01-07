import React, { useEffect, useState } from "react";
import MenuBar from "../MenuBar";
import C from "./style";
import { H1, H2 } from "../../../components/htags/style";
import ToggleBtn from "../../../components/button/ToggleButton";
import FirstTab from "./calcPages/FirstTab";
import SecondTab from "./calcPages/SecondTab";
import ThirdTab from "./calcPages/ThirdTab";

type Info = {
  tab: string;
  extitle: string;
  ex: string;
};

const Calculator = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [infos, setInfos] = useState<Info[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("예금");

  const toggleExplanation = () => {
    setShowExplanation((prev) => !prev);
  };

  const handleButtonClick = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const fetchCalcExplanationData = async () => {
      try {
        const response = await fetch(
          `${process.env.PUBLIC_URL}/dummyDatas/calculatorExplanation.json`
        );
        const data = await response.json();
        setInfos(data);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };

    fetchCalcExplanationData();
  }, []);

  const selectedInfo = infos.find((info) => info.tab === selectedTab);

  return (
    <C.MainContainer>
      <C.CalculatorContainer>
        <C.TitleContainer>
          <H1>금융 계산기</H1>
          <C.ToggleContainer>
            <H2>용어 설명</H2>
            <ToggleBtn onClick={toggleExplanation}>
              {showExplanation ? "용어 설명" : "용어 설명"}
            </ToggleBtn>
          </C.ToggleContainer>
        </C.TitleContainer>
        <C.TabContainer>
          {infos.map((info, index) => (
            <C.PlainButton
              key={index}
              onClick={() => handleButtonClick(info.tab)}
            >
              {info.tab}
            </C.PlainButton>
          ))}
        </C.TabContainer>
        {showExplanation && selectedInfo && (
          <C.ExplanationContainerWrap>
            <C.ExplanationContainer>
              <C.H2>{selectedInfo.extitle}</C.H2>
              <C.P>{selectedInfo.ex}</C.P>
            </C.ExplanationContainer>
          </C.ExplanationContainerWrap>
        )}
        <C.ContentContainer>
          {selectedTab === "예금" && <FirstTab />}
          {selectedTab === "적금" && <SecondTab />}
          {selectedTab === "대출" && <ThirdTab />}
        </C.ContentContainer>
      </C.CalculatorContainer>
    </C.MainContainer>
  );
};

export default Calculator;

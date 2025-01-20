import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import C from "../style";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const SecondTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("년");
  const [selectedRate, setSelectedRate] = useState("단리");
  const [selectedTax, setSelectedTax] = useState("일반과세");

  const handlePeriodClick = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleRateClick = (rate: string) => {
    setSelectedRate(rate);
  };

  const handleTaxClick = (tax: string) => {
    setSelectedTax(tax);
  };

  return (
    <>
      <C.Row>
        <C.Label>월납입액</C.Label>
        <C.InputContainer>
          <C.Input type="string" placeholder="0" /> 원
        </C.InputContainer>
      </C.Row>

      <C.Row>
        <C.Label>적립기간</C.Label>
        <C.FirstBtnContainer>
          <C.LeftTabBtn
            onClick={() => handlePeriodClick("년")}
            className={selectedPeriod === "년" ? "active" : ""}
          >
            년
          </C.LeftTabBtn>
          <C.RightTabBtn
            onClick={() => handlePeriodClick("개월")}
            className={selectedPeriod === "개월" ? "active" : ""}
          >
            월
          </C.RightTabBtn>
        </C.FirstBtnContainer>
        <C.InputContainer>
          <C.Input type="string" placeholder="0" />
          {selectedPeriod}
        </C.InputContainer>
      </C.Row>

      <C.Row>
        <C.Label>연이자율</C.Label>
        <C.SecondBtnContainer>
          <C.LeftTabBtn
            onClick={() => handleRateClick("단리")}
            className={selectedRate === "단리" ? "active" : ""}
          >
            단리
          </C.LeftTabBtn>
          <C.RightTabBtn
            onClick={() => handleRateClick("월복리")}
            className={selectedRate === "월복리" ? "active" : ""}
          >
            월복리
          </C.RightTabBtn>
        </C.SecondBtnContainer>
        <C.InputContainer>
          <C.Input type="string" placeholder="0" />%
        </C.InputContainer>
      </C.Row>

      <C.Row>
        <C.Label>이자과세</C.Label>
        <C.ThirdBtnContainer>
          <C.LeftTabBtn
            onClick={() => handleTaxClick("일반과세")}
            className={selectedTax === "일반과세" ? "active" : ""}
          >
            일반과세
          </C.LeftTabBtn>
          <C.CenterTabBtn
            onClick={() => handleTaxClick("비과세")}
            className={selectedTax === "비과세" ? "active" : ""}
          >
            비과세
          </C.CenterTabBtn>
          <C.RightTabBtn
            onClick={() => handleTaxClick("세금우대")}
            className={selectedTax === "세금우대" ? "active" : ""}
          >
            세금우대
          </C.RightTabBtn>
        </C.ThirdBtnContainer>
      </C.Row>

      <C.ButtonContainer>
        <C.WhiteBtn>
          <FontAwesomeIcon icon={faRotateRight} />
          초기화
        </C.WhiteBtn>
        <C.ColorBtn>계산하기</C.ColorBtn>
      </C.ButtonContainer>
    </>
  );
};

export default SecondTab;

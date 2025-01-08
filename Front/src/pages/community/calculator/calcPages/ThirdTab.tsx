import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import C from "../style";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ThirdTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("년");
  const [selectedMethod, setSelectedMethod] = useState("원리금균등");

  const handlePeriodClick = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleMethodClick = (method: string) => {
    setSelectedMethod(method);
  };

  return (
    <>
      <C.Row>
        <C.Label>대출금액</C.Label>
        <C.InputContainer>
          <C.Input type="string" placeholder="0" /> 원
        </C.InputContainer>
      </C.Row>

      <C.Row>
        <C.Label>대출기간</C.Label>
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
        <C.Label>대출금리</C.Label>
        <C.InputContainer>
          <C.Input type="string" placeholder="0" />%
        </C.InputContainer>
      </C.Row>

      <C.Row>
        <C.Label>상환방법</C.Label>
        <C.ThirdBtnContainer>
          <C.LeftTabBtn
            onClick={() => handleMethodClick("원리금균등")}
            className={selectedMethod === "원리금균등" ? "active" : ""}
          >
            원리금균등
          </C.LeftTabBtn>
          <C.CenterTabBtn
            onClick={() => handleMethodClick("원금균등")}
            className={selectedMethod === "원금균등" ? "active" : ""}
          >
            원금균등
          </C.CenterTabBtn>
          <C.RightTabBtn
            onClick={() => handleMethodClick("만기일시")}
            className={selectedMethod === "만기일시" ? "active" : ""}
          >
            만기일시
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

export default ThirdTab;

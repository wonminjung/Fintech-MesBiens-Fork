import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import C from "../style";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const SecondTab = () => {
  return (
    <>
      <C.Label>
        대출금액
        <C.Input type="string" placeholder="0" /> 원
      </C.Label>
      <C.Label>
        대출기간
        <C.TabBtnContainer>
          <C.LeftTabBtn>년</C.LeftTabBtn>
          <C.RightTabBtn>월</C.RightTabBtn>
        </C.TabBtnContainer>
        <C.Input type="string" placeholder="0" />{" "}
      </C.Label>
      <C.Label>
        대출금리
        <C.Input type="string" placeholder="0" />
      </C.Label>
      <C.Label>
        상환방법
        <C.LeftTabBtn>원리금균등</C.LeftTabBtn>
        <C.CenterTabBtn>원금균등</C.CenterTabBtn>
        <C.RightTabBtn>만기일시</C.RightTabBtn>
      </C.Label>
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

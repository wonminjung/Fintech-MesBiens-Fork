import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import C from "../style";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const ThirdTab = () => {
  return (
    <>
      <C.Label>
        월납입액
        <C.Input type="string" placeholder="0" /> 원
      </C.Label>
      <C.Label>
        적립기간
        <C.TabBtnContainer>
          <C.LeftTabBtn>년</C.LeftTabBtn>
          <C.RightTabBtn>월</C.RightTabBtn>
        </C.TabBtnContainer>
        <C.Input type="string" placeholder="0" />{" "}
      </C.Label>
      <C.Label>
        연이자율
        <C.TabBtnContainer>
          <C.LeftTabBtn>단리</C.LeftTabBtn>
          <C.RightTabBtn>월복리</C.RightTabBtn>
        </C.TabBtnContainer>
        <C.Input type="string" placeholder="0" />
      </C.Label>
      <C.Label>
        이자과세
        <C.LeftTabBtn>일반과세</C.LeftTabBtn>
        <C.CenterTabBtn>비과세</C.CenterTabBtn>
        <C.RightTabBtn>세금우대</C.RightTabBtn>
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

export default ThirdTab;

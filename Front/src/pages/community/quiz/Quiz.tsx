import React from "react";
import P from "../style";
import MenuBar from "../MenuBar";
import { M } from "./style";
import { H1 } from "../../../components/htags/style";

const Recommend: React.FC = () => {
  return (
    <M.MainContainer>
      <M.Tiles>
        <H1>주식 투자 성향 테스트</H1>
        {/* 출처 남기기 */}
        <M.Link to="https://www.mk.co.kr/mcti/desc#slide3">
          <M.Img
            src={`${process.env.PUBLIC_URL}/images/minigame/stocktestthumbnail.jpg`}
          />
          <M.Button>테스트 하러가기</M.Button>
        </M.Link>
      </M.Tiles>
      <M.Tiles>
        <H1>퀴즈로 배우는 시사경제</H1>
        {/* 출처 : 기획재정부 경제배움 > 경제로 놀자 > 퀴즈로 배우는 시사경제 */}
        <M.Link to="https://www.econedu.go.kr/user/playEcon/quizLeanCurrEcon/menu/main">
          <M.Img
            src={`${process.env.PUBLIC_URL}/images/minigame/econquizthumbnail.png`}
            style={{ width: "60%" }}
          />
          <M.Button>테스트 하러가기</M.Button>
        </M.Link>
      </M.Tiles>
      <M.Tiles>
        <H1>나의 경제 EBTI 진단하기</H1>
        {/* 출처 : 기획재정부 경제배움 > 경제로 놀자 > 나의 경제 습관 테스트 > 경제 EBTI 진단하기 */}
        <M.Link to="https://www.econedu.go.kr/user/playEcon/econEbti/menu/main">
          <M.Img
            src={`${process.env.PUBLIC_URL}/images/minigame/econthumbnail.png`}
            style={{ width: "60%" }}
          />
          <M.Button>테스트 하러가기</M.Button>
        </M.Link>
      </M.Tiles>
    </M.MainContainer>
  );
};

export default Recommend;

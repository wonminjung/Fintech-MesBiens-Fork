import React from "react";
import P from "../style";
import MenuBar from "../MenuBar";
import { Link } from "react-router-dom";
import PlainButton from "../../../components/button/PlainButton";

const Recommend: React.FC = () => {
  return (
    <P.MainContainer>
      <MenuBar />
      <div className="recommendation-container">
        <Link to="/StockTest">
          <PlainButton width="15em">투자 성향 테스트 하러가기</PlainButton>
        </Link>
        <h3>추천 주식</h3>
        <div id="recommendations">
          {/* 점수에 따른 추천 주식이 여기에 표시 */}
        </div>
      </div>
    </P.MainContainer>
  );
};

export default Recommend;

import React, { useEffect, useState } from "react";
import P from "../style";
import MenuBar from "../MenuBar";
import { Link, useLocation } from "react-router-dom";
import DefaultButton from "../../../components/button/DefaultButton";
import { R } from "./style";

const Recommend: React.FC = () => {
  const location = useLocation();
  const [recommendations, setRecommendations] = useState<string>("");

  useEffect(() => {
    if (location.state?.submitted) {
      const score = parseInt(localStorage.getItem("investmentScore") || "0");
      let recommendationsText = "";
      if (score <= 8) {
        recommendationsText =
          "보수적인 투자자에게 적합한 안정적인 주식 : 삼성전자, LG화학";
      } else if (score < 16) {
        recommendationsText =
          "중립적인 투자자에게 적합한 주식 : 현대차, 카카오";
      } else {
        recommendationsText =
          "공격적인 투자자에게 적합한 고위험 주식 : 셀트리온, 두산중공업";
      }

      setRecommendations(recommendationsText);
    }
  }, [location.state]);

  return (
    <P.MainContainer>
      <MenuBar />
      <R.RecommendationContainer>
        <R.Link to="/StockTest">
          <DefaultButton width="15em">투자 성향 테스트 하러가기</DefaultButton>
        </R.Link>
        {location.state?.submitted && (
          <>
            <h1 style={{ fontSize: "40px" }}>추천 주식</h1>
            <div id="recommendations">
              <p>{recommendations}</p>
              {/* 점수에 따른 추천 주식이 여기에 표시 */}
            </div>
          </>
        )}
      </R.RecommendationContainer>
    </P.MainContainer>
  );
};

export default Recommend;

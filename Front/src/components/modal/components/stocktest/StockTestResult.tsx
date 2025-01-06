import React, { useEffect, useState } from "react";
import { ST } from "../../../../pages/community/quiz/style";

const StockTestResult: React.FC = () => {
  const [recommendations, setRecommendations] = useState<string>("");

  useEffect(() => {
    const score = localStorage.getItem("investmentScore");
    console.log(score);
    let scoreResult = score ? parseInt(score) : 0;
    let recommendationsText = "";
    if (scoreResult <= 8) {
      recommendationsText =
        "보수적인 투자자에게 적합한 안정적인 주식 : 삼성전자, LG화학";
    } else if (scoreResult < 16) {
      recommendationsText = "중립적인 투자자에게 적합한 주식 : 현대차, 카카오";
    } else {
      recommendationsText =
        "공격적인 투자자에게 적합한 고위험 주식 : 셀트리온, 두산중공업";
    }
    setRecommendations(recommendationsText);
  }, []);

  return (
    <ST.StockTestContainer>
      <h1 style={{ fontSize: "40px" }}>추천 주식</h1>
      <div id="recommendations">
        <p>{recommendations}</p>
        {/* 점수에 따른 추천 주식이 여기에 표시 */}
      </div>
    </ST.StockTestContainer>
  );
};

export default StockTestResult;

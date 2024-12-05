import React from "react";
import S from "./style";

const Summary: React.FC = () => {
  return (
    <S.ContainerRight>
      <h2>요약</h2>
      <hr style={{ borderStyle: "solid" }} />
      <h4>수입 / 지출 내역</h4>
      <div id="transactionDetails" />
    </S.ContainerRight>
  );
};

export default Summary;

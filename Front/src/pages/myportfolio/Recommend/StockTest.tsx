import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultButton from "../../../components/button/DefaultButton";
import submitTest from "./SubmitStockTest";
import { ST } from "./style";
import HorizontalDivider from "../../../components/divider/HorizontalDivider";

const StockTest: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    submitTest(event, (path: string) =>
      navigate(path, { state: { submitted: true } })
    );
  };

  return (
    <>
      <ST.StockTestContainer>
        <h1 style={{ textAlign: "center", fontSize: "40px" }}>
          투자 성향 테스트
        </h1>
        <HorizontalDivider />
        <ST.StockTestForm id="StockTestForm" onSubmit={onSubmit}>
          <div className="question">
            <ST.Label>1. 당신은 안전한 투자보다 고수익을 원하십니까?</ST.Label>
            <ST.Table>
              <tr>
                <th>전혀 아니다</th>
                <ST.RadioButton name="q1" value="2" />
                <th>아니다</th>
                <ST.RadioButton name="q1" value="4" />
                <th>보통이다</th>
                <ST.RadioButton name="q1" value="6" />
                <th>그렇다</th>
                <ST.RadioButton name="q1" value="8" />
                <th>매우 그렇다</th>
                <ST.RadioButton name="q1" value="10" />
              </tr>
            </ST.Table>
          </div>
          <div className="question">
            <ST.Label>2. 단기 수익보다 장기 투자를 선호하십니까?</ST.Label>
            <ST.Table>
              <tr>
                <th>전혀 아니다</th>
                <ST.RadioButton name="q2" value="2" />
                <th>아니다</th>
                <ST.RadioButton name="q2" value="4" />
                <th>보통이다</th>
                <ST.RadioButton name="q2" value="6" />
                <th>그렇다</th>
                <ST.RadioButton name="q2" value="8" />
                <th>매우 그렇다</th>
                <ST.RadioButton name="q2" value="10" />
              </tr>
            </ST.Table>
          </div>
          {/* 추가적인 질문을 여기에 추가 */}
        </ST.StockTestForm>
        <DefaultButton onClick={onSubmit} width="6em">
          테스트 완료
        </DefaultButton>
      </ST.StockTestContainer>
    </>
  );
};

export default StockTest;

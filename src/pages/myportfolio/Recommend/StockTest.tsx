import React from "react";
import R from "./style";
import { useNavigate } from "react-router-dom";

const StockTest: React.FC = () => {
  const navigate = useNavigate();

  const onClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    navigate("/P_recommend");
  };

  return (
    <>
      <div className="test-container">
        <h3>투자 성향 테스트</h3>
        <form id="test-form">
          <div className="question">
            <label>1. 당신은 안전한 투자보다 고수익을 원하십니까?</label>
            <table>
              <tr>
                <th>전혀 아니다</th>
                <R.RadioButton name="q1" value="1" />
                <th>아니다</th>
                <R.RadioButton name="q1" value="2" />
                <th>보통이다</th>
                <R.RadioButton name="q1" value="3" />
                <th>그렇다</th>
                <R.RadioButton name="q1" value="4" />
                <th>매우 그렇다</th>
                <R.RadioButton name="q1" value="5" />
              </tr>
            </table>
          </div>
          <div className="question">
            <label>2. 단기 수익보다 장기 투자를 선호하십니까?</label>
            <table>
              <tr>
                <th>전혀 아니다</th>
                <R.RadioButton name="q2" value="1" />
                <th>아니다</th>
                <R.RadioButton name="q2" value="2" />
                <th>보통이다</th>
                <R.RadioButton name="q2" value="3" />
                <th>그렇다</th>
                <R.RadioButton name="q2" value="4" />
                <th>매우 그렇다</th>
                <R.RadioButton name="q2" value="5" />
              </tr>
            </table>
          </div>
          {/* 추가적인 질문을 여기에 추가 */}
          <br />
          <button type="button" onClick={onClick}>
            테스트 완료
          </button>
        </form>
      </div>
    </>
  );
};

export default StockTest;

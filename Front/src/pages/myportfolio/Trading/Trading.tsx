import React from "react";
import P from "../style";
import { T } from "./style";
import MenuBar from "../MenuBar";
import DefaultButton from "../../../components/button/DefaultButton";

const Transaction: React.FC = () => {
  return (
    <P.MainContainer>
      <MenuBar />
      <T.Trading>
        <T.TopRow>
          <T.ChartContainer>
            <p>차트 이미지</p>
          </T.ChartContainer>
          <T.StockList>
            <h1>주식 리스트</h1>
          </T.StockList>
        </T.TopRow>
        <T.BottomRow>
          <T.BuySellContainer>
            <label>금액 (KRW) :</label>
            <input type="text" id="ammount" placeholder="금액 입력" />
            <label>수량 :</label>
            <input type="text" id="quantity" placeholder="수량 입력" />
            <T.ButtonContainer>
              <DefaultButton width="3em" height="2em">
                매수
              </DefaultButton>
              <DefaultButton width="3em" height="2em">
                매도
              </DefaultButton>
            </T.ButtonContainer>
          </T.BuySellContainer>
          <T.OrderHistory>
            <h1>주문 내역</h1>
            <table>
              <tr>
                <th>시간</th>
                <th>종목</th>
                <th>가격</th>
                <th>수량</th>
                <th>상태</th>
              </tr>
            </table>
          </T.OrderHistory>
        </T.BottomRow>
      </T.Trading>
    </P.MainContainer>
  );
};

export default Transaction;

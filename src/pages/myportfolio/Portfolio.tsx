import React from "react";
import P from "./style";
import MenuBar from "./MenuBar";
import VerticalDivider from "../../components/divider/VerticalDivider";

const Portfolio: React.FC = () => {
  return (
    <P.MainContainer>
      <MenuBar />
      <P.BottomContainer>
        <P.PortfolioItem>
          <h3>나의 보유 주식 포트폴리오</h3>
          <P.PortfolioContent>
            <div style={{ display: "flex" }}>
              <P.PortfolioChart id="portfolioChart" />
            </div>
          </P.PortfolioContent>
        </P.PortfolioItem>
        <VerticalDivider />
        <P.PortfolioItem>
          <P.H3>보유 주식 리스트</P.H3>
          <P.StockList>
            <table>
              <thead>
                <tr>
                  <th>주식명</th>
                  <th>종가</th>
                  <th>등락폭</th>
                  <th>전일대비</th>
                  <th>현재가격</th>
                </tr>
              </thead>
              <tbody id="stockList"></tbody>
            </table>
          </P.StockList>
        </P.PortfolioItem>
      </P.BottomContainer>
    </P.MainContainer>
  );
};

export default Portfolio;

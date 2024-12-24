import React from "react";
import P from "../style";
import MenuBar from "../MenuBar";
import VerticalDivider from "../../../components/divider/VerticalDivider";
import StockChart from "./StockChart";
import StockTable from "./StockTable";

const Portfolio: React.FC = () => {
  return (
    <P.MainContainer>
      <MenuBar />
      <P.BottomContainer>
        <P.PortfolioItem>
          <h3>나의 보유 주식 포트폴리오</h3>
          <StockChart />
        </P.PortfolioItem>
        <VerticalDivider />
        <P.PortfolioItem>
          <P.H3>보유 주식 리스트</P.H3>
          <StockTable />
        </P.PortfolioItem>
      </P.BottomContainer>
    </P.MainContainer>
  );
};

export default Portfolio;

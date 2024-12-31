import React from "react";
import P from "./style";
import { useNavigate } from "react-router-dom";

const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const Portfolio = () => {
    navigate("/P_portfolio");
  };
  const News = () => {
    navigate("/P_news");
  };
  const Recommend = () => {
    navigate("/P_recommend");
  };
  const Transaction = () => {
    navigate("/P_transaction");
  };
  const Notice = () => {
    navigate("/P_board");
  };

  return (
    <P.MenuBar>
      <ul>
        {/* <li>
          <P.MenuButton onClick={Portfolio}>포트폴리오</P.MenuButton>
        </li> */}
        <li>
          <P.MenuButton onClick={News}>뉴스</P.MenuButton>
        </li>
        <li>
          <P.MenuButton onClick={Recommend}>주식 추천</P.MenuButton>
        </li>
        {/* <li>
          <P.MenuButton onClick={Transaction}>주식 거래</P.MenuButton>
        </li> */}
        <li>
          <P.MenuButton onClick={Notice}>자유 게시판</P.MenuButton>
        </li>
      </ul>
    </P.MenuBar>
  );
};

export default MenuBar;

import React from "react";
import P from "./style";
import { useNavigate } from "react-router-dom";

const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const News = () => {
    navigate("/C_news");
  };
  const Quiz = () => {
    navigate("/C_quiz");
  };
  const Calculator = () => {
    navigate("/C_calculator");
  };
  const Board = () => {
    navigate("/C_board");
  };

  return (
    <P.MenuBar>
      <ul>
        <li>
          <P.MenuButton onClick={News}>뉴스</P.MenuButton>
        </li>
        <li>
          <P.MenuButton onClick={Quiz}>심리 테스트</P.MenuButton>
        </li>
        <li>
          <P.MenuButton onClick={Calculator}>금융 계산기</P.MenuButton>
        </li>
        <li>
          <P.MenuButton onClick={Board}>자유 게시판</P.MenuButton>
        </li>
      </ul>
    </P.MenuBar>
  );
};

export default MenuBar;

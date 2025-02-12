import React from "react";
import P from "./style";
import { Link } from "react-router-dom";

const MenuBar: React.FC = () => {
  return (
    <>
      <P.MenuBar>
        <ul>
          <li>
            <Link to={"C_board"}>
              <P.MenuButton>자유 게시판</P.MenuButton>
            </Link>
          </li>
          {/* <li>
            <Link to={"C_news"}>
              <P.MenuButton>뉴스</P.MenuButton>
            </Link>
          </li> */}
          <li>
            <Link to={"C_quiz"}>
              <P.MenuButton>심리 테스트</P.MenuButton>
            </Link>
          </li>
          {/* <li>
            <Link to={"C_calculator"}>
              <P.MenuButton>금융 계산기</P.MenuButton>
            </Link>
          </li> */}
        </ul>
      </P.MenuBar>
    </>
  );
};

export default MenuBar;

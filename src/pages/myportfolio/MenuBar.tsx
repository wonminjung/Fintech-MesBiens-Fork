import React from "react";
import P from "./style";
import { useNavigate } from "react-router-dom";
import PlainButton from "../../components/button/PlainButton";

const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const Notification = () => {
    navigate("/P_notification");
  };

  return (
    <P.MenuBar>
      <ul>
        <li>
          <P.MenuButton href="/P_portfolio">포트폴리오</P.MenuButton>
        </li>
        <li>
          <P.MenuButton href="/P_news">뉴스</P.MenuButton>
        </li>
        <li>
          <P.MenuButton href="/P_recommend">주식 추천</P.MenuButton>
        </li>
        <li>
          <P.MenuButton href="/P_transaction">주식 거래</P.MenuButton>
        </li>
        <li>
          <P.MenuButton href="/P_notice">자유 게시판</P.MenuButton>
        </li>
      </ul>
      <PlainButton onClick={Notification}>
        <img
          src={`${process.env.PUBLIC_URL}/images/NotificationIcon.png`}
          alt="Notification"
        />
        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
      </PlainButton>
    </P.MenuBar>
  );
};

export default MenuBar;

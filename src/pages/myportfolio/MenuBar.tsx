import React from "react";
import P from "./style";
import { useNavigate } from "react-router-dom";
import PlainButton from "../../components/button/PlainButton";
import Transaction from "./Trading/Trading";

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
  const Notification = () => {
    navigate("/P_notification");
  };

  return (
    <P.MenuBar>
      <ul>
        <li>
          <P.MenuButton onClick={Portfolio}>포트폴리오</P.MenuButton>
        </li>
        <li>
          <P.MenuButton onClick={News}>뉴스</P.MenuButton>
        </li>
        <li>
          <P.MenuButton onClick={Recommend}>주식 추천</P.MenuButton>
        </li>
        <li>
          <P.MenuButton onClick={Transaction}>주식 거래</P.MenuButton>
        </li>
        <li>
          <P.MenuButton onClick={Notice}>자유 게시판</P.MenuButton>
        </li>
        <PlainButton onClick={Notification}>
          <img
            src={`${process.env.PUBLIC_URL}/images/NotificationIcon.png`}
            alt="Notification"
          />
        </PlainButton>
      </ul>
    </P.MenuBar>
  );
};

export default MenuBar;

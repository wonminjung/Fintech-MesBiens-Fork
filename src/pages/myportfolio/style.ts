import styled from "styled-components";
import PortfolioArea from "./PortfolioArea";

const P = {
  MainContainer: styled.div`
    display: inline-block;
    border-radius: var(--container-border-radius);
    width: 100%;
    height: 100%;
  `,
  MenuBar: styled.nav`
    background-color: white; /* 배경색을 흰색으로 변경 */
    font-size: 20px; /* 글자 크기 증가 */
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
    & ul {
      list-style: none; /* 리스트 불릿 제거 */
      padding: 0; /* 기본 패딩 제거 */
      margin: 0; /* 기본 마진 제거 */
      display: flex; /* 가로로 아이템 배치 */
      gap: 3em; /* 메뉴 간 간격을 넓힘 */
      & li {
        margin: 0 15px;
      }
    }
  `,
  MenuButton: styled.a`
    text-decoration: none; /* 링크 밑줄 제거 */
    font-weight: bold; /* 글자 굵게 */
    padding: 10px 20px;
    /* box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* 약간의 그림자 추가 */
    transition: all 0.3s ease; /* 부드러운 전환 효과 */
    box-sizing: border-box; /* 패딩과 테두리를 요소의 크기 내에 포함 */
    overflow: visible; /* 박스가 짤리지 않도록 설정 */
    margin: 5px; /* 메뉴 항목 사이의 간격을 추가하여 짤림 방지 */
    color: black;
    background-color: white;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 0;
      height: 2px;
      background-color: black;
      transition: width 0.3s ease-in;
    }
    &:hover::after {
      width: 100%;
    }
  `,
  BottomContainer: styled.div`
    display: flex;
    justify-content: space-around;
    padding: 20px;
  `,
  PortfolioItem: styled.div`
    width: 45%;
    /* border: 1px solid #ccc; */
    border-radius: 8px;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    background-color: var(--forth-color);
  `,
  PortfolioContent: styled.div`
    display: flex;
    align-items: center; /* 세로 중앙 정렬 */
    gap: 20px; /* 차트와 요약 정보 간격 */
  `,
  PortfolioChart: styled.canvas`
    width: 100%;
    height: auto;
  `,
  StockList: styled.div`
    background-color: var(--second-color);
    width: 100%;
    border-radius: 10px;
    padding: 2px;
    overflow: hidden;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    & table {
      width: 100%;
      border-collapse: collapse;
    }
  `,
  H3: styled.h3`
    padding: 0;
  `,
};

export default P;

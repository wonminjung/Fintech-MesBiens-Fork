import styled from "styled-components";

const S = {
  SideBarContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 15%;
    min-width: 250px;
    background: var(--gradient);
    color: #fff;
    padding: 20px 0 20px 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;

    /* 24.11.25 추가. 웹 페이지 하단에 뜨던 부분 없애줌 */
    height: 100vh;
    box-sizing: border-box;
  `,
  SideBarTitle: styled.h2`
    text-align: center;
    font-size: 24px;
    margin-right: 7%;
    padding: 4px;
    border-radius: 10px;

    & > p {
      margin: 0;
      padding: 0;
    }
  `,
  SideMenuListContainer: styled.nav`
    & > ul {
      list-style: none;
      padding: 0;

      & > li {
        cursor: pointer;
        position: relative;

        & > a {
          color: var(--text-color-white);
          text-decoration: none;
          color: var(--text-color-white);
          display: block;
          padding: 15px 10px;
          transition: background-color 0.3s;
        }
        margin-left: 3em;

        /* 메뉴에 마우스 호버 시 효과 */
        &:hover {
          background-color: var(--bg-color);
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;

          &:before,
          &:after {
            content: "";
            position: absolute;
            right: 0;
            border-radius: 50px;
            box-shadow: 10px 10px black;
            width: 30px;
            height: 30px;
          }

          &:before {
            bottom: 100%;
            box-shadow: 16px 16px var(--bg-hover-color);
          }

          &:after {
            top: 100%;
            box-shadow: 16px -16px var(--bg-hover-color);
          }

          & > a {
            color: var(--text-color-black);
          }
        }
      }
    }
  `,
  Ppl: styled.iframe`
    width: 90%;
    height: 100%;
    border-radius: 20px;
    margin-top: 1em;
  `,
};

export default S;

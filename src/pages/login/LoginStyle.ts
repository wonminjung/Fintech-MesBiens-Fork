import styled from "styled-components";

const L = {
  Body: styled.body`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  MainContainer: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    max-width: 500px;
    width: 470px;
    height: 100%;
  `,
  Container_top: styled.div`
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: var(--container-top-border-radius);
    background: var(--first-color);
    align-items: center;
    color: var(--white);
  `,
  Container_bottom: styled.div`
    background-color: var(--bg-color);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: var(--container-bottom-border-radius);
    background: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 55px 10px 55px;
  `,
  RememberMe: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 10%;
    color: var(--text-color-grey);
    input[type="checkbox"] {
      //display: none; /* 기본 체크박스 숨기기 */
      & + label {
        position: relative;
        padding-left: 25px; /* 체크박스 공간 */
        cursor: pointer;

        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 20px; /* 체크박스 크기 */
          height: 20px; /* 체크박스 크기 */
          border: 2px solid var(--third-color); /* 테두리 색 */
          border-radius: 8px; /* 모서리 둥글게 */
          background-color: white; /* 배경색 */
          transition: background-color 0.3s, border-color 0.3s; /* 애니메이션 효과 */
        }

        &:checked + label:before {
          background-color: var(--second-color); /* 체크박스 체크 시 배경색 */
          border-color: var(--second-color); /* 체크 시 테두리 색 */
        }

        &:checked + label:after {
          content: "";
          position: absolute;
          left: 8px; /* 체크 표시 위치 */
          top: 3px; /* 체크 표시 위치 */
          width: 5px; /* 체크 표시 두께 */
          height: 10px; /* 체크 표시 높이 */
          border: solid var(--white); /* 체크 표시 색 */
          border-width: 0 2px 2px 0; /* 체크 표시 형태 */
          transform: rotate(45deg); /* 체크 표시 회전 */
        }
      }
    }
  `,
  SignUp: styled.div`
    display: flex;
    flex-direction: column; /* 세로 방향으로 나열 */
    justify-content: space-between;
    text-align: left;
    width: 80%;
    & a {
      text-align: right;
      text-decoration: none;
      color: var(--text-color-dark);
      &:hover {
        text-decoration: underline;
      }
    }
  `,
  IntroPage: styled.div`
    display: flex;
    justify-content: right;
    width: 90%;
    & a {
      text-decoration: none;
      color: var(--text-color-dark);
      &:hover {
        text-decoration: underline;
      }
    }
  `,
  Divider: styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    margin: 15px 20px 20px 20px;
    &:before,
    &:after {
      content: "";
      flex: 1; /* 양쪽 선이 동일한 비율로 늘어남 */
      height: 1px; /* 선의 두께 */
      background-color: #ccc; /* 선의 색상 */
    }
    & span {
      padding: 0 10px; /* 텍스트 주변 여백 */
      color: #999; /* 텍스트 색상 */
      font-size: small;
    }
  `,
  SNSLogin: styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 4em;
    margin-right: 4em;
    margin-bottom: 1em;
  `,
  SNSButton: styled.button`
    background-size: cover;
    background-repeat: no-repeat;
    width: 4em;
    height: 4em;
    border: none;
    cursor: pointer;
    border-radius: var(--sns-border-radius);
    margin-bottom: 10px;
  `,
  P_tag: styled.p`
    font-size: 1em;
    color: var(--text-color-grey);
  `,

  /* FindIDPage */
  Container_tab: styled.div`
    display: flex;
    justify-content: space-around;
    background-color: var(--white);
    /* padding: 10px; */
    & button {
      background-color: transparent;
      border: none;
      padding: 10px;
      cursor: pointer;
      font-size: 16px;
      &:hover {
        background-color: var(--bg-hover-color);
      }
    }
    & button.active {
      font-weight: bold;
      border-bottom: 2px solid var(--second-color);
    }
  `,
};

export default L;

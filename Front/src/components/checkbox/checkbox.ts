import styled from "styled-components";

export const checkbox = {
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
};

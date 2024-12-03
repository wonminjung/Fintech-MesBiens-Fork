import styled from "styled-components";

const N = {
  TilesContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Tile: styled.div`
    border: 1px solid #e0e0e0; /* 카드에 얇은 테두리 추가 */
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px; /* 모서리를 둥글게 */
    background-color: #ffffff; /* 카드 배경을 흰색으로 설정 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 효과 */
    height: 150px; /* 박스의 고정 높이 */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 제목과 링크를 위아래로 배치 */
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* 호버 시 전환 효과 */
    margin: 10px;
    &:hover {
      transform: translateY(-5px); /* 호버 시 카드가 살짝 위로 이동 */
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15); /* 호버 시 그림자 깊어짐 */
      cursor: pointer;
    }
  `,
};

export default N;

import styled from "styled-components";

const C = {
  PortfolioContent: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  `,
  PortfolioChart: styled.div`
    flex: 1;
    width: 100%;
    height: auto;
  `,
  Circle: styled.canvas`
    width: 5px;
    height: 50px;
    font-size: 1.2em;
    color: #666;
  `,
};

export default C;

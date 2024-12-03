import styled from "styled-components";

const S = {
  RootContainer: styled.div`
    display: flex;
    width: 100%;
  `,

  MainContentContainer: styled.main`
    flex: 1;
    margin-top: 20px;
    padding-left: 20px;
    height: 97vh;
  `,

  // Outlet 감싸는 컨테이너
  OutletContainer: styled.div`
    display: flex;
    height: calc(100vh - 130px);
    /* border: 2px solid black; */
    border-radius: 10px 0 0 10px;
    background: var(--container-color);
    box-sizing: border-box;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  `,
};

export default S;

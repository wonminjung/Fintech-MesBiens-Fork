import styled from "styled-components";

const S = {
    RootContainer: styled.div`
        display: flex;
        width: 100%;
    `,

    MainContentContainer: styled.main`
        flex: 1;
        margin-top: 20px;
        padding: 0 20px;
        height: 97vh;
    `,

    // Outlet 감싸는 컨테이너
    OutletContainer: styled.div`
        display: flex;
        height: calc(100vh - 130px);
        border: 2px solid black;
        border-radius: 20px;
        background: var(--container-color);
        box-sizing: border-box;
    `
};

export default S;
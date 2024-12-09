import styled from "styled-components";

const S = {
    ModalContainer: styled.div`
        position: fixed;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    ModalBackround: styled.div`
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: black;
        filter: opacity(0.33);
        z-index: 10000;
    `,
    ModalWindow: styled.div`
        width: 30%;
        height: 70%;
        background-color: white;
        z-index: 10001;
    `,
};

export default S;
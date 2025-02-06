import styled from "styled-components";

const S = {
  ModalContainer: styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `,
  ModalBackround: styled.div`
    position: absolute;
    width: 100vw;
    height: 100vw;
    background-color: black;
    filter: opacity(0.33);
  `,
  ModalWindow: styled.div`
    background-color: white;
    border-radius: 20px;
    z-index: 10001;
  `,
};

export default S;

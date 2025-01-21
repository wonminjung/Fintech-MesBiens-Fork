import styled from "styled-components";

const CartModal = {
  CartModalContainer: styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  BtnContainer: styled.div`
    display: flex;
    width: 100%;
  `,
  Btn: styled.button`
    border: 1px solid black;
    background-color: transparent;
    padding: 5px;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: var(--forth-color);
    }
  `,
};

export default CartModal;

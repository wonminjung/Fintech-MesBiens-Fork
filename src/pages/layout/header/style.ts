import styled from "styled-components";

const S = {
  HeaderContainer: styled.div`
    /* border: 2px solid black; */
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em;
    margin-bottom: 1em;
    height: 4%;
    background: var(--container-color);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  `,
  HeaderWelcome: styled.h2`
    border-radius: 10px;
    flex: 0.5;
    min-width: 300px;

    @media (max-width: 600px) {
      width: 100%;
    }
  `,
  SearchBarContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 120%;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: stretch;
    }
  `,
  SearchInput: styled.input`
    margin-right: 5px;
    border-radius: 10px;
    padding: 0 10px;
    font-size: 15px;
    border: 2px solid var(--second-color);
    width: 40%;
    height: 2em;

    @media (max-width: 600px) {
      width: 100%;
      margin-bottom: 2em;
    }
  `,
  SearchBtn: styled.button`
    width: 70px;
    height: 25px;
    margin-right: 80px;
    border-radius: 10px;
    border: none;
    background: var(--button-color);
    color: white;
    font-size: 15px;

    &:hover {
      background: var(--button-hover-color);
      cursor: pointer;
    }

    @media (max-width: 600px) {
      width: 100%;
    }
  `,
  LoginSignupContainer: styled.div`
    display: flex;
  `,
  LoginSignupBtn: styled.a`
    width: 70px;
    height: 25px;
    margin-right: 5px;
    border: none;
    background: var(--button-color);
    color: white;
    border-radius: 10px;
    font-size: 13px;
    padding: 2px 5px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: var(--button-hover-color);
      cursor: pointer;
    }
  `,
};

export default S;

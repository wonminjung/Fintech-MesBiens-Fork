import styled from "styled-components";
import DefaultButton from "../../../components/button/DefaultButton";
import PlainButton from "../../../components/button/PlainButton";
import { Link } from "react-router-dom";

export const S = {
  HeaderContainer: styled.div`
    /* border: 2px solid black; */
    border-radius: 10px 0 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em;
    margin-bottom: 1em;
    height: 4%;
    background: var(--container-color);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  `,
  HeaderWelcome: styled.div`
    /* border-radius: 10px; */
    //min-width: 300px;
    display: flex;
    font-size: 20px;
    font-weight: bold;
    align-items: center;

    @media (max-width: 600px) {
      width: 100%;
    }
  `,
  LogoutBtn: styled(PlainButton)`
    display: flex;
    align-items: center;
    font-size: 12px;
    cursor: pointer;
    margin-right: 15px;
    margin-left: 15px;
    padding: 5px;
    border-radius: 50px;
    transition: 0.25s ease-in-out;
    &:hover {
      background: var(--second-color);
    }
  `,
  SearchContainer: styled.div`
    display: flex;
    align-content: flex-end;
    align-items: center;
  `,
  SearchBarContainer: styled.div`
    display: flex;
    justify-content: flex-end;
    border-bottom: 2px solid var(--second-color);
    margin-right: 20px;
    align-items: center;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: stretch;
    }
  `,
  SearchInput: styled.input`
    /* margin-right: 5px; */
    border-radius: 10px;
    padding: 0 10px;
    font-size: 15px;
    border: none;
    &:focus {
      outline: none;
    }
    height: 2em;
    @media (max-width: 600px) {
      width: 100%;
      margin-bottom: 2em;
    }
    &:focus {
      text-decoration: none;
      border: none;
    }
  `,
  PlainBtn: styled(PlainButton)`
    width: 2em;
    align-items: center;
    &:hover {
      color: var(--second-color);
    }
  `,
  SearchImg: styled.img`
    cursor: pointer;
    margin-left: 5px;
    width: 20px;
    &:focus SearchInput {
      opacity: 1;
    }
  `,
  LoginSignupContainer: styled.div`
    display: flex;
  `,
  Link: styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
  `,
  img: styled.img`
    cursor: pointer;
    margin-right: 15px;
    margin-left: 15px;
    width: 20px;
  `,
  Button: styled(PlainButton)`
    border-radius: 0;
    &:hover {
      border-bottom: 2px solid var(--second-color);
    }
  `,
};

export const A = {
  Modal: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 70px;
    right: 60px;
    opacity: (0);
    transition: opacity 0.5 ease-in-out;
    width: auto;
    height: auto;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 1000;
    &.open {
      transform: translate(70px 200px);
      opacity: (1);
    }
  `,
  Overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  `,
  NotiBox: styled.div`
    display: block;
    /* border: 1px solid var(--border-color); */
    margin: 5px;
    width: auto;
    border-radius: var(--container-border-radius);
    position: relative;
    & p {
      padding: 5px;
      margin: 0;
    }
  `,
  NotiHead: styled.div`
    display: flex;
    justify-content: space-between;
    width: 500px;
  `,
  NotiTime: styled.p`
    position: absolute;
    top: 3px;
    right: 0;
    font-size: 12px;
  `,
  NotiLink: styled.a`
    text-decoration: none;
    color: var(--black);
    &:hover {
      text-decoration: none;
      color: var(--first-color);
    }
  `,
};

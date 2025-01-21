import styled from "styled-components";

export const shop = {
  MainContainer: styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #fff;
    align-items: center;
    overflow: auto;
    width: inherit;
  `,
  HeaderContainer: styled.div`
    width: 100%;
    height: 4rem;
    border-bottom: 1px solid #ccc;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  LogoContainer: styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  LogoImg: styled.img`
    height: 100%;
    transform: scale(2);
  `,
  Nav: styled.nav`
    display: flex;
    width: inherit;
    justify-content: center;
    gap: 10rem;
    z-index: 1;
    position: relative;
  `,
  NavTab: styled.a`
    cursor: pointer;
    &:hover {
      color: var(--third-color);
    }
  `,
  RightContainer: styled.div`
    position: absolute;
    right: 2rem;
    display: flex;
    gap: 20px;
  `,
  Cart: styled.a`
    border: none;
    background-image: url(${`${process.env.PUBLIC_URL}/images/shoppingImg/bag.svg`});
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
    &:hover {
      background-image: url(${`${process.env.PUBLIC_URL}/images/shoppingImg/bag-fill.svg`});
    }
  `,
  Home: styled.a`
    background-image: url(${`${process.env.PUBLIC_URL}/images/shoppingImg/house.svg`});
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
    &:hover {
      background-image: url(${`${process.env.PUBLIC_URL}/images/shoppingImg/house-fill.svg`});
    }
  `,

  BodyContainer: styled.div`
    display: flex;
    margin-top: 2rem;
    width: 70rem;
    gap: 10rem;
    justify-content: center;
    @media screen and (max: 1000px) {
      width: 50rem;
    }
  `,
  DividerContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 20px 0;
  `,
  Divider: styled.div`
    height: 1px;
    width: 25rem;
    border-bottom: 1px solid #ddd;
  `,
  ItemContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  `,
  Item: styled.a`
    width: 18rem;
    height: 22rem;
    transition: transform 0.3s ease-in-out;
    text-decoration: none;
    color: black;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  `,
  ItemImg: styled.img`
    width: 18rem;
    height: 18rem;
  `,
  ItemDescription: styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    & li {
      padding: 5px 0;
    }
    & > :nth-child(1) {
      font-size: 1.3rem;
      font-weight: bold;
    }
  `,

  ProductContainer: styled.div``,
};

export const p = {
  ProductImg: styled.img`
    width: 30rem;
  `,
  ProductInfo: styled.div`
    display: block;
    flex: 1;
  `,
  BtnContainer: styled.div`
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    height: 2rem;
  `,
  Btn: styled.button`
    border: 1px solid black;
    background: transparent;
    flex: 1;
    cursor: pointer;
    height: 100%;
    &:hover {
      background: #ccc;
    }
  `,
  QtyInput: styled.input`
    display: block;
    width: 3rem;
    height: 100%;
    border: none;
  `,
};

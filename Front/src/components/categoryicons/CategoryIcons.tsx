import React from "react";
import styled from "styled-components";

export const CI = {
  IMG: styled.img`
    width: 25px;
  `,
};

export const food: React.FC = () => (
  <CI.IMG
    src={`${process.env.PUBLIC_URL}/images/categoryicons/food.svg`}
    alt="foodicon"
  />
);

export const entertainment: React.FC = () => (
  <CI.IMG
    src={`${process.env.PUBLIC_URL}/images/categoryicons/entertainment.svg`}
    alt="entertainmenticon"
  />
);

export const gift: React.FC = () => (
  <CI.IMG
    src={`${process.env.PUBLIC_URL}/images/categoryicons/gift.svg`}
    alt="gifticon"
  />
);

export const income: React.FC = () => (
  <CI.IMG
    src={`${process.env.PUBLIC_URL}/images/categoryicons/income.svg`}
    alt="incomeicon"
  />
);

export const shopping: React.FC = () => (
  <CI.IMG
    src={`${process.env.PUBLIC_URL}/images/categoryicons/shopping.svg`}
    alt="shoppingicon"
  />
);

export const other: React.FC = () => (
  <CI.IMG
    src={`${process.env.PUBLIC_URL}/images/categoryicons/other.svg`}
    alt="othericon"
  />
);

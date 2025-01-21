// CartPage.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/store/store"; // RootState 타입 임포트
import { shop } from "./style";
import ShoppingNav from "./ShoppingNav";

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // cartItems가 undefined일 경우 빈 배열을 기본값으로 설정
  const items = cartItems || [];

  return (
    <shop.MainContainer>
      <ShoppingNav />
      <shop.BodyContainer>
        <h1>장바구니</h1>
        {items.length === 0 ? (
          <p>장바구니에 제품이 없습니다.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.productNo}>
                {item.productName} - {item.quantity}개
              </li>
            ))}
          </ul>
        )}
      </shop.BodyContainer>
    </shop.MainContainer>
  );
};

export default CartPage;

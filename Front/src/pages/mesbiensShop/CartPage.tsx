// CartPage.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store"; // RootState 타입 임포트

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // cartItems가 undefined일 경우 빈 배열을 기본값으로 설정
  const items = cartItems || [];

  return (
    <div>
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
    </div>
  );
};

export default CartPage;

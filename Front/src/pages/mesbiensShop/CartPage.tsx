// CartPage.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../modules/store/store"; // RootState 타입 임포트
import { shop, cart } from "./style";
import ShoppingNav from "./ShoppingNav";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../modules/cart/cartSlice";

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemove = (productNo: number) => {
    dispatch(removeFromCart(productNo));
  };

  const handleQuantityChange = (productNo: number, quantity: number) => {
    dispatch(updateQuantity({ productNo, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotalAmount = () => {
    return items.reduce(
      (total, item) => total + item.quantity * item.productPrice,
      0
    );
  };

  // cartItems가 undefined일 경우 빈 배열을 기본값으로 설정
  const items = cartItems || [];

  return (
    <shop.MainContainer>
      <ShoppingNav />
      <shop.BodyContainer>
        <cart.ContentContainer>
          <h1>장바구니</h1>
          <shop.Divider />
          {items.length === 0 ? (
            <p>장바구니에 제품이 없습니다.</p>
          ) : (
            <cart.ContentUl>
              <cart.ClearCartContainer>
                <cart.Btn onClick={handleClearCart}>전체 삭제</cart.Btn>
              </cart.ClearCartContainer>
              {items.map((item) => (
                <cart.ContentLi key={item.productNo}>
                  <cart.Thumbnail
                    src={item.productImg}
                    alt={item.productName}
                  />
                  <cart.ProductInfo>{item.productName}</cart.ProductInfo>
                  <cart.QtyContainer>
                    수량 :
                    <cart.Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.productNo,
                          Number(e.target.value)
                        )
                      }
                      min="1"
                    />
                  </cart.QtyContainer>
                  <cart.AmountContainer>
                    <cart.Price>
                      가격 : {item.productPrice.toLocaleString()}원
                    </cart.Price>
                    <cart.Price>
                      총액 :{" "}
                      {(item.quantity * item.productPrice).toLocaleString()}원
                    </cart.Price>
                  </cart.AmountContainer>
                  <cart.Btn onClick={() => handleRemove(item.productNo)}>
                    삭제
                  </cart.Btn>
                </cart.ContentLi>
              ))}
            </cart.ContentUl>
          )}
          {/* <shop.Divider /> */}
          <cart.PurchaseContainer>
            <cart.TotalAmount>
              총액 : {calculateTotalAmount().toLocaleString()}원
            </cart.TotalAmount>
            <cart.Btn>구매하기</cart.Btn>
          </cart.PurchaseContainer>
        </cart.ContentContainer>
      </shop.BodyContainer>
    </shop.MainContainer>
  );
};

export default CartPage;

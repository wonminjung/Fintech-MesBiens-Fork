// CartPage.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCartItems
} from "../../modules/cart/cartSlice";
import { RootState } from "../../modules/store/store"; // RootState 타입 임포트
import ShoppingNav from "./ShoppingNav";
import { cart, shop } from "./style";

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [quantityMap, setQuantityMap] = useState<{ [key:number]: number }>({});
  const [purchaseQuantityMap, setPurchaseQuantityMap] = useState<{ [key:number]: number }>({});
  const [focusCartItem, setFocusCartItem] = useState<number | null>(null);
  const [focusPurchaseItem, setFocusPurchaseItem] = useState<number | null>(null);



  // 카트 정보 가져오기
  const fetchCartItems = async () => {
    const memberNo = getMemberNoFromLocalStorage(); // LocalStorage에서 memberNo 가져오기
    if (!memberNo) {
      return;
    }

    try {

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/shop/Cart?memberNo=${memberNo}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data = await response.json();

      dispatch(setCartItems(data)); // Redux 상태 업데이트

      // 체크된 상품만 selectedItems에 저장
      const checkedProducts = data
      .filter((item: { isChecked: any; }) => item.isChecked) // 백엔드에서 체크된 상품만 필터링
      .map((item: { productNo: any; }) => item.productNo);
      setSelectedItems(checkedProducts);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [dispatch]);

  // MemberNo 가져오기 함수
  const getMemberNoFromLocalStorage = (): number | null => {
    const userState = localStorage.getItem("userState");
    if (!userState) return null;

    try {
      const parsedState = JSON.parse(userState);
      return parsedState.member?.memberNo || null; // `memberNo` 가져오기
    } catch (error) {
      return null;
    }
  };

  // 카트 아이템 삭제하기
  const handleRemove = async (cartNo: number) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/shop/Cart/remove/${cartNo}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // 인증 정보 포함
            }
        );

        if (!response.ok) {
            throw new Error(`장바구니 아이템 삭제 실패: ${response.status}`);
        }

        // fetchCartItems를 `await`으로 실행하여 서버의 최신 데이터로 상태 업데이트
        await fetchCartItems();

    } catch (error) {
        console.error("장바구니 아이템 삭제 중 오류 발생:", error);
    }
  };



  // 수량 변경
  const handleQuantityChange = async (cartNo: number, newQuantity: number) => {
  if (newQuantity < 1) return; // 수량이 1 미만이 되지 않도록 제한

  // 먼저 화면에서 즉시 반영하기
  const updatedCartItems = cartItems.map(item =>
      item.cartNo === cartNo ? { ...item, quantity: newQuantity } : item
  );
  setCartItems(updatedCartItems); // 프론트에서 즉시 업데이트

  try {
    // 백엔드에 수량 변경 요청 보내기
    const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/shop/Cart/updateQuantity`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ cartNo, quantity: newQuantity }),
        }
    );

    if (!response.ok) {
        throw new Error(`수량 변경 실패: ${response.status}`);
    }

  } catch (error) {
    console.error("수량 변경 중 오류 발생:", error);
    // 오류 발생 시, 원래 수량으로 롤백
    setCartItems(cartItems); // 원래 상태로 복구
  }
};

// 수량 변경 로컬 상태 저장
const handleInputChange = (cartNo: number, value: string) => {
  const parsedValue = Number(value);
  if (parsedValue >= 1) {
      setQuantityMap((prev) => ({
          ...prev,
          [cartNo]: parsedValue,
      }));
  }
};

// 사용자가 입력을 마쳤을 때 (Enter or 포커스 아웃)
const handleQuantityUpdate = async (cartNo: number) => {
  if (!quantityMap[cartNo]) return;

  try {
      const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/shop/Cart/updateQuantity`,
          {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ cartNo, quantity: quantityMap[cartNo] }),
          }
      );

      if (!response.ok) {
          throw new Error(`수량 변경 실패: ${response.status}`);
      }

      await fetchCartItems(); // 최신 데이터 반영
  } catch (error) {
      console.error("수량 변경 중 오류 발생:", error);
  }
};



// 카트 비우기
const handleClearCart = async () => {
  const memberNo = getMemberNoFromLocalStorage();
  if (!memberNo) return;

  try {
      const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/shop/Cart/clear/${memberNo}`,
          {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
              },
              credentials: "include",
          }
      );

      if (!response.ok) {
          throw new Error(`장바구니 전체 삭제 실패: ${response.status}`);
      }

      // 삭제 후 최신 데이터를 가져와 화면을 업데이트
      await fetchCartItems();
  } catch (error) {
      console.error("장바구니 전체 삭제 중 오류 발생:", error);
  }
};


// item을 selectedItems에 추가/제거
const handleSelectItem = async (productNo: number, isChecked: boolean) => {
  try {
      const memberNo = getMemberNoFromLocalStorage();
      if (!memberNo) return;

      const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/shop/cart/select`,
          {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json",
              },
              credentials: "include", // 인증 정보 포함
              body: JSON.stringify({
                  memberNo: memberNo,
                  productNo: productNo,
                  isChecked: isChecked, // true=체크됨, false=해제됨
              }),
          }
      );

      if (!response.ok) {
          throw new Error(`체크 상태 업데이트 실패: ${response.status}`);
      }

      // 성공적으로 반영되었으면 프론트 상태도 업데이트
      setSelectedItems((prevSelectedItems) =>
          isChecked
              ? [...prevSelectedItems, productNo]
              : prevSelectedItems.filter((no) => no !== productNo)
      );
  } catch (error) {
      console.error("체크 상태 업데이트 중 오류 발생:", error);
  }
};

// setSelectedItems에 선택된 상품의 가격*수량
const calculateTotalAmount = () => {
  return items
    .filter((item) => selectedItems.includes(item.productNo)) // 체크된 상품만 필터링
    .reduce((total, item) => total + item.quantity * item.productPrice, 0)
    .toLocaleString();
};

// 구매 수량 변경
const handlePurchaseQuantityChange = (cartNo: number, value: string) => {
  const parsedValue = Number(value);
  if (parsedValue >= 1) {
    setPurchaseQuantityMap((prev) => ({
      ...prev,
      [cartNo]: parsedValue,
    }));
  }
};


// 구매하기로 이동
const handlePurchase = () => {
  const selectedProducts = items
    .filter((item) => selectedItems.includes(item.productNo))
    .map((item) => ({
      productNo: item.productNo,
      productName: item.productName,
      productPrice: item.productPrice,
      quantity: purchaseQuantityMap[item.cartNo] ?? item.quantity, // ✅ 구매 수량을 전송
    }));

  console.log("🛍️ 구매할 상품 목록:", selectedProducts); // 디버깅용 로그

  navigate("/shop/Purchase", { state: { selectedProducts } });
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
                  <cart.Input
                    type="checkbox"
                    checked={selectedItems.includes(item.productNo)}
                    onChange={(e) => handleSelectItem(item.productNo, e.target.checked)}
                  />
                  <cart.Thumbnail
                    src={`/images/shoppingImg/${item.productImageUrl}`}
                    alt={item.productName}
                  />
                  <cart.ProductInfo>{item.productName}</cart.ProductInfo>
                  <cart.QtyContainer>
                    {/* 🛒 장바구니 수량 */}
                    <cart.Label>수량: {item.quantity}</cart.Label>
                    <cart.Input
                      type="number"
                      min="1"
                      placeholder="수량"
                      value={
                        focusCartItem === item.cartNo
                          ? quantityMap[item.cartNo] ?? item.quantity
                          : ""
                      }
                      onChange={(e) => handleInputChange(item.cartNo, e.target.value)}
                      onFocus={() => setFocusCartItem(item.cartNo)}
                      onBlur={() => {
                        setFocusCartItem(null);
                        handleQuantityUpdate(item.cartNo);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleQuantityUpdate(item.cartNo);
                          setFocusCartItem(null);
                        }
                      }}
                    />
                  </cart.QtyContainer>

                  {/* 🛍️ 구매할 수량 */}
                  <cart.QtyContainer>
                    <cart.Label>구매 수량: {purchaseQuantityMap[item.cartNo] ?? item.quantity}</cart.Label>
                    <cart.Input
                      type="number"
                      min="1"
                      placeholder="수량"
                      value={
                        focusPurchaseItem === item.cartNo
                          ? purchaseQuantityMap[item.cartNo] ?? item.quantity
                          : ""
                      }
                      onChange={(e) => handlePurchaseQuantityChange(item.cartNo, e.target.value)}
                      onFocus={() => setFocusPurchaseItem(item.cartNo)}
                      onBlur={() => setFocusPurchaseItem(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setFocusPurchaseItem(null);
                        }
                      }}
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
                  <cart.Btn onClick={() => handleRemove(item.cartNo)}>
                    삭제
                  </cart.Btn>
                </cart.ContentLi>
              ))}
              <cart.PurchaseContainer>
                <cart.TotalAmount>
                  총액 : {calculateTotalAmount().toLocaleString()}원
                </cart.TotalAmount>
                <cart.Btn onClick={handlePurchase}>구매하기</cart.Btn>
              </cart.PurchaseContainer>
            </cart.ContentUl>
          )}
        </cart.ContentContainer>
      </shop.BodyContainer>
    </shop.MainContainer>
  );
};

export default CartPage;

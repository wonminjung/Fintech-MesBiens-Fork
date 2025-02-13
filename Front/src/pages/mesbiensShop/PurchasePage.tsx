import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShoppingNav from "./ShoppingNav";
import { cart, shop } from "./style";

interface PurchaseItem {
  productNo: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  quantity: number; // 장바구니에 담긴 개수
}

const PurchasePage: React.FC = () => {
  const location = useLocation();
  const { selectedProducts } = location.state || { selectedProducts: [] };
  const [accounts, setAccounts] = useState<{ accountNo: number; accountName: string; accountNumber: string; accountBalance: number; }[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  
  // ✅ 백엔드에서 가져올 구매 목록 데이터 상태
  const [purchaseList, setPurchaseList] = useState<PurchaseItem[]>(selectedProducts);

  // ✅ 구매할 개수를 따로 저장하는 상태 추가
  const [purchaseQuantities, setPurchaseQuantities] = useState<{ [key: number]: number }>(
    selectedProducts.reduce((acc: { [key: number]: number }, item: PurchaseItem) => {
      acc[item.productNo] = item.quantity;
      return acc;
    }, {})
  );
  
  

  // ✅ 구매 개수 입력 핸들러
  const handleQuantityChange = (productNo: number, newQuantity: number) => {
    setPurchaseQuantities((prev) => ({
      ...prev,
      [productNo]: newQuantity > 0 ? newQuantity : 1, // 최소 1 이상
    }));
  };

  // ✅ 구매 목록 가져오는 함수
  const fetchPurchaseList = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/shop/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ memberNo: getMemberNoFromLocalStorage() }), // memberNo 전송
      });

      if (!response.ok) {
        throw new Error(`구매 목록 가져오기 실패: ${response.status}`);
      }

      const data = await response.json();
      setPurchaseList(data.purchaseList);
      setPurchaseQuantities(data.purchaseList.reduce((acc: any, item: PurchaseItem) => ({ ...acc, [item.productNo]: item.quantity }), {}));

      if (data.length > 0) setSelectedAccount(data[0].accountNumber); // ✅ 기본 선택값을 accountNumber로 변경
    } catch (error) {
      console.error("❌ 구매 목록 불러오기 실패:", error);
    }
  };

  // ✅ LocalStorage에서 memberNo 가져오기
  const getMemberNoFromLocalStorage = (): number | null => {
    const userState = localStorage.getItem("userState");
    if (!userState) return null;

    try {
      const parsedState = JSON.parse(userState);
      return parsedState.member?.memberNo || null;
    } catch (error) {
      return null;
    }
  };

  // ✅ 계좌 목록 가져오기
  const fetchAccounts = async () => {
    const memberNo = getMemberNoFromLocalStorage();
    if (!memberNo) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/shop/accounts?memberNo=${memberNo}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`계좌 목록 불러오기 실패: ${response.status}`);
      }

      const data = await response.json();
      setAccounts(data);
      if (data.length > 0) setSelectedAccount(data[0].accountNumber);
    } catch (error) {
      console.error("❌ 계좌 목록 불러오기 실패:", error);
    }
  };

  // ✅ selectedProducts가 없으면 백엔드에서 구매 목록 가져오기
  useEffect(() => {
    if (selectedProducts.length === 0) {
      fetchPurchaseList();
    }
    fetchAccounts();
  }, []);

  // ✅ 총 금액 계산
  const calculateTotalAmount = () => {
    return purchaseList
      .reduce(
        (total: number, item: PurchaseItem) =>
          total + (purchaseQuantities[item.productNo] ?? item.quantity) * item.productPrice, // ✅ 구매 수량 기준으로 총액 계산
        0
      )
      .toLocaleString();
  };
  

  // ✅ 결제 처리하기
  const handlePurchase = async () => {
    const memberNo = getMemberNoFromLocalStorage();
    if (!memberNo) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!selectedAccount) {
      alert("결제 계좌를 선택해주세요.");
      return;
    }

    // ✅ 실제 구매할 개수를 반영하여 요청 데이터 생성
    const purchaseItems = purchaseList.map((item) => ({
      productNo: item.productNo,
      productName: item.productName,
      productPrice: item.productPrice,
      quantity: purchaseQuantities[item.productNo] ?? item.quantity, // 사용자가 입력한 개수
    }));

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/shop/purchase_ok`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          memberNo,
          accountNo: selectedAccount,
          purchaseList: purchaseItems, // ✅ 구매할 개수를 반영한 목록 전송
        }),
      });

      if (!response.ok) {
        throw new Error(`결제 실패: ${response.status}`);
      }

      alert("결제가 완료되었습니다.");
      window.location.href = "/shop/category/All";
    } catch (error) {
      console.error("❌ 결제 처리 중 오류 발생:", error);
      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <shop.MainContainer>
      <ShoppingNav />
      <shop.BodyContainer>
        <cart.ContentContainer>
          <h1>결제</h1>
          <shop.Divider />

          <cart.ContentUl>
            {purchaseList.map((item) => (
              <cart.ContentLi key={item.productNo}>
                <cart.Thumbnail src={`/images/shoppingImg/${item.productImageUrl}`} alt={item.productName} />
                <cart.ProductInfo>{item.productName}</cart.ProductInfo>
                <cart.PurchaseDiv>
                  {/* 🔹 장바구니 개수 표시 */}
                  <cart.QtyContainer>수량 : {item.quantity}</cart.QtyContainer>

                  {/* <cart.PurchaseCountLabel>구매할 개수 : </cart.PurchaseCountLabel> */}
                  {/* 🔹 구매 개수 입력 필드 */}
                  {/* <cart.PurchaseInput
                    type="number"
                    min="1"
                    max={item.quantity} // 장바구니에 있는 개수까지만 선택 가능
                    value={purchaseQuantities[item.productNo]}
                    onChange={(e) => handleQuantityChange(item.productNo, Number(e.target.value))}
                  /> */}
                </cart.PurchaseDiv>
                <cart.AmountContainer>
                  <cart.Price>가격: {item.productPrice.toLocaleString()}원</cart.Price>
                  <cart.Price>
                    총액: {((purchaseQuantities[item.productNo] ?? item.quantity) * item.productPrice).toLocaleString()}원
                  </cart.Price>

                </cart.AmountContainer>
              </cart.ContentLi>
            ))}
            <cart.PurchaseContainer>
              <cart.TotalAmount>총액 : {calculateTotalAmount()}원</cart.TotalAmount>

              {/* 🔹 계좌 선택 드롭다운 */}
              <cart.PurchaseLabel>결제 계좌 선택:</cart.PurchaseLabel>
              <cart.PurchaseSelect value={selectedAccount ?? ""} onChange={(e) => setSelectedAccount(e.target.value)}>
                {accounts.map((account) => (
                  <option key={account.accountNo} value={account.accountNo}>
                    {account.accountNumber} ({account.accountBalance.toLocaleString()}원)
                  </option>
                ))}
              </cart.PurchaseSelect>

              <cart.Btn onClick={handlePurchase}>구매하기</cart.Btn>
            </cart.PurchaseContainer>
          </cart.ContentUl>
        </cart.ContentContainer>
      </shop.BodyContainer>
    </shop.MainContainer>
  );
};

export default PurchasePage;

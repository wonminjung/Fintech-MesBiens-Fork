import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; // useNavigate 훅 임포트
import { ModalKeys } from "../../components/modal/keys/ModalKeys";
import ModalRendererComponent from "../../components/modal/ModalRendererComponent";
import ModalFunc from "../../components/modal/utils/ModalFunc";
import { ProductData } from "./ProductData";
import ShoppingNav from "./ShoppingNav";
import { p, shop } from "./style";

const ProductPage: React.FC = () => {
  const { productNo } = useParams<{ productNo: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 액션 디스패치
  const { handleModal } = ModalFunc();
  const navigate = useNavigate();

  
  // 제품 상세보기 페이지 이동
  useEffect(() => {
    const fetchProductData = async () => {
      try {

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/shop/product/${productNo}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`서버 오류: ${response.status}`);
        }
        const data: ProductData = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };



    fetchProductData();
  }, [productNo]);

  // LocalStorage에서 memberNo 가져오는 함수
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

  // 장바구니에 담기
  const handleAddToCart = async () => {
    if (product) {
      const memberNo = getMemberNoFromLocalStorage(); // LocalStorage에서 memberNo 가져오기
    if (!memberNo) {
      console.error("memberNo를 찾을 수 없습니다. 로그인 상태를 확인하세요.");
      return;
    }
      const cartItem = {
        productNo: product.productNo,
        accountNo: product.accountNo,
        memberNo: memberNo,
        productName: product.productName,
        productPrice: product.productPrice,
        productImageUrl: product.productImageUrl,
        quantity,
      };
      // Redux 사용 X
      // dispatch(addToCart(cartItem)); // cartItem 객체를 addToCart 액션에 전달
      // // console.log(`장바구니에 ${quantity}개 ${product.productName} 추가`);
      // // console.log(product.productPrice);
      // handleModal(ModalKeys.SHOPPING_CART_MODAL);

      try {
        // 백엔드로 장바구니 데이터 전송 (Redux 없이)
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/shop/Cart/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(cartItem), // JSON 데이터 변환 후 전송
          }
        );
  
        if (!response.ok) {
          throw new Error(`장바구니 추가 실패: ${response.status}`);
        }
  
        // Redux 사용 없이 모달만 띄우기
        handleModal(ModalKeys.SHOPPING_CART_MODAL);
      } catch (error) {
        console.error("장바구니 추가 중 오류 발생:", error);
      }
    }
  };

  // 바로구매 페이지 이동
  const handleBuyNow = () => {
    console.log(`바로 구매: ${product?.productName}`);
    if (product) {
      const selectedProduct = {
        productNo: product.productNo,
        productName: product.productName,
        productPrice: product.productPrice,
        productImageUrl: product.productImageUrl,
        quantity,
      };
      navigate("/shop/Purchase", { state: { selectedProducts: [selectedProduct] } });
    }
  };

  if (!product) {
    return <div>제품을 찾을 수 없습니다.</div>;
  }

  return (
    <shop.MainContainer>
      <ShoppingNav />

      <shop.BodyContainer>
        <p.ContentContainer>
          <p.ProductImg src={`/images/shoppingImg/${product.productImageUrl}`} alt={product.productName} />
          <p.ProductInfo>
            <h1>{product.productName}</h1>
            <h3>{product.productPrice.toLocaleString()}원</h3>
            <p.BtnContainer>
              <label>수량: </label>
              <p.QtyInput
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                placeholder="수량"
              ></p.QtyInput>
              <p.Btn onClick={handleAddToCart}>장바구니 담기</p.Btn>
              <p.Btn onClick={handleBuyNow}>바로구매</p.Btn>
            </p.BtnContainer>
          </p.ProductInfo>
        </p.ContentContainer>
      </shop.BodyContainer>

      <ModalRendererComponent />
    </shop.MainContainer>
  );
};

export default ProductPage;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice"; // addToCart 액션 임포트
import { shop, p } from "./style";
import ShoppingNav from "./ShoppingNav";

interface ProductData {
  productNo: number;
  img: string;
  productName: string;
  productPrice: string;
  category: string;
}

const ProductPage: React.FC = () => {
  const { productNo } = useParams<{ productNo: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 액션 디스패치
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `${process.env.PUBLIC_URL}/dummyDatas/shoppingData.json`
        );
        const data: ProductData[] = await response.json();
        const selectedProduct = data.find(
          (item) => item.productNo === Number(productNo)
        );
        setProduct(selectedProduct || null);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productNo]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        productNo: product.productNo,
        productName: product.productName,
        productPrice: product.productPrice,
        quantity,
      };
      dispatch(addToCart(cartItem)); // cartItem 객체를 addToCart 액션에 전달
      console.log(`장바구니에 ${quantity}개 ${product.productName} 추가`);
    }
  };

  const handleBuyNow = () => {
    console.log(`바로 구매: ${product?.productName}`);
  };

  const handleGoToCart = () => {
    navigate("/cart"); // 장바구니 페이지로 이동
  };

  if (!product) {
    return <div>제품을 찾을 수 없습니다.</div>;
  }

  return (
    <shop.MainContainer>
      <ShoppingNav />

      <shop.BodyContainer>
        <p.ProductImg src={product.img} alt={product.productName} />
        <p.ProductInfo>
          <h1>{product.productName}</h1>
          <p>가격: {product.productPrice}</p>
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
            <p.Btn onClick={handleGoToCart}>장바구니로 이동</p.Btn>{" "}
            {/* 장바구니로 이동 버튼 */}
          </p.BtnContainer>
        </p.ProductInfo>
      </shop.BodyContainer>
    </shop.MainContainer>
  );
};

export default ProductPage;

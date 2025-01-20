import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [quantity, setQuantity] = useState<number>(1);

  const handleButtonClick = (category: string) => {
    setSelectedCategory(category);
  };

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
    console.log(`장바구니에 ${quantity}개 ${product?.productName} 추가`);
  };

  const handleBuyNow = () => {
    console.log(`바로 구매: ${product?.productName}`);
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
          </p.BtnContainer>
        </p.ProductInfo>
      </shop.BodyContainer>
    </shop.MainContainer>
  );
};

export default ProductPage;

import React, { useEffect, useState } from "react";
import shop from "./style";

type shoppingInfo = {
  img: string;
  productName: string;
  productPrice: string;
  category: string;
};

const MesBiensShop: React.FC = () => {
  const [shoppingInfos, setShoppingInfos] = useState<shoppingInfo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const handleButtonClick = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchShoppingData = async () => {
      try {
        const response = await fetch(
          `${process.env.PUBLIC_URL}/dummyDatas/shoppingData.json`
        );
        const data = await response.json();
        setShoppingInfos(data);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };

    fetchShoppingData();
  }, []);

  const filteredItems =
    selectedCategory === "전체"
      ? shoppingInfos
      : shoppingInfos.filter((item) => item.category === selectedCategory);

  return (
    <shop.MainContainer>
      <shop.HeaderContainer>
        <shop.LogoContainer>
          <shop.LogoImg
            src={`${process.env.PUBLIC_URL}/images/logo/MBLogo1-removebg.png`}
            alt="logo"
          />
        </shop.LogoContainer>
        <shop.Nav>
          {["전체", "생활", "뷰티", "청소"].map((category, index) => (
            <shop.NavTab
              key={index}
              onClick={() => handleButtonClick(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </shop.NavTab>
          ))}
        </shop.Nav>
      </shop.HeaderContainer>
      <shop.BodyContainer>
        <shop.DividerContainer>
          <shop.Divider></shop.Divider>
          BEST
          <shop.Divider></shop.Divider>
        </shop.DividerContainer>
        <shop.ItemContainer>
          {filteredItems.map((item, index) => (
            <shop.Item key={index}>
              <shop.ItemImg src={item.img} alt={item.productName} />
              <shop.ItemDescription>
                <li>{item.productName}</li>
                <li>{item.productPrice}</li>
              </shop.ItemDescription>
            </shop.Item>
          ))}
        </shop.ItemContainer>
      </shop.BodyContainer>
    </shop.MainContainer>
  );
};

export default MesBiensShop;

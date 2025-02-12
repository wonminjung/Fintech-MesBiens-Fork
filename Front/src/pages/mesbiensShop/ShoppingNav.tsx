import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../modules/store/store";
import { shop } from "./style";

const ShoppingNav: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const handleButtonClick = (category: string) => {
    navigate(`/shop/category/${category}`); // 카테고리 페이지로 이동
  };

  const cartIcon =
    cartItems.length > 0
      ? `${process.env.PUBLIC_URL}/images/shoppingImg/bag-check.svg`
      : `${process.env.PUBLIC_URL}/images/shoppingImg/bag.svg`;

  return (
    <shop.HeaderContainer>
      <shop.LogoContainer>
        <shop.LogoImg
          src={`${process.env.PUBLIC_URL}/images/logo/MBLogo1-removebg.png`}
          alt="logo"
        />
      </shop.LogoContainer>
      <shop.Nav>
        {["All", "Life", "Beauty"].map((category, index) => (
          <shop.NavTab key={index} onClick={() => handleButtonClick(category)}>
            {category}
          </shop.NavTab>
        ))}
        <shop.RightContainer>
          <shop.CartIcon
            src={cartIcon}
            alt="cart"
            onClick={() => navigate("/shop/Cart")}
          />
          <shop.Home onClick={() => navigate("/main")} />
        </shop.RightContainer>
      </shop.Nav>
    </shop.HeaderContainer>
  );
};

export default ShoppingNav;

import { shop } from "./style";
import { useNavigate } from "react-router-dom";

const ShoppingNav: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = (category: string) => {
    navigate(`/category/${category}`); // 카테고리 페이지로 이동
  };

  return (
    <shop.HeaderContainer>
      <shop.LogoContainer>
        <shop.LogoImg
          src={`${process.env.PUBLIC_URL}/images/logo/MBLogo1-removebg.png`}
          alt="logo"
        />
      </shop.LogoContainer>
      <shop.Nav>
        {["전체", "생활", "뷰티"].map((category, index) => (
          <shop.NavTab key={index} onClick={() => handleButtonClick(category)}>
            {category}
          </shop.NavTab>
        ))}
      </shop.Nav>
    </shop.HeaderContainer>
  );
};

export default ShoppingNav;

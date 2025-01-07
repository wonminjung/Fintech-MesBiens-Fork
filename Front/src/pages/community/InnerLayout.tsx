import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";
import P from "./style";

const InnerLayout = () => {
  return (
    <P.MainContainer>
      <MenuBar />
      <Outlet />
    </P.MainContainer>
  );
};

export default InnerLayout;

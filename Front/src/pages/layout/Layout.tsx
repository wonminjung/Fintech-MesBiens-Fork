import React from "react";
import { Outlet } from "react-router-dom";
import S from "./style";
import Sidebar from "./sideBar/Sidebar";
import Header from "./header/Header";
import CommonModal from "../../components/modal/CommonModal";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/store/store";
import { componentMap } from "../../components/modal/ModalContent";

const Layout: React.FunctionComponent = (): JSX.Element => {
<<<<<<< HEAD
  const [tempState, setTempState] = useState<boolean>(false);
  const handleTempState = (): void => {
    console.log("모달 실행");
    setTempState((prevState: boolean): boolean => !prevState);
  };
=======
  
  const { isOpen, component } = useSelector((state: RootState) => state.modal);
  // 현재 스토어에 저장된 component 로 모달창 띄우기 위한 상수
  const ComponentToRender = component ? componentMap[component] : null;
>>>>>>> 3aeac9260fe6ce376195441243f75ba7a6ea30dd

  return (
    <S.RootContainer>
      {/* 고정이 되는 메인 메뉴 */}
      <Sidebar />

      <S.MainContentContainer>
        {/* 고정 헤더 */}
        <Header />

        <S.OutletContainer>
          <Outlet />
        </S.OutletContainer>
      </S.MainContentContainer>

      {/* 공용 모달창 */}
<<<<<<< HEAD
      {/* <div onClick={handleTempState}>test</div>
      {tempState && <CommonModal onClick={handleTempState} />} */}
=======
      {isOpen && ComponentToRender ? (
          <CommonModal>
            <ComponentToRender/>
          </CommonModal>
        ) : null
      }
>>>>>>> 3aeac9260fe6ce376195441243f75ba7a6ea30dd
    </S.RootContainer>
  );
};

export default Layout;

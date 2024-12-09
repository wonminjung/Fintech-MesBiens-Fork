import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import S from "./style";
import Sidebar from "./sideBar/Sidebar";
import Header from "./header/Header";
import CommonModal from "../../components/modal/CommonModal";

const Layout: React.FunctionComponent = (): JSX.Element => {

  const [ tempState, setTempState ] = useState<boolean>(false);
  const handleTempState = (): void => {
    console.log("모달 실행");
    setTempState((prevState: boolean): boolean => !prevState)
  };

  return (
    <S.RootContainer>
      {/* 고정이 되는 메인 메뉴 */}
      <Sidebar />

      <S.MainContentContainer>
        {/* 고정 헤더 */}
        <Header userName="홍길동" />

        <S.OutletContainer>
          <Outlet />
        </S.OutletContainer>
      </S.MainContentContainer>

      {/* 공용 모달창 */}
      <div onClick={handleTempState}>test</div>
      {tempState && <CommonModal onClick={handleTempState} />}
    </S.RootContainer>
  );
};

export default Layout;

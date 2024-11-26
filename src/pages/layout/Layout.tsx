import * as React from 'react';
import { Outlet } from 'react-router-dom';
import S from './style';
import Sidebar from './sideBar/Sidebar';
import Header from './header/Header';

const Layout: React.FunctionComponent = (): JSX.Element => {
    return (
        <S.RootContainer>
            {/* 고정이 되는 메인 메뉴 */}
            <Sidebar />

            <S.MainContentContainer>
                {/* 고정 헤더 */}
                <Header />

                <S.OutletContainer>
                    <Outlet/>
                </S.OutletContainer>
            </S.MainContentContainer>
        </S.RootContainer>
    );
};

export default Layout;

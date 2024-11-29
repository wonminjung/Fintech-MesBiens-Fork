import React, { useState } from 'react';
import LeftAreaContainer from './leftArea/LeftAreaContainer';
import ContentAreaContainer from './contentArea/ContentAreaContainer';
import { ToLeftMenuComponentTypes, MenuList } from './types';
import S from './style';

const MyPageContainer: React.FunctionComponent = (): JSX.Element => {

    /** LeftMenuComponent 로 전달할 Props */
    let menuList: MenuList[] = [];
    menuList = [
        {
            list: "계좌 관리",
            component: <ContentAreaContainer menuList={menuList} />
        },
        {
            list: "2차 패스워드 설정",
            component: <></>
        },
        {
            list: "회원정보 수정",
            component: <></>
        },
        {
            list: "회원탈퇴",
            component: <></>
        }
    ];
    const [ selectedMenu, setSelectedMenu ] = useState<string|null>(menuList[0].list);
    const handleClickMenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => setSelectedMenu(e.currentTarget.textContent);
    const toLeftMenuComponent: ToLeftMenuComponentTypes = {
        menuList: menuList,
        selectedMenu: selectedMenu,
        handleClickMenu: handleClickMenu
    };


    return (
        <>
            {/* 좌측 사이드 */}
            <LeftAreaContainer toLeftMenuComponent={toLeftMenuComponent} />
            {/* 메인 컨텐츠 */}
            <ContentAreaContainer menuList={menuList} selectedMenu={selectedMenu}/>
        </>
    );
};

export default MyPageContainer;
import React, { useState } from 'react';
import LeftAreaContainer from './leftArea/LeftAreaContainer';
import ContentAreaContainer from './contentArea/ContentAreaContainer';
import { ToLeftMenuComponentTypes, MenuList } from './types';

const MyPageContainer: React.FunctionComponent = (): JSX.Element => {

    /** LeftMenuComponent 로 보낼 Props */
    const menuList: MenuList[] = [
        {
            list: "계좌 관리",
            component: <></>
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
    }


    return (
        <>
            <LeftAreaContainer toLeftMenuComponent={toLeftMenuComponent} />
            {menuList.map((menu, i) => {

            })}
            <ContentAreaContainer menuList={menuList} />
        </>
    );
};

export default MyPageContainer;
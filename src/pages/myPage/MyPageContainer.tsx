import React, { useState } from 'react';
import LeftAreaContainer from './leftArea/LeftAreaContainer';
import ContentAreaContainer from './contentArea/ContentAreaContainer';
import { ToLeftMenuComponentTypes, MenuList } from './types';
import AccountContainer from './contentArea/account/AccountContainer';
import MemInfoModiContainer from './contentArea/memInfoModi/MemInfoModiContainer';
import MemWithdrawallContainer from './contentArea/memWithdrawall/MemWithdrawallContainer';
import SecondPassword from './contentArea/secondPassword/SecondPassword';

const MyPageContainer: React.FunctionComponent = (): JSX.Element => {
    const menuList: MenuList[] = [
        {
            list: "계좌 관리",
            isSearchable: true,
            component: (props: any) => <AccountContainer {...props}/>
        },
        {
            list: "2차 패스워드 설정",
            isSearchable: false,
            component: (props: any) => <SecondPassword {...props}/>
        },
        {
            list: "회원정보 수정",
            isSearchable: false,
            component: (props: any) => <MemInfoModiContainer {...props}/>
        },
        {
            list: "회원탈퇴",
            isSearchable: false,
            component: (props: any) => <MemWithdrawallContainer {...props}/>
        }
    ];
    const [ selectedMenuIndex, setSelectedMenuIndex ] = useState<number>(0);
    const handleClickMenu = (index: number): void => {
        setSelectedMenuIndex(() => index);
    };

    /** LeftMenuComponent 로 전달할 Props */
    const toLeftMenuComponent: ToLeftMenuComponentTypes = {
        menuList: menuList,
        selectedMenuIndex: selectedMenuIndex,
        handleClickMenu: handleClickMenu
    };

    return (
        <>
            {/* 좌측 사이드 */}
            <LeftAreaContainer toLeftMenuComponent={toLeftMenuComponent}/>
            {/* 메인 컨텐츠 */}
            <ContentAreaContainer menuList={menuList} selectedMenuIndex={selectedMenuIndex} />
        </>
    );
};

export default MyPageContainer;
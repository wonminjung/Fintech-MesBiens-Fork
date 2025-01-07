import React, { useCallback, useState } from 'react';
import LeftAreaContainer from './leftArea/LeftAreaContainer';
import ContentAreaContainer from './contentArea/ContentAreaContainer';
import { ToLeftMenuComponentTypes, MenuList } from './types';
import MemInfoModiContainer from './contentArea/memInfoModi/MemInfoModiContainer';
import SecurityContainer from './contentArea/Security/SecurityContainer';
import MemWithdrawal from './contentArea/memWithdrawal/MemWithdrawal';

const MyPageContainer: React.FunctionComponent = (): JSX.Element => {
    const menuList: MenuList[] = [
        {
            list: "정보 수정",
            component: (props: any) => <MemInfoModiContainer {...props}/>
        },
        {
            list: "보안 설정",
            component: (props: any) => <SecurityContainer {...props}/>
        },
        {
            list: "회원 탈퇴",
            component: (props: any) => <MemWithdrawal {...props}/>
        }
    ];
    const [ selectedMenuIndex, setSelectedMenuIndex ] = useState<number>(0);
    const handleClickMenu = useCallback((index: number): void => {
        setSelectedMenuIndex(() => index);
    }, []);

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
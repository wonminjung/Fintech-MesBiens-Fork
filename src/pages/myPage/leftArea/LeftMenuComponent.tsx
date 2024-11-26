import React, { useState } from 'react';
import S from './style';

const LeftMenuComponent = () => {
    const menuList: string[] = [ "계좌 관리", "2차 패스워드 설정", "회원정보 수정", "회원탈퇴" ]; 
    const [ selectedMenu, setSelectedMenu ] = useState<string|null>(menuList[0]);

    const handleClickMenu = (e: React.MouseEvent<HTMLLIElement>): void => setSelectedMenu(e.currentTarget.textContent);

    return (
        <S.LeftMenuContainer>
            <S.LeftMenuWrapper>
                {
                    menuList.map((menu, i) => (
                        <li key={i} onClick={handleClickMenu} data-selectedMenu={selectedMenu === menu}>
                            <span>{menu}</span>
                        </li>
                    ))
                }
            </S.LeftMenuWrapper>
        </S.LeftMenuContainer>
    );
};

export default LeftMenuComponent;
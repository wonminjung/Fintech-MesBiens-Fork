import React, { useState } from 'react';
import S from './style';
import { MenuList, ToLeftMenuComponentTypes } from '../types';

type Props = {
    toLeftMenuComponent: ToLeftMenuComponentTypes;
};

const LeftMenuComponent: React.FunctionComponent<Props> = ({ toLeftMenuComponent }): JSX.Element => {
    const { menuList, selectedMenu, handleClickMenu } = toLeftMenuComponent;

    return (
        <S.LeftMenuContainer>
            <S.LeftMenuWrapper>
                {
                    menuList.map((menu: MenuList, i: number): JSX.Element => (
                        <li key={i} onClick={handleClickMenu} data-selectedMenu={selectedMenu === menu.list}>
                            <span>{menu.list}</span>
                        </li>
                    ))
                }
            </S.LeftMenuWrapper>
        </S.LeftMenuContainer>
    );
};

export default LeftMenuComponent;
import React from 'react';
import S from './style';
import { MenuList } from '../../types';
import ChangePwdComponent from './ChangePwdComponent';

type Props = {
    menuList: MenuList;
}

const SecurityContainer: React.FunctionComponent<Props> = ({ menuList }): JSX.Element => {
    const { list } = menuList;

    return (
        <S.SelectedMenuHeaderContainer>
            <S.MenuTitle>{list}</S.MenuTitle>

            <ChangePwdComponent />
        </S.SelectedMenuHeaderContainer>
    );
};

export default SecurityContainer;
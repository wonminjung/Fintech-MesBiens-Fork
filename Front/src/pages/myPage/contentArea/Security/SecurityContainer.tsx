import React, { useState } from 'react';
import S from './style';
import { MenuList } from '../../types';
import ChangePwdComponent from './ChangePwdComponent';
import AuthenticationComponent from './AuthenticationComponent';

type Props = {
    menuList: MenuList;
}

const SecurityContainer: React.FunctionComponent<Props> = ({ menuList }): JSX.Element => {
    const { list } = menuList;
    const [ authenticationStatus, setAuthenticationStatus ] = useState(false);

    return (
        <S.SelectedMenuHeaderContainer>
            <S.MenuTitle>{list}</S.MenuTitle>

            {authenticationStatus ? <ChangePwdComponent /> : <AuthenticationComponent />}
        </S.SelectedMenuHeaderContainer>
    );
};

export default SecurityContainer;
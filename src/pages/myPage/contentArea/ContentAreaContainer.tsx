import React from 'react';
import S from './style';
import { MenuList } from '../types';

type Props = {
    menuList: MenuList[];
    selectedMenuIndex: number;
};

const ContentAreaContainer: React.FunctionComponent<Props> = ({ menuList, selectedMenuIndex }): JSX.Element => {
    return (
        <S.ContentAreaContainer>
            <S.SelectedMenuContentContainer>
                {menuList[selectedMenuIndex].component(menuList[selectedMenuIndex])}
            </S.SelectedMenuContentContainer>
        </S.ContentAreaContainer>
    );
};

export default ContentAreaContainer;
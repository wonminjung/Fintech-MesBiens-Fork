import * as React from 'react';
import AccountListContainer from './AccountListContainer';
import S from './style';
import { MenuList } from '../../types';

type Props = {
    menuList: MenuList;
    selectedMenuIndex: number;
};

const AccountContainer: React.FunctionComponent<Props> = ({ menuList, selectedMenuIndex }): JSX.Element => {
    const { list, isSearchable } = menuList;
    
    return (
        <>
            <S.SelectedMenuHeaderContainer>
                    <S.MenuTitle>{list}</S.MenuTitle>
                    {isSearchable ? 
                        (
                            <S.SearchAndSortWrapper>
                                {/* 검색창 */}
                                <S.AccountSearch />
                                <S.AccountSort>정렬 순서</S.AccountSort>
                            </S.SearchAndSortWrapper>
                        ) 
                        :
                        (
                            <></>
                        )
                    }
            </S.SelectedMenuHeaderContainer>

            {/* 계좌 목록 */}
            <AccountListContainer />
        </>
    );
};

export default AccountContainer;

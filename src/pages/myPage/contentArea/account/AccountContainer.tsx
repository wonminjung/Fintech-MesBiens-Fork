import AccountListContainer from './AccountListContainer';
import S from './style';
import { MenuList } from '../../types';
import { useCallback, useRef, useState } from 'react';

type Props = {
    menuList: MenuList;
    selectedMenuIndex: number;
};

const AccountContainer: React.FunctionComponent<Props> = ({ menuList, selectedMenuIndex }): JSX.Element => {
    const { list, isSearchable } = menuList;
    
    const [ isClickSort, setIsClickSort ] = useState<boolean>(false);
    const sortBtnRef = useRef<HTMLDivElement>(null);
    const toggleIsClickSort = useCallback(() => {
        setIsClickSort((prevIsClickSort) => !prevIsClickSort);
    }, []);
    const handleDropdown = useCallback((e: React.MouseEvent): void => {
        if(sortBtnRef.current && !sortBtnRef.current.contains(e.target as Node)) {
            setIsClickSort(false);
        }
    }, [setIsClickSort]);

    return (
        <>
            <S.SelectedMenuHeaderContainer>
                    <S.MenuTitle>{list}</S.MenuTitle>
                    {
                        isSearchable ? 
                        (
                            <S.SearchAndSortWrapper>
                                {/* 검색창 */}
                                <S.AccountSearch />
                                <S.AccountSort onClick={toggleIsClickSort} ref={sortBtnRef}>정렬 순서</S.AccountSort>
                                {isClickSort && (
                                    <S.AccountSortDropdown data-activedropdown={String(isClickSort)}>
                                        <S.AccountSortDropdownItem>금액 많은 순</S.AccountSortDropdownItem>
                                        <S.AccountSortDropdownItem>금액 적은 순</S.AccountSortDropdownItem>
                                        <S.AccountSortDropdownItem>최근 등록 순</S.AccountSortDropdownItem>
                                        <S.AccountSortDropdownItem>오래 등록 순</S.AccountSortDropdownItem>
                                    </S.AccountSortDropdown>)
                                }
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

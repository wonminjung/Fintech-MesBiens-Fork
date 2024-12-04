import AccountListContainer from './AccountListContainer';
import S from './style';
import { MenuList } from '../../types';
import { useCallback, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

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
                                <S.DropdownContainer>
                                    <S.AccountSort onClick={toggleIsClickSort} ref={sortBtnRef}>
                                        <span>정렬 순서</span>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </S.AccountSort>
                                    {isClickSort && (
                                        <S.Dropdown data-activedropdown={String(isClickSort)}>
                                            <S.DropdownItem>금액 많은 순</S.DropdownItem>
                                            <S.DropdownItem>금액 적은 순</S.DropdownItem>
                                            <S.DropdownItem>최근 등록 순</S.DropdownItem>
                                            <S.DropdownItem>오래 등록 순</S.DropdownItem>
                                        </S.Dropdown>
                                    )}
                                </S.DropdownContainer>
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

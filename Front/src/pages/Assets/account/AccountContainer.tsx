import React, { useCallback, useRef, useState } from "react";
import S from "./style";
import AccountListContainer from "./AccountListContainer";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalFunc from "../../../components/modal/utils/ModalFunc";
import { ModalKeys } from "../../../components/modal/keys/ModalKeys";
import { H1 } from "../../../components/htags/style";

const AccountContainer: React.FunctionComponent = (): JSX.Element => {
  const [isClickSort, setIsClickSort] = useState<boolean>(false);
  const sortBtnRef = useRef<HTMLDivElement>(null);
  const { handleModal } = ModalFunc();

  const toggleIsClickSort = useCallback(() => {
    setIsClickSort((prevState) => !prevState);
  }, []);
  // 수정할 예정.. 다른 곳 클릭해도 드롭다운 메뉴가 닫히도록 구현할 예정
  const handleDropdown = useCallback(
    (e: React.MouseEvent): void => {
      if (
        sortBtnRef.current &&
        !sortBtnRef.current.contains(e.target as Node)
      ) {
        setIsClickSort(false);
      }
    },
    [setIsClickSort]
  );

  return (
    <S.AccountContainer>
      <S.MenuHeaderContainer>
        <H1>자산 현황</H1>
        <S.SearchAndSortWrapper>
          <S.AddAccountBtn>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => handleModal(ModalKeys.ADD_ACCOUNT)}
            />
          </S.AddAccountBtn>
          <S.DropdownContainer>
            <S.AccountSort onClick={toggleIsClickSort} ref={sortBtnRef}>
              <span>정렬 순서</span>
              <S.AccountSortIcon
                icon={faAngleDown}
                data-spinsorticon={isClickSort}
              />
            </S.AccountSort>
            {isClickSort && (
              <S.Dropdown data-activedropdown={isClickSort}>
                <S.DropdownItem>금액 많은 순</S.DropdownItem>
                <S.DropdownItem>금액 적은 순</S.DropdownItem>
                <S.DropdownItem>최신 등록 순</S.DropdownItem>
                <S.DropdownItem>오래된 순</S.DropdownItem>
              </S.Dropdown>
            )}
          </S.DropdownContainer>
        </S.SearchAndSortWrapper>
      </S.MenuHeaderContainer>

      {/* 계좌 목록 */}
      <AccountListContainer />
    </S.AccountContainer>
  );
};

export default AccountContainer;

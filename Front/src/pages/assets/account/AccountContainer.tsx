import React, { useCallback, useEffect, useRef, useState } from "react";
import S from "./style";
import AccountListContainer from "./AccountListContainer";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalFunc from "../../../components/modal/utils/ModalFunc";
import { ModalKeys } from "../../../components/modal/keys/ModalKeys";
import { H1 } from "../../../components/htags/style";
import { Account } from "../types";

const AccountContainer: React.FunctionComponent = (): JSX.Element => {
  const [ bankInfo, setBankInfo ] = useState<Account[]>([]);
  const [isClickSort, setIsClickSort] = useState<boolean>(false);
  const sortBtnRef = useRef<HTMLDivElement>(null);
  const { handleModal } = ModalFunc();

  const toggleIsClickSort = useCallback(() => {
    setIsClickSort((prevState) => !prevState);
  }, []);
  
  useEffect(() => {
    const closeDropdown = (e: MouseEvent): void => {
        if ( sortBtnRef.current && !sortBtnRef.current.contains(e.target as Node) ) {
          setIsClickSort(false);
        }
    };
    
    // useEffect() 훅함수 내에서 선언하여 렌더링 될 때 전역 이벤트 설정
    document.addEventListener("click", closeDropdown);
    
    // useEffect() 훅함수에서 return은 컴포넌트가 언마운트 될 때 설정한 전역 이벤트도 제거
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  // 드롭아이템 이벤트 함수
  const closeDropdownItem = (newBankInfo: Account[]): void => {
    setBankInfo(newBankInfo);
    setIsClickSort(false);
  };
  const highCost = () => {
    const newBankInfo = bankInfo.sort((prev: Account, current: Account) => current.accountBalance - prev.accountBalance);
    closeDropdownItem(newBankInfo);
  };
  const lowCost = () => {
    const newBankInfo = bankInfo.sort((prev: Account, current: Account) => prev.accountBalance - current.accountBalance);
    closeDropdownItem(newBankInfo);
  };
  const latest = () => {
    const newBankInfo = bankInfo.sort((prev: Account, current: Account) => new Date(current.accountOpeningDate).getTime() - new Date(prev.accountOpeningDate).getTime());
    closeDropdownItem(newBankInfo);
  };
  const timeworn = () => {
    const newBankInfo = bankInfo.sort((prev: Account, current: Account) => new Date(prev.accountOpeningDate).getTime() - new Date(current.accountOpeningDate).getTime());
    closeDropdownItem(newBankInfo);
  };

  return (
    <S.AccountContainer>
      <S.MenuHeaderContainer>
        <H1>자산 현황</H1>
        <S.SearchAndSortWrapper>
          <S.AddAccountBtn>
            <FontAwesomeIcon icon={faPlus} onClick={() => handleModal(ModalKeys.ADD_ACCOUNT)} />
          </S.AddAccountBtn>

          <S.DropdownContainer>
            <S.AccountSort onClick={toggleIsClickSort} ref={sortBtnRef}>
              <span>정렬 순서</span>
              <S.AccountSortIcon icon={faAngleDown} data-spinsorticon={isClickSort} />
            </S.AccountSort>

            {isClickSort && (
              <S.Dropdown data-activedropdown={isClickSort}>
                <S.DropdownItem onClick={highCost}>금액 많은 순</S.DropdownItem>
                <S.DropdownItem onClick={lowCost}>금액 적은 순</S.DropdownItem>
                <S.DropdownItem onClick={latest}>최신 등록 순</S.DropdownItem>
                <S.DropdownItem onClick={timeworn}>오래된 순</S.DropdownItem>
              </S.Dropdown>
            )}
          </S.DropdownContainer>
        </S.SearchAndSortWrapper>
      </S.MenuHeaderContainer>

      {/* 계좌 목록 */}
      <AccountListContainer bankInfo={bankInfo} setBankInfo={setBankInfo}/>
    </S.AccountContainer>
  );
};

export default AccountContainer;

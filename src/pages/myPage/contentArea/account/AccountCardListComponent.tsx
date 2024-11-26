import React from 'react';
import S from './style';

const AccountCardListComponent = () => {
    return (
        <S.FilledAccountWrapper>
            {/* 카드리스트 상단 */}
            <S.FilledAccountHeader>
                <S.BankInfoContainer>
                    <S.BankInfoWrapper>
                        <S.BankLogo>
                            <img src={`${process.env.PUBLIC_URL}/images/myPage/account/bank-img.jpg`} alt="은행 로고" />
                        </S.BankLogo>
                        <S.BaniInfo>
                            <h4>KB국민은행</h4>
                            <h4>123456789-12-123456</h4>
                        </S.BaniInfo>
                    </S.BankInfoWrapper>
                    
                    <S.AccountNumberCopyBtn>
                            <img src={`${process.env.PUBLIC_URL}/images/myPage/account/copy-icon.svg`} alt="복사 버튼" />
                    </S.AccountNumberCopyBtn>
                </S.BankInfoContainer>

                <S.CardlistMenuBtn>
                    <img src={`${process.env.PUBLIC_URL}/images/myPage/account/hamburger.svg`} alt="메뉴 버튼" />
                </S.CardlistMenuBtn>
            </S.FilledAccountHeader>

            {/* 카드리스트 하단 */}
            <S.FilledFooter>
                <S.BalanceHideBtn />
                <S.Balance>
                    <span>300,000,000 원</span>
                </S.Balance>
                <S.RemittanceBtn>송금</S.RemittanceBtn>
            </S.FilledFooter>
        </S.FilledAccountWrapper>
    );
};

export default AccountCardListComponent;
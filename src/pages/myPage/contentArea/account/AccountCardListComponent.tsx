import React, { useCallback, useRef, useState } from 'react';
import S from './style';

type Props = {
    index: number;
}

const AccountCardListComponent: React.FunctionComponent<Props> = ({ index }): JSX.Element => {
    const [ displayBtn, setDisplayBtn ] = useState<boolean>(false);
    const handleDisplay = (): void => setDisplayBtn((prevDisplayBtn: boolean): boolean => !prevDisplayBtn);
    
    const accountNumber = "123456789-12-123456";

    const [ copy, setCopy ] = useState<boolean>(false);
    const lastClickTime = useRef<number | null>(null);
    const handleCopy = useCallback(async (): Promise<void> => {
        const now = Date.now();

        if (lastClickTime.current && now - lastClickTime.current < 2000) {
            console.log("Throttle active. Copy not allowed.");
            return; // 스로틀 활성화 중에는 복사 방지
        }
    
        lastClickTime.current = now; // 현재 시간을 기록
        
        try {
            await navigator.clipboard.writeText(accountNumber);
            setCopy(true);

            setTimeout(() => {
                setCopy(false);
            }, 2000);

        }catch(error) {
            console.error("Faild to copy account number : ", error);
        }
    }, []);

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
                    
                    <S.AccountNumberCopyBtn onClick={handleCopy}>
                        <img src={`${process.env.PUBLIC_URL}/images/myPage/account/copy-icon.svg`} alt="복사 버튼" />
                    </S.AccountNumberCopyBtn>
                </S.BankInfoContainer>

                <S.CardlistMenuBtn>
                    <img src={`${process.env.PUBLIC_URL}/images/myPage/account/hamburger.svg`} alt="메뉴 버튼" />
                </S.CardlistMenuBtn>
            </S.FilledAccountHeader>

            {/* 카드리스트 하단 */}
            <S.FilledFooter>
                <S.BalanceHideBtn>
                    <input id={`balance-hide-btn${index}`} type="checkbox" />
                    <label htmlFor={`balance-hide-btn${index}`} onClick={handleDisplay}/>
                </S.BalanceHideBtn>
                <S.Balance>
                    <span className={displayBtn ? "balance-hidden" : ""}>300,000,000 원</span>
                </S.Balance>
                <S.RemittanceBtn>송금</S.RemittanceBtn>
            </S.FilledFooter>

            {copy && <S.CopyMessage>복사가 완료되었습니다.</S.CopyMessage>}
        </S.FilledAccountWrapper>
    );
};

export default AccountCardListComponent;
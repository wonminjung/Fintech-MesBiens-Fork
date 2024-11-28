import React, { useState } from 'react';
import S from './style';
import AccountCardListComponent from './AccountCardListComponent';

const AccountListContainer: React.FunctionComponent = (): JSX.Element => {

    const [ isAccount, setIsAccount ] = useState(false);

    return (
        <S.AccountListContainer>
            {/* 계좌 없을 때 */}
            <S.AccountCardListWrapper>
                {/* AccountCardList map 으로 반복 예정 */}
                {
                    isAccount ?
                    <AccountCardListComponent />
                    :
                    <S.EmptyAccountWrapper>
                        <S.AddAccountBtn>+</S.AddAccountBtn>
                        <S.EmptyAccountDescription>
                            등록된 계좌가 없습니다!
                        </S.EmptyAccountDescription>
                        <S.EmptyAccountTip>
                            Tip. 그거 알고 계셨나요? 계좌가 없으면 돈이 없다는 사실
                        </S.EmptyAccountTip>
                    </S.EmptyAccountWrapper>
                }
            </S.AccountCardListWrapper>

            {/* 계좌 있을 때, 임시용 */}
            <S.AccountCardListWrapper>
                <AccountCardListComponent />
            </S.AccountCardListWrapper>
            <S.AccountCardListWrapper>
                <AccountCardListComponent />
            </S.AccountCardListWrapper>
            <S.AccountCardListWrapper>
                <AccountCardListComponent />
            </S.AccountCardListWrapper>
        </S.AccountListContainer>
    );
};

export default AccountListContainer;
import React, { useState } from 'react';
import S from './style';
import AccountCardListComponent from './AccountCardListComponent';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AccountListContainer: React.FunctionComponent = (): JSX.Element => {

    const accountList = new Array(3).fill(1);
    const [ isAccount, setIsAccount ] = useState(false);

    return (
        <S.AccountListContainer>
            {/* 계좌 없을 때 */}
            <S.AccountCardListWrapper>
                {/* AccountCardList map 으로 반복 예정 */}
                {
                    isAccount ?
                    <AccountCardListComponent index={0}/>
                    :
                    <S.EmptyAccountWrapper>
                        <S.AddAccountBtn>
                            <FontAwesomeIcon icon={faPlus} />
                        </S.AddAccountBtn>
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
            {accountList.map((_, index: number): JSX.Element => (
                <S.AccountCardListWrapper key={index}>
                    <AccountCardListComponent index={index}/>
                </S.AccountCardListWrapper>
            ))}
        </S.AccountListContainer>
    );
};

export default AccountListContainer;
import React from 'react';
import S from './style';
import AccountContainer from './account/AccountContainer';

const AssetsContainer: React.FunctionComponent = (): JSX.Element => {


    return(
        <S.AssetsContainer>
            <S.AssetsWrapper>
                {/* 계좌 목록 */}
                <AccountContainer />
            </S.AssetsWrapper>
        </S.AssetsContainer>
    );
};

export default AssetsContainer;

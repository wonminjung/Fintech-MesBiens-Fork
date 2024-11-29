import * as React from 'react';
import AccountListContainer from './AccountListContainer';

interface IAccountContainerProps {
}

const AccountContainer: React.FunctionComponent<IAccountContainerProps> = (props): JSX.Element => {
    return (
        <>
            {/* 계좌 목록 */}
            <AccountListContainer />
        </>
    );
};

export default AccountContainer;

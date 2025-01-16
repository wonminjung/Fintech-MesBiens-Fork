import React from 'react';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ModalFunc from '../../utils/ModalFunc';
import Account from '../../../../pages/assets/type';

interface ModiAccountProps {
    acct: Account;
}

const ModiAccount: React.FC<ModiAccountProps> = ({ acct }) => {
    const { closeModal } = ModalFunc();
    console.log(acct);
    // const { bankName, bankLogo } = acct?.bankCode;
    // const { accountNumber, accountBalance } = acct;

    return (
        <S.Container>
            <S.Header>
                <S.Title>계좌 수정</S.Title>
                <S.CloseBtn onClick={() => closeModal()}>
                    <FontAwesomeIcon icon={faXmark} />
                </S.CloseBtn>
            </S.Header>

            {/* <p>{bankName}</p>
            <p>{bankLogo}</p>
            <p>{accountNumber}</p>
            <p>{accountBalance}</p> */}
        </S.Container>
    );
};

export default ModiAccount;
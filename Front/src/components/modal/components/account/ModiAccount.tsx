import React, { useEffect, useState } from 'react';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ModalFunc from '../../utils/ModalFunc';
import { RootState } from '../../../../modules/store/store';
import { useSelector } from 'react-redux';
import { BankInfo } from '../../../../pages/assets/types';

const ModiAccount: React.FC<any> = () => {
    const { closeModal } = ModalFunc();
    const { modalProps } = useSelector((state: RootState) => state.modal);
    const [ bankList, setBankList ] = useState<BankInfo[]>([]);

    const { bankName, bankLogo } = modalProps?.bankCode || {};
    const { accountNumber, accountBalance } = modalProps || {};

    useEffect(() => {
        const bankData = async () => {
            const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/allBankList`);
            const data: BankInfo[] = await response.json();
            
            return data;
        };
        
        bankData()
        .then((resData) => {
            setBankList(resData);
        })
        .catch(() => console.log("뱅크 데이터 불러오기 실패"));
    }, []);

    return (
        <S.Container>
            <S.Header>
                <S.Title>계좌 수정</S.Title>
                <S.CloseBtn onClick={() => closeModal()}>
                    <FontAwesomeIcon icon={faXmark} />
                </S.CloseBtn>
            </S.Header>

            {modalProps && bankList && (
                <>
                    <p>{bankName}</p>
                    <p>{bankLogo}</p>
                    <p>{accountNumber}</p>
                    <p>{accountBalance}</p>
                    {bankList.map((bank: BankInfo) => (
                        <div key={bank.bankCode}>
                            <p>{bank.bankCode}</p>
                            <p>{bank.bankLogo}</p>
                            <p>{bank.bankName}</p>
                        </div>
                    ) )}
                </>
            )}
            
        </S.Container>
    );
};

export default ModiAccount;
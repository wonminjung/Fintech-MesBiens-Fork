import React, { useState } from 'react';
import { ModalPropsType } from '../../../../modules/modal/types';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ModalFunc from '../../utils/ModalFunc';

type Props = {
    modalProps: ModalPropsType;
}

const AddAccount: React.FunctionComponent<Props> = ({ modalProps }): JSX.Element => {
    type FormData = {
        bankName: string;
        accountNumber: string;
        accountPassword: string;
    }

    const { closeModal } = ModalFunc();
    const [ formData, setFormdata ] = useState<FormData>(
        {
            bankName: "",
            accountNumber: "",
            accountPassword: ""
        }
    );

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormdata(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        );
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = JSON.stringify(formData);

        console.log(data);
    };

    return (
        <S.AddAccountContainer>
            <S.Header>
                <S.Title>계좌 추가</S.Title>
                <S.CloseBtn onClick={() => closeModal()}>
                    <FontAwesomeIcon icon={faXmark} />
                </S.CloseBtn>
            </S.Header>

            <S.Form method="POST" action="#" onSubmit={onSubmit}>
                <S.FormBody >
                    <S.FieldContainer>
                        <S.FieldLabel htmlFor="bankName">은행명</S.FieldLabel>
                        <S.FieldInput id="bankName" name="bankName" placeholder="은행명을 입력하세요" onBlur={handleBlur} />
                    </S.FieldContainer>
                    <S.FieldContainer>
                        <S.FieldLabel htmlFor="accountNumber">계좌번호</S.FieldLabel>
                        <S.FieldInput id="accountNumber" name="accountNumber" placeholder="계좌번호를 입력하세요" onBlur={handleBlur} />
                    </S.FieldContainer>
                    <S.FieldContainer>
                        <S.FieldLabel htmlFor="accountPassword">계좌 비밀번호</S.FieldLabel>
                        <S.FieldInput type="password" id="accountPassword" name="accountPassword" placeholder="비밀번호를 입력하세요" onBlur={handleBlur} />
                    </S.FieldContainer>
                </S.FormBody>
                
                <S.Footer>
                    <S.SubmitBtn>완료</S.SubmitBtn>
                </S.Footer>
            </S.Form>
        </S.AddAccountContainer>
    );
};

export default AddAccount;

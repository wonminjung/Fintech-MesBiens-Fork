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
    const bankList = [
        "KB국민은행",
        "우리은행",
        "신한은행",
        "하나은행",
        "IBK기업은행"
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormdata(
            {
                ...formData,
                [e.target.id]: e.target.value
            }
        );
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = JSON.stringify(formData);

        console.log(data);
    };

    return (
        <S.Container>
            <S.Header>
                <S.Title>계좌 등록</S.Title>
                <S.CloseBtn onClick={() => closeModal()}>
                    <FontAwesomeIcon icon={faXmark} />
                </S.CloseBtn>
            </S.Header>

            <S.Form method="POST" action="#" onSubmit={onSubmit}>
                <S.FormBody>
                    <table>
                        <tbody>
                            <S.FieldContainer>
                                <th >
                                    <S.FieldLabel htmlFor="bankName">은행명</S.FieldLabel>
                                </th>
                                <td>
                                    <S.SelectBank id="bankName" value={formData.bankName} onChange={handleChange} required >
                                        {bankList.map((bank) => (
                                            <option key={bank} value={bank}>
                                                {bank}
                                            </option>
                                        ))}
                                    </S.SelectBank>
                                </td>
                            </S.FieldContainer>
                            <S.FieldContainer>
                                <th>
                                    <S.FieldLabel htmlFor="accountNumber">계좌번호</S.FieldLabel>
                                </th>
                                <td>
                                    <S.FieldInput id="accountNumber" name="accountNumber" placeholder="계좌번호를 입력하세요" onChange={handleChange} maxLength={12} />
                                </td>
                            </S.FieldContainer>
                            <S.FieldContainer>
                                <th>
                                    <S.FieldLabel htmlFor="accountPassword">계좌 비밀번호</S.FieldLabel>
                                </th>
                                <td>
                                    <S.FieldInput type="password" id="accountPassword" name="accountPassword" placeholder="비밀번호를 입력하세요" onChange={handleChange} maxLength={4} />
                                </td>
                            </S.FieldContainer>
                        </tbody>
                    </table>
                </S.FormBody>
                
                <S.Footer>
                    <S.SubmitBtn>완료</S.SubmitBtn>
                </S.Footer>
            </S.Form>
        </S.Container>
    );
};

export default AddAccount;

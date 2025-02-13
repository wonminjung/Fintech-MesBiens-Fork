import React, { useEffect, useState } from 'react';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ModalFunc from '../../utils/ModalFunc';
import { BankInfo, FormData } from './type';
import { RootState } from '../../../../modules/store/store';
import { useSelector } from 'react-redux';
import { ApiResponse } from '../../../../modules/transaction/apiResponse';

const AddAccount: React.FunctionComponent = (): JSX.Element => {
    const { closeModal } = ModalFunc();
    const [ bankList, setBankList ] = useState<BankInfo[]>([]);
    const [ formData, setFormdata ] = useState<FormData>(
        {
            bankName: "",
            accountNumber: "",
            accountPassword: ""
        }
    );
    const { member } = useSelector((state: RootState) => state.user);

    const fetchBankList = async () => {
        const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/allBankList`);
        const banks: BankInfo[] = await response.json();

        return { banks, response };
    };

    useEffect(() => {
        fetchBankList()
        .then(({ banks, response }) => {
            if(response.ok || response.status === 200) {
                setBankList(banks);
            }
        })
        .catch(() => {
            alert("은행 정보를 가져오지 못했습니다.");
            closeModal();
        });
    }, []);

    // bankList가 업데이트되면 formData의 기본값을 설정하는 useEffect
    useEffect(() => {
        if (bankList.length > 0 && formData.bankName === "") {
        setFormdata((prev) => ({
            ...prev,
            bankName: bankList[0].bankName,
        }));
        }
  }, [bankList]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormdata(
            {
                ...formData,
                [e.target.id]: e.target.value
            }
        );
    };

    const addAccountFetch = async () => {
        const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/add`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(
                    {
                        memberNo: member.memberNo,
                        ...formData
                    }
                )
            }
        );
        const data: ApiResponse = await response.json();

        return { data, response };
    };
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(
            {
                memberNo: member.memberNo,
                ...formData
            }
        );

        addAccountFetch()
        .then(({ data, response }) => {
            if(response.ok || response.status === 200) {
                alert(data.message);
                closeModal();

                return;
            }
        })
        .catch(() => alert("계좌 추가 실패"));
    };

    return (
        <S.Container>
            <S.Header>
                <S.Title>계좌 등록</S.Title>
                <S.CloseBtn onClick={() => closeModal()}>
                    <FontAwesomeIcon icon={faXmark} />
                </S.CloseBtn>
            </S.Header>

            <S.Form method="POST" onSubmit={onSubmit}>
                <S.FormBody>
                    <table>
                        <tbody>
                            <S.FieldContainer>
                                <th >
                                    <S.FieldLabel htmlFor="bankName">은행명</S.FieldLabel>
                                </th>
                                <td>
                                    <S.SelectBank id="bankName" value={formData.bankName} onChange={handleChange} required >
                                        {bankList.map((bank: BankInfo, index: number) => (
                                            <option key={bank.bankCode}>
                                                {bank.bankName}
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
                                    <S.FieldInput id="accountNumber" name="accountNumber" placeholder="계좌번호를 입력하세요 (- 제외)" onChange={handleChange} maxLength={12} />
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

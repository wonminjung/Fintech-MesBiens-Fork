import React from 'react';
import S from './style';
import FormFieldComponent from './FormFieldComponent';
import { MemInfo } from './types';



const MemInfoModiComponent: React.FunctionComponent = ():JSX.Element => {
    const fieldMap: MemInfo[] = [
        {
            fieldName: "이름",
            value: "memberName"
        },
        {
            fieldName: "이메일",
            value: "memberEmail"
        },
        {
            fieldName: "핸드폰번호",
            value: "memberPhone"
        },
        {
            fieldName: "주소",
            value: "memberAddress"
        },
        {
            fieldName: "생년월일",
            value: "memberBirth"
        }
    ];

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const fetchData = async () => {
            const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/`);
        };

        fetchData()
        .then(() => {})
        .catch(() => {});
    };

    return (
        <S.FormField method="post">
            <S.FieldWrapper>
                <S.FieldTitle>기본 정보</S.FieldTitle>

                <S.FieldTable>
                    <tbody>
                        {fieldMap.map((data: MemInfo, i: number): JSX.Element => (
                            <FormFieldComponent key={i} data={data} />
                        ))}
                    </tbody>
                </S.FieldTable>
                <S.EditBtnContainer>
                    <S.EditBtn onClick={handleSubmit}>수정 완료</S.EditBtn>
                </S.EditBtnContainer>
            </S.FieldWrapper>
        </S.FormField>
    );
};

export default MemInfoModiComponent;
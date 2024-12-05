import React from 'react';
import S from './style';



const MemInfoModiComponent: React.FunctionComponent = ():JSX.Element => {

    const tempMemInfo = [
        {
            fieldName: "아이디",
            value: ""
        },
        {
            fieldName: "닉네임",
            value: ""
        },
        {
            fieldName: "이름",
            value: ""
        },
        {
            fieldName: "핸드폰",
            value: ""
        },
        {
            fieldName: "이메일",
            value: ""
        },
        {
            fieldName: "주소",
            value: ""
        },
        {
            fieldName: "출생년도",
            value: { first: "", second: "", third: "" }
        }
    ];

    return (
        <S.FormField method="post">
            <S.FieldWrapper>
                <S.FieldTitle>기본 정보</S.FieldTitle>

                <S.FormField>

                </S.FormField>
            </S.FieldWrapper>
        </S.FormField>
    );
};

export default MemInfoModiComponent;
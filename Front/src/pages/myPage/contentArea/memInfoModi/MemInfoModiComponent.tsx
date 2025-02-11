import React, { useState } from 'react';
import S from './style';
import FormFiledComponent from './FormFiledComponent';
import { RootState } from '../../../../modules/store/store';
import { useSelector } from 'react-redux';
import { MemInfo } from './types';



const MemInfoModiComponent: React.FunctionComponent = ():JSX.Element => {
    const member = useSelector((state: RootState) => state.user);
    const [ memInfo, setMemInfo ] = useState<MemInfo[]>([
        {
            fieldName: "아이디",
            value: member.member.memberId
        },
        {
            fieldName: "이름",
            value: member.member.memberName
        },
        {
            fieldName: "핸드폰",
            value: member.member.memberPhone
        },
        {
            fieldName: "이메일",
            value: member.member.memberEmail
        },
        {
            fieldName: "주소",
            value: member.member.memberAddress
        },
        {
            fieldName: "출생년도",
            value: member.member.memberBirth
        }
    ]);

    return (
        <S.FormField method="post">
            <S.FieldWrapper>
                <S.FieldTitle>기본 정보</S.FieldTitle>

                <S.FieldTable>
                    <tbody>
                        {memInfo.map((info: MemInfo, i: number): JSX.Element => (
                            <FormFiledComponent key={i} info={info} index={i} setMemInfo={setMemInfo} />
                        ))}
                    </tbody>
                </S.FieldTable>
                <S.EditBtnContainer>
                    <S.EditBtn>수정 완료</S.EditBtn>
                </S.EditBtnContainer>
            </S.FieldWrapper>
        </S.FormField>
    );
};

export default MemInfoModiComponent;
import React, { useState } from 'react';
import S from './style';

const ChangePwdComponent: React.FunctionComponent = () => {
    

    const hasLowercase = /[a-z]/;
    const hasUppercase = new RegExp("[A-Z]");
    const hasSpecialChar = /[!$&-]+/;
    const hasDigit = new RegExp("[0-9]");

    const isValidPassword = (pwd: string): boolean => {
        let matchCount = 0;

        if(hasLowercase.test(pwd)) matchCount++;
        if(hasUppercase.test(pwd)) matchCount++;
        if(hasSpecialChar.test(pwd)) matchCount++;
        if(hasDigit.test(pwd)) matchCount++;
        
        return matchCount >= 2;
    };

    return (
        <S.Container>
            <S.Wrapper>
                <S.FieldTitle>비밀번호 변경</S.FieldTitle>

                <S.Table>
                    <tbody>
                        <S.Tr>
                            <S.Th>현재 비밀번호</S.Th>
                            <S.Td>
                                <S.Input type="password"/>
                            </S.Td>
                        </S.Tr>
                        <S.Tr>
                            <S.Th>새 비밀번호</S.Th>
                            <S.Td>
                                <S.Input type="password" />
                                <S.Message>{}</S.Message>
                            </S.Td>
                        </S.Tr>
                        <S.Tr>
                            <S.Th data-underline={false}>새 비밀번호 확인</S.Th>
                            <S.Td data-underline={false}>
                                <S.Input type="password" />
                                <S.Message>{}</S.Message>
                            </S.Td>
                        </S.Tr>
                    </tbody>
                </S.Table>

                <S.BtnContainer>
                    <S.Btn>초기화</S.Btn>
                    <S.Btn>확인</S.Btn>
                </S.BtnContainer>
            </S.Wrapper>
        </S.Container>
    );
};

export default ChangePwdComponent;

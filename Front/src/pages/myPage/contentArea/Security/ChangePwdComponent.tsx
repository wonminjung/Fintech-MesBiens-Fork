import React, { useCallback, useState } from 'react';
import S from './style';

type Props = {

}

const ChangePwdComponent: React.FunctionComponent<Props> = () => {
    const [ password, setPassword ] = useState<string>("");
    
    const hasLowercase = /[a-z]/;
    const hasUppercase = /[A-Z]/;
    const hasSpecialChar = /[!$&-]+/;
    const hasDigit = /\d/;

    const isValidPassword = (pwd: string): boolean => {
        let matchCount = 0;

        if(hasLowercase.test(pwd)) matchCount++;
        if(hasUppercase.test(pwd)) matchCount++;
        if(hasSpecialChar.test(pwd)) matchCount++;
        if(hasDigit.test(pwd)) matchCount++;
        
        return matchCount >= 2;
    };

    const isEmpty = (str: string): boolean => str.trim().length === 0;
    const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputData = e.target.value;
        setPassword(() => inputData);
    };

    const setMessage = useCallback((): string => {
        if(password !== "") {
            if(password.length < 10 || password.length > 16) {
                return "비밀번호는 10 ~ 16자로 설정해야 합니다."
            }
            if(!isValidPassword(password)) {
                return "비밀번호는 대소문자/숫자/특수문자(!, #, &, - 만 가능) 중 2가지 이상 조합하여 설정해야 합니다."
            }
        }

        return "영문 대소문자/숫자/특수문자를 조합하여 10~16자로 입력해주세요.";
    }, [password]);

    return (
        <S.Container>
            <S.Wrapper>
                <S.FieldTitle>비밀번호 변경</S.FieldTitle>

                <S.Table>
                    <tbody>
                        <S.Tr>
                            <S.Th align="left">현재 비밀번호</S.Th>
                            <S.Td>
                                <S.Input type="password" onBlur={checkPassword} />
                            </S.Td>
                        </S.Tr>
                        <S.Tr>
                            <S.Th align="left">새 비밀번호</S.Th>
                            <S.Td>
                                <S.Input type="password" onBlur={checkPassword} />
                                <S.Message>
                                    {setMessage()}
                                </S.Message>
                            </S.Td>
                        </S.Tr>
                        <S.Tr>
                            <S.Th align="left" data-underline={false}>새 비밀번호 확인</S.Th>
                            <S.Td data-underline={false}>
                                <S.Input type="password" onBlur={checkPassword} />
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

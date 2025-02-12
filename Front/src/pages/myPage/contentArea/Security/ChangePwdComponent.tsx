import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import S from './style';
import { RootState } from '../../../../modules/store/store';
import { useSelector } from 'react-redux';

const ChangePwdComponent: React.FunctionComponent = () => {
    const [ currentPass, setCurrentPass ] = useState<string>("");
    const [ pass, setPass ] = useState<string>("");
    const [ pass2, setPass2 ] = useState<string>("");
    const [ passCheck, setPassCheck ] = useState<boolean>(false);
    const [ pass2Check, setPass2Check ] = useState<boolean>(false);
    const [ passMessage, setPassMessage ] = useState<string>("");
    const [ pass2Message, setPass2Message ] = useState<string>("");

    const currentPassRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const pass2Ref = useRef<HTMLInputElement>(null);

    const { member } = useSelector((state: RootState) => state.user);

    // 정규표현식 검사
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

    const changeCurrPass = (e: ChangeEvent<HTMLInputElement>) => setCurrentPass(e.target.value);
    const changePass = (e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value);
    const changePass2 = (e: ChangeEvent<HTMLInputElement>) => setPass2(e.target.value);

    // 유효성 검증 함수
    const validatePass = () => {
        if(pass === "") {
            setPassCheck(false);
            setPassMessage("대문자/소문자/숫자/특수문자를 조합하여 10~16자로 입력해주세요.");
        }else if(!isValidPassword(pass)) {
            setPassCheck(true);
            setPassMessage("대문자/소문자/숫자/특수 문자 중 2가지 이상 조합하셔야 합니다.");
        }else {
            setPassCheck(false);
            setPassMessage("");
        }
    };
    const validatePass2 = () => {
        if(pass2 !== "" && pass !== pass2) {
            setPass2Check(true);
            setPass2Message("패스워드가 서로 일치하지 않습니다.");
        }else {
            setPass2Check(false);
            setPass2Message("");
        }
    };

    useEffect(() => {
        validatePass();
        validatePass2();
    }, [pass, pass2]);

    // 입력필드 초기화 함수
    const refReset = (ref: React.RefObject<HTMLInputElement>) => {
        if(ref.current) {
            ref.current.value = "";
        }
    };

    // 입력값 전체 초기화
    const handleReset = () => {
        setCurrentPass("");
        setPass("");
        setPass2("");
        
        refReset(currentPassRef);
        refReset(passRef);
        refReset(pass2Ref);
    };

    const fetchRequest = async () => {
        console.log(passRef.current?.value);
        console.log(member.memberEmail);
        // 현재 패스워드도 같이 보내야 하는데 백엔드에서 아직 미완성
        // currentPassword: currentPassRef.current?.value,
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/members/reset-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(
                    {
                        
                        email: member.memberEmail,

                        newPassword: passRef.current?.value
                    }
                )
            }
        );
        const data: any = await response.json();
        // const message: string = await response.json();

        // return message;
        return { data, response };
    };

    // 서버로 데이터 전송
    const handleSubmit = () => {
        fetchRequest()
        .then(({ data, response }) => {
            console.log(data);
            console.log(response);
        })
        // .catch(() => alert("비밀번호 변경 실패"));
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
                                <S.Input type="password" onBlur={changeCurrPass} ref={currentPassRef} />
                            </S.Td>
                        </S.Tr>
                        <S.Tr>
                            <S.Th>새 비밀번호</S.Th>
                            <S.Td>
                                <S.Input type="password" className={passCheck ? "warnPass" : ""} onBlur={changePass} ref={passRef} />
                                <S.Message className={passCheck ? "warnPassMessage" : ""}>
                                    {passMessage}
                                </S.Message>
                            </S.Td>
                        </S.Tr>
                        <S.Tr>
                            <S.Th data-underline={false}>새 비밀번호 확인</S.Th>
                            <S.Td data-underline={false}>
                                <S.Input type="password" className={pass2Check ? "warnPass" : ""} onBlur={changePass2} ref={pass2Ref} />
                                <S.Message className={pass2Check ? "warnPassMessage" : ""}>
                                    {pass2Message}
                                </S.Message>
                            </S.Td>
                        </S.Tr>
                    </tbody>
                </S.Table>

                <S.BtnContainer>
                    <S.Btn onClick={handleReset}>초기화</S.Btn>
                    <S.Btn onClick={handleSubmit}>확인</S.Btn>
                </S.BtnContainer>
            </S.Wrapper>
        </S.Container>
    );
};

export default ChangePwdComponent;

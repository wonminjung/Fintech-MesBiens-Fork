import React, { useState } from 'react';
import S from './style';
import { RootState } from '../../../../modules/store/store';
import { useSelector } from 'react-redux';
import { useCookies } from "react-cookie";

const BASE_URL = "http://localhost:7200"; // 백엔드 서버 주소

const MemWithdrawal: React.FunctionComponent = () => {
    const userState = useSelector((state: RootState) => state.user);
    const { token: reduxToken } = userState || {}; // Redux에서 token 가져오기

    console.log("Redux User State:", userState);
    console.log("Redux Token:", reduxToken);

    const [cookies] = useCookies<string>(["jwtToken"]); // useCookies 훅 사용
    console.log("쿠키 전체:", cookies);
    console.log("Cookies jwtToken:", cookies.jwtToken);

    // document.cookie로 쿠키 직접 확인 (HttpOnly 쿠키는 접근 불가)
    console.log("document.cookie 값:", document.cookie);
    const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwtToken="))
        ?.split("=")[1];

    console.log("Cookie Token from document.cookie:", cookieToken);

    // localStorage 확인
    const localStorageToken = localStorage.getItem("jwtToken");
    console.log("Local Storage Token:", localStorageToken);

    // 최종적으로 token 설정
    const token = reduxToken || cookies.jwtToken || localStorageToken;
    console.log("Final Token:", token);

    const [isUserDeleted, setIsUserDeleted] = useState<boolean>(false); // 회원 탈퇴 여부 상태 추가
    const [inputPwd, setInputPwd] = useState<string>(""); // 입력한 비밀번호
    const [error, setError] = useState<string>(""); // 에러 메시지 상태
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false); // 탈퇴 확인 모달 상태
    const notiList = [
        {
            notiId: 1,
            title: "회원탈퇴 시 유의사항",
            desc: `탈퇴 이후에는 동일한 계정으로 복구가 불가능합니다.
                   탈퇴 시 회원님의 모든 데이터가 삭제됩니다. 이는 계좌 정보, 퀴즈 기록 등이 포함됩니다.
                   일정 기간(예: 법적으로 요구되는 보존 기간 동안) 일부 데이터는 보존될 수 있습니다. 
                   예를 들어, 금융 거래 기록은 관련 규정에 따라 5년간 보관될 수 있습니다.`
        },
        {
            notiId: 2,
            title: "데이터 보존 정책",
            desc: `금융 거래와 관련된 정보는 탈퇴 이후에도 일정 기간 동안 보관됩니다. 이는 관계 법령에 따라 요구되는 사항입니다.
                   보존 기간 종료 후 모든 데이터는 완전히 삭제됩니다.`
        }
    ];

     /** 비밀번호 입력 핸들러 */
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPwd(e.target.value);
        setError(""); // 에러 메시지 초기화
    };

    /** 비밀번호 검증 요청 */
    const validatePassword = async () => {
        if (!inputPwd) {
            setError("비밀번호를 입력해주세요.");
            return;
        }

        if (!token) {
            setError("로그인이 필요합니다.");
            return;
        }

        try {
            console.log(" 프론트에서 전송할 Authorization 헤더:", `Bearer ${token}`);

            const response = await fetch(`${BASE_URL}/members/validate-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: "include",
                body: JSON.stringify({ password: inputPwd }),
            });

            const responseData = await response.text();
            console.log(" 응답 본문:", responseData);

            if (!response.ok) {
                throw new Error(`비밀번호 검증 실패: ${responseData}`);
            }

            if (responseData === "비밀번호 검증 성공") {
                setIsConfirmOpen(true);
            } else {
                setError("비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            console.error(" 비밀번호 검증 오류:", error);
            setError("서버 오류가 발생했습니다.");
        }
    };
    // userID 쿠키 삭제 함수
const removeUserIDCookie = () => {
    document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; SameSite=None;";
};

    /** 회원 탈퇴 요청 */
const handleDeleteAccount = async () => {
    if (!token) {
        setError("로그인이 필요합니다.");
        return;
    }

    try {
        console.log(" 회원 탈퇴 요청 시 토큰:", token);

        const response = await fetch(`${BASE_URL}/members/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include",
        });

        const responseData = await response.text();
        console.log(" 탈퇴 응답 본문:", responseData);

        if (response.ok) {
            alert("회원 탈퇴가 완료되었습니다.");

              
            //  쿠키 및 localStorage에서 userID 삭제
            localStorage.removeItem("userId"); // localStorage에서 userId 삭제
            sessionStorage.removeItem("userId"); // sessionStorage에서 userId 삭제 (필요한 경우)

            // 쿠키에서 userID 삭제
            removeUserIDCookie();

            //  쿠키 및 Redux 스토어 초기화 (로그아웃 처리)
            document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.removeItem("jwtToken");

            // 강제로 페이지 리디렉션 (캐시 문제 해결)
            setIsUserDeleted(true);
        } else {
            alert("회원 탈퇴 중 오류가 발생했습니다.");
        }
    } catch (error) {
        console.error("회원 탈퇴 오류:", error);
        alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
};
    
return (
    <S.SelectedMenuHeaderContainer>
        {isUserDeleted ? (
            <S.Modal>
                <S.ModalContent>
                    <S.NotiTitle>회원 탈퇴가 완료되었습니다.</S.NotiTitle>
                    <S.NotiDescription>
                        다시 로그인하려면 새 계정을 만들어주세요.
                    </S.NotiDescription>
                    <S.BtnContainer>
                        <S.Btn onClick={() => window.location.href = "/"}>홈으로</S.Btn>
                    </S.BtnContainer>
                </S.ModalContent>
            </S.Modal>
        ) : (
            <>
                <S.MenuTitle>회원 탈퇴</S.MenuTitle>

                <S.WithdrawalNotiContainer>
                    <S.NotiWrapper>
                        {notiList.map(({ notiId, title, desc }) => (
                            <S.NotiList key={notiId}>
                                <S.NotiTitle>{title}</S.NotiTitle>
                                <S.NotiDescription style={{ whiteSpace: "pre-line" }}>{desc}</S.NotiDescription>
                            </S.NotiList>
                        ))}
                    </S.NotiWrapper>
                </S.WithdrawalNotiContainer>

                <S.GuideContainer>
                    <S.GuideSpan>유의사항을 모두 확인하였으면 <strong>"현재 패스워드"</strong>를 입력하세요.</S.GuideSpan>
                    <S.GuideInput 
                        type="password" 
                        onChange={handlePasswordChange} 
                        value={inputPwd}
                    />
                    {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                </S.GuideContainer>

                <S.BtnContainer>
                    <S.Btn onClick={validatePassword}>확인</S.Btn>
                </S.BtnContainer>

                {isConfirmOpen && (
                    <S.Modal>
                        <S.ModalContent>
                            <S.NotiTitle>정말 회원 탈퇴하시겠습니까?</S.NotiTitle>
                            <S.NotiDescription>
                                탈퇴하면 계정이 삭제되며 모든 데이터가 사라집니다.
                            </S.NotiDescription>
                            <S.BtnContainer>
                                <S.Btn onClick={handleDeleteAccount}>회원 탈퇴</S.Btn>
                                <S.CancelBtn onClick={() => setIsConfirmOpen(false)}>돌아가기</S.CancelBtn>
                            </S.BtnContainer>
                        </S.ModalContent>
                    </S.Modal>
                )}
            </>
        )}
    </S.SelectedMenuHeaderContainer>
);
};

export default MemWithdrawal;
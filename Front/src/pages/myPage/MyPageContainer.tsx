import React, { useCallback, useState } from 'react';
import LeftAreaContainer from './leftArea/LeftAreaContainer';
import ContentAreaContainer from './contentArea/ContentAreaContainer';
import { ToLeftMenuComponentTypes, MenuList } from './types';
import MemInfoModiContainer from './contentArea/memInfoModi/MemInfoModiContainer';
import SecurityContainer from './contentArea/Security/SecurityContainer';
import MemWithdrawal from './contentArea/memWithdrawal/MemWithdrawal';
import S from './style';
import { RootState } from '../../modules/store/store';
import { useSelector } from 'react-redux';

const MyPageContainer: React.FunctionComponent = (): JSX.Element => {
    const menuList: MenuList[] = [
        {
            list: "정보 수정",
            component: (props: any) => <MemInfoModiContainer {...props}/>
        },
        {
            list: "보안 설정",
            component: (props: any) => <SecurityContainer {...props}/>
        },
        {
            list: "회원 탈퇴",
            component: (props: any) => <MemWithdrawal {...props}/>
        }
    ];
    const [ selectedMenuIndex, setSelectedMenuIndex ] = useState<number>(0);
    const handleClickMenu = useCallback((index: number): void => {
        setSelectedMenuIndex(() => index);
    }, []);

    /** LeftMenuComponent 로 전달할 Props */
    const toLeftMenuComponent: ToLeftMenuComponentTypes = {
        menuList: menuList,
        selectedMenuIndex: selectedMenuIndex,
        handleClickMenu: handleClickMenu
    };

    const { member } = useSelector((state: RootState) => state.user);
    const [ inputPwd, setInputPwd ] = useState<string>("");
    const [ match, setMatch ] = useState<boolean>(false);

    const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPwd(e.target.value);
    };
    // 패스워드 유효성 검증은 서버에서 해야해서 fetch로 날려야 함
    const validate = () => {
        if(inputPwd.trim() === "test") {
            setMatch(true);
            return;
        }
        alert("패스워드 불일치");
    };

    return (
        <>
            {
                match ? 
                (
                    <>
                        {/* 좌측 사이드 */}
                        <LeftAreaContainer toLeftMenuComponent={toLeftMenuComponent}/>
                        {/* 메인 컨텐츠 */}
                        <ContentAreaContainer menuList={menuList} selectedMenuIndex={selectedMenuIndex} />
                    </>
                )
                :
                (
                    <S.CertificationContainer>
                        <S.CertificationWrapper>
                            <S.HeaderWrapper>
                                <S.Header>마이페이지</S.Header>
                            </S.HeaderWrapper>

                            <S.SubHeaderWrapper>
                                <S.SubHeader>
                                    본인확인을 위해 <strong>계정 패스워드</strong>를 입력해주세요.
                                </S.SubHeader>
                            </S.SubHeaderWrapper>

                            <S.InputPwdContainer>
                                <S.InputPwdWrapper>
                                    <S.PwdLabel htmlFor="certiPwd">비밀번호</S.PwdLabel>
                                    <S.InputPwd id="certiPwd" type="password" onChange={handlePwd} maxLength={16}/>
                                    <S.ValidateBtn onClick={validate}>완료</S.ValidateBtn>
                                </S.InputPwdWrapper>
                            </S.InputPwdContainer>
                        </S.CertificationWrapper>
                    </S.CertificationContainer>
                )
            }
        </>
    );
};

export default MyPageContainer;
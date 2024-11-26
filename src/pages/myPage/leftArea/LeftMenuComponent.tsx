import React from 'react';
import S from './style';

const LeftMenuComponent = () => {
    return (
        <S.LeftMenuContainer>
            <S.LeftMenuWrapper>
                {/* 배열 map으로 li 정리 예정 */}
                <li>
                    <a href="#" className="selected">계좌 관리</a>
                </li>
                <li>
                    <a href="#">회원정보 수정</a>
                </li>
                <li>
                    <a href="#">회원탈퇴</a>
                </li>
                <li>
                    <a href="#">2차 패스워드 설정</a>
                </li>
            </S.LeftMenuWrapper>
        </S.LeftMenuContainer>
    );
};

export default LeftMenuComponent;
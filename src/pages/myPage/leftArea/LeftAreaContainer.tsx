import React from 'react';
import S from './style';
import UserProfileComponent from './UserProfileComponent';
import LeftMenuComponent from './LeftMenuComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const LeftAreaContainer: React.FunctionComponent = (): JSX.Element => {
    return (
        <S.LeftAreaContainer>
            <S.HeaderSection>
                {/* 설정 버튼 */}
                <S.SettingBtnContainer>
                    <S.SettingBtn>
                        <FontAwesomeIcon icon={faGear} />
                    </S.SettingBtn>
                </S.SettingBtnContainer>
                {/* 유저 프로필 사진 */}
                <UserProfileComponent />
            </S.HeaderSection>

            {/* 좌측 서브 메뉴 */}
            <LeftMenuComponent />
        </S.LeftAreaContainer>
    );
};

export default LeftAreaContainer;
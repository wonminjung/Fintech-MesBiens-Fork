import React from 'react';
import S from './style';
import ModalFunc from '../../../components/modal/utils/ModalFunc';
import { ModalKeys } from '../../../components/modal/keys/ModalKeys';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules/store/store';

const UserProfileComponent: React.FunctionComponent = (): JSX.Element => {
  const { handleModal } = ModalFunc();
  const member = useSelector((state: RootState) => state.user);

  return (
    <S.UserProfileContainer>
      <S.ProfileImage onClick={() => handleModal(ModalKeys.PROFILE_SETTING)}>
          <img src={`${process.env.PUBLIC_URL}/images/myPage/profile/user-profile.jpg`} alt="프로필 사진" />
      </S.ProfileImage>

      <S.UserProfileInfo>
        <S.UserProfileId>{member.name}</S.UserProfileId>
        <S.UserProfileEmail>{member.email}</S.UserProfileEmail>
      </S.UserProfileInfo>
    </S.UserProfileContainer>
  );
};

export default UserProfileComponent;

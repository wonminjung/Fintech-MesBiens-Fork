import React from "react";
import S from "./style";

const UserProfileComponent: React.FunctionComponent = (): JSX.Element => {
  return (
    <S.UserProfileContainer>
      <S.ProfileImage>
        <img
          src={`${process.env.PUBLIC_URL}/images/myPage/profile/user-profile.jpg`}
          alt="프로필 사진"
        />
      </S.ProfileImage>

      <S.UserProfileInfo>
        <S.UserProfileId>화성갈끄니까</S.UserProfileId>
        <S.UserProfileEmail>doji@tesla.co.kr</S.UserProfileEmail>
      </S.UserProfileInfo>
    </S.UserProfileContainer>
  );
};

export default UserProfileComponent;

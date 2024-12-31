import React, { useState } from 'react';
import S from './style';
import ModalFunc from '../../utils/ModalFunc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons';

const ProfileSetting: React.FunctionComponent = (): JSX.Element => {
    const { closeModal } = ModalFunc();
    const [ selectedFile, setSelectedFile ] = useState<File|null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(e.target.files?.[0] || null);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(selectedFile);
    };

    return(
        <S.ProfileSetContainer>
            <S.ProfileHeader>
                <S.CloseBtn onClick={() => closeModal()}>
                    <FontAwesomeIcon icon={faXmark} />
                </S.CloseBtn>
            </S.ProfileHeader>
            <S.ProfileBody method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                <S.ProfileImageContainer>
                    <S.ProfileLabel htmlFor="profileImg">
                        <S.ProfileImage src={`${process.env.PUBLIC_URL}/images/myPage/profile/user-profile.jpg`} alt="사용자 프로필" />
                        <S.ImageUploadBtn>
                            <FontAwesomeIcon icon={faUpRightFromSquare} />
                        </S.ImageUploadBtn>
                    </S.ProfileLabel>
                </S.ProfileImageContainer>
                <S.ImageUpload type="file" id="profileImg" name="profileImg" onChange={handleFileChange}/>

                <S.UserName>화성갈끄니까</S.UserName>
                <S.UserEmail>doji@tesla.co.kr</S.UserEmail>
            </S.ProfileBody>
            <S.ProfileFooter>
                <button>완료</button>
                <button>취소</button>
            </S.ProfileFooter>
        </S.ProfileSetContainer>
    );
};

export default ProfileSetting;

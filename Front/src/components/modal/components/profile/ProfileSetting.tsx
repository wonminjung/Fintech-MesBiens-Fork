import React, { useState } from 'react';
import S from './style';
import ModalFunc from '../../utils/ModalFunc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalPropsType } from '../../../../modules/modal/types';
import { RootState } from '../../../../modules/store/store';
import { useSelector } from 'react-redux';

type Props = {
    modalProps: ModalPropsType;
}

const ProfileSetting: React.FunctionComponent<Props> = ({ modalProps }): JSX.Element => {
    const [ selectedFile, setSelectedFile ] = useState<File|null>(null);
    const { closeModal } = ModalFunc();
    const member = useSelector((state: RootState) => state.user);
    const [ currentProfile, setCurrentProfile ] = useState<string>(member.member.memberProfile);

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
                <S.Title>프로필 변경</S.Title>
                <S.CloseBtn onClick={() => closeModal()}>
                    <FontAwesomeIcon icon={faXmark} />
                </S.CloseBtn>
            </S.ProfileHeader>
            
            <S.ProfileForm method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                <S.ProfileBody>
                    <S.ProfileImageContainer>
                        <S.ProfileLabel htmlFor="profileImg">
                            <S.ProfileImage src={currentProfile} alt="사용자 프로필" />
                            <S.ImageUploadBtn>
                                <FontAwesomeIcon icon={faUpRightFromSquare} />
                            </S.ImageUploadBtn>
                        </S.ProfileLabel>
                    </S.ProfileImageContainer>
                    <S.ImageUpload type="file" id="profileImg" name="profileImg" onChange={handleFileChange}/>
                    <S.UserName>{member.member.memberId}</S.UserName>
                    <S.UserEmail>{member.member.memberEmail}</S.UserEmail>
                </S.ProfileBody>

                <S.ProfileFooter>
                    <S.ProfileSubmitBtn>완료</S.ProfileSubmitBtn>
                </S.ProfileFooter>
            </S.ProfileForm>
        </S.ProfileSetContainer>
    );
};

export default ProfileSetting;

import React from 'react';
import S from './style';
import ModalFunc from './utils/ModalFunc';

type Props = React.PropsWithChildren;

const CommonModal: React.FunctionComponent<Props> = ({ children }): JSX.Element => {
    const { closeModal } = ModalFunc();
    
    return (
        <S.ModalContainer>
            {/* 모달 백그라운드 */}
            <S.ModalBackround onClick={() => closeModal()}/>
            {/* 모달창 */}
            <S.ModalWindow>{children}</S.ModalWindow>
        </S.ModalContainer>
    );
};

export default CommonModal;

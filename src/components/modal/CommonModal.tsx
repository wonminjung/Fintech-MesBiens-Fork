import React, { useState } from 'react';
import S from './style';

type Props = React.PropsWithChildren<{
    [key: string]: any;
}>;

const CommonModal: React.FunctionComponent<Props> = ({ children, onClick, ...rest }): JSX.Element => {

    

    return (
        <S.ModalContainer>
            {/* 모달 백그라운드 */}
            <S.ModalBackround onClick={onClick}/>
            {/* 모달창 */}
            <S.ModalWindow {...rest}>{children}</S.ModalWindow>
        </S.ModalContainer>
    );
};

export default CommonModal;

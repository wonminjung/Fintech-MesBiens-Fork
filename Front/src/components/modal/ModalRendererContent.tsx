import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules/store/store';
import { componentMap } from './ModalContent';
import CommonModal from './CommonModal';

// 모달 컴포넌트에 props 전달하여 렌더링 하기 위한 컴포넌트
const ModalRendererContent: React.FunctionComponent = (): JSX.Element => {
    const { isOpen, component, modalProps } = useSelector((state: RootState) => state.modal);

    if(!isOpen || !component) return <></>;

    const Component = componentMap[component];

    return (
        <CommonModal>
            <Component modalProps={modalProps} />
        </CommonModal>
    );
};

export default ModalRendererContent;

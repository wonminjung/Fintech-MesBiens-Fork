import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules/store/store';
import { componentMap } from './ModalContent';
import CommonModal from './CommonModal';

// 모달 컴포넌트 렌더링 하기 위한 컴포넌트
const ModalRendererComponent: React.FunctionComponent = (): JSX.Element => {
    const { isOpen, component } = useSelector((state: RootState) => state.modal);

    if(!isOpen || !component) return <></>;

    const Component = componentMap[component];

    return (
        <CommonModal>
            <Component />
        </CommonModal>
    );
};

export default ModalRendererComponent;

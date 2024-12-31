import { useSelector } from "react-redux";
import { modalActions } from "../../../modules/modal/modalReducer";
import { RootState, useAppDispatch } from "../../../modules/store/store";
import { componentMap } from "../ModalContent";

const ModalFunc = () => {
    // const { changeComponent, openModal } = modalActions;
    const { isOpen } = useSelector((state: RootState) => state.modal);
    const dispatch = useAppDispatch();
    
    const openModal = (componentKey: keyof typeof componentMap) => {
        dispatch(modalActions.changeComponent({ component: componentKey }));
        dispatch(modalActions.openModal({ isOpen: true }));
    };

    const closeModal = () => {
        dispatch(modalActions.openModal({ isOpen: false }));
        dispatch(modalActions.changeComponent({ component: null }));
    };

    const handleModal = (componentKey: keyof typeof componentMap) => {
        if(!isOpen) {
            openModal(componentKey);
        }else {
            closeModal();
        }
    };

    return {
        openModal,
        closeModal,
        handleModal
    }
};

export default ModalFunc;
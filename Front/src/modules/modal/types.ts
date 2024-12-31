import { componentMap } from "../../components/modal/ModalContent";

// 리덕스에서 상태 관리할 모달창 관련 초기 상태값 타입
export type ModalInitState = {
    isOpen: boolean;
    component: keyof typeof componentMap | null;
}
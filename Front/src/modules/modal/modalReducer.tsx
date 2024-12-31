import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalInitState } from "./types";
import { componentMap } from "../../components/modal/ModalContent";

const initialState: ModalInitState = {
    isOpen: false,
    component: null
};

export const modalSlice = createSlice(
    {
        name: "modal",
        initialState: initialState,
        reducers: {
            changeComponent: (state, action: PayloadAction<{ component: keyof typeof componentMap | null }>) => {
                state.component = action.payload.component;
            },
            openModal: (state, action: PayloadAction<{ isOpen: boolean }>) => {
                state.isOpen = action.payload.isOpen;
            }
        }
    }
);

export const modalActions = modalSlice.actions;
// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer, // cartReducer가 cartSlice에서 가져온 리듀서입니다
  },
});

export type RootState = ReturnType<typeof store.getState>; // RootState 타입 정의

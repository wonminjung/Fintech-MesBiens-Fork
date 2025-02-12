import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ApiResponse {
  message: string;
}

const initialState: ApiResponse = {
  message: "",
};

export const apiResponse = createSlice({
  name: "apiResponse",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    resetMessage: (state) => {
      state.message = "";
    },
  },
});

export const { setMessage, resetMessage } = apiResponse.actions;

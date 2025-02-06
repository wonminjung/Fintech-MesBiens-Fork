import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  username: string;
  isAuthenticated: boolean;
}

const loadState = (): UserState => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) {
      return { name: "", email: "", username: "", isAuthenticated: false };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { name: "", email: "", username: "", isAuthenticated: false };
  }
};

const saveState = (state: UserState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch (err) {
    // 저장 실패 시 무시
  }
};

const initialState: UserState = loadState();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<Omit<UserState, "isAuthenticated">>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.isAuthenticated = false;
      saveState(state);
    },
    login: (state, action: PayloadAction<Omit<UserState, "isAuthenticated">>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.isAuthenticated = true; // 로그인 성공
      saveState(state);
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.username = "";
      state.isAuthenticated = false;
      localStorage.removeItem("userState");
    },
  },
});

export const { signup, login, logout } = userSlice.actions;
export default userSlice.reducer;
// export default userSlice.reducer;

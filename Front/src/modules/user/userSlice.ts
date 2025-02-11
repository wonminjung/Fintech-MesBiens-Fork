import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  member: {
    memberNo: number;
    memberId: string;
    memberName: string;
    memberEmail: string;
    memberPhone: string;
    memberAddress: string;
    memberBirth: string;
    memberProfile: string;
  }
  isAuthenticated: boolean;
}

const loadState = (): UserState => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) {
      return { 
        member: {
          memberNo: 0,
          memberId: "",
          memberName: "",
          memberEmail: "",
          memberPhone: "",
          memberAddress: "",
          memberBirth: "",
          memberProfile: ""
        },
        isAuthenticated: false 
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { 
      member: {
        memberNo: 0,
        memberId: "",
        memberName: "",
        memberEmail: "",
        memberPhone: "",
        memberAddress: "",
        memberBirth: "",
        memberProfile: ""
      },
      isAuthenticated: false 
    };
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
    signup: (state, action: PayloadAction<UserState>) => {
      state.member = action.payload.member;
      state.isAuthenticated = false; // 회원가입 시 isAuthenticated는 false로 설정
      saveState(state);
    },
    login: (state, action: PayloadAction<UserState>) => { // UserState로 타입 변경
      state.member = action.payload.member;
      state.isAuthenticated = true; //로그인 성공
      saveState(state);
    },
    logout: (state) => {
      state.member = {
        memberNo: 0,
        memberId: "",
        memberName: "",
        memberEmail: "",
        memberPhone: "",
        memberAddress: "",
        memberBirth: "",
        memberProfile: ""
      };
      state.isAuthenticated = false;
      localStorage.removeItem("userState");
    },
  },
});

export const { signup, login, logout } = userSlice.actions;
export default userSlice.reducer;
// export default userSlice.reducer;

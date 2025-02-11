import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Member = {
  memberNo: number;
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  memberAddress: string;
  memberBirth: string;
  memberProfile: string;
}

interface UserState {
  member: Member;
  isAuthenticated: boolean;
  token: string | null;
}

const loadState = (): UserState => {
  try {
    const serializedState: string | null = localStorage.getItem("userState"); //`string | null` 타입 지정
    if (!serializedState) {
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
        isAuthenticated: false, 
        token: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(" 상태 로드 오류:", err);
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
      isAuthenticated: false ,
      token: null,
    };
  }
};

const saveState = (state: UserState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch (err) {
    console.error(" 상태 저장 실패:", err);
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
      state.token = null; //  회원가입 시 토큰 없음
      saveState(state);
    },
    login: (state, action: PayloadAction<UserState>) => { // UserState로 타입 변경
      state.member = action.payload.member;
      state.isAuthenticated = true; //로그인 성공
      state.token = action.payload.token; //  로그인 시 토큰 저장
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
      state.token = null;//로그아웃 시 토큰 삭제
      localStorage.removeItem("userState");
    }
  },
});

export const { signup, login, logout } = userSlice.actions;
export default userSlice.reducer;
// export default userSlice.reducer;

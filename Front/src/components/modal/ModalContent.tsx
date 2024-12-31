// 공용 모달창에 들어갈 컴포넌트 리스트

import AddAccount from "./components/account/AddAccount";
import ProfileSetting from "./components/profile/ProfileSetting";
import { ComponentMap } from "./types";

export const componentMap: ComponentMap = {
    profileSetting: ProfileSetting,
    addAccount: AddAccount
};
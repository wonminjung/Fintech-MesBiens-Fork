// 공용 모달창에 들어갈 컴포넌트 리스트

import AddAccount from "./components/account/AddAccount";
import ModiAccount from "./components/account/ModiAccount";
import ProfileSetting from "./components/profile/ProfileSetting";
import StockTestResult from "./components/stocktest/StockTestResult";
import { ComponentMap } from "./types";

export const componentMap: ComponentMap = {
  profileSetting: ProfileSetting,
  addAccount: AddAccount,
  modiAccount: ModiAccount,
  stockTestResult: StockTestResult,
};

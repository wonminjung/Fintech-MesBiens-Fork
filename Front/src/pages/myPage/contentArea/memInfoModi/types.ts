import { Member } from "../../../../modules/user/userSlice";

export type MemInfo = {
    fieldName: string;
    value: keyof Member;
}
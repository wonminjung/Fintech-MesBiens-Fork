
export type TempFormData = {
    memberName: string;
    memberEmail: string;
    memberPhone: string;
    memberAddress: string;
    memberBirth: string;
}

export type MemInfo = {
    fieldName: string;
    value: keyof TempFormData;
}
export type Account = {
    accountNo: number;
    accountBalance: number;
    accountNumber: string;
    accountPassword: string;
    bankCode: BankInfo;
    accountOpeningDate: Date;
}

export type BankInfo = {
    bankCode: string;
    bankLogo: string;
    bankName: string;
}
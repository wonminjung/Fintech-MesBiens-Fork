type Account = {
    accountNo: number;
    accountBalance: number;
    accountNumber: string;
    accountPassword: string;
    bankCode: BankInfo;
    accountOpeningDate: Date;
}

type BankInfo = {
    bankCode: string;
    bankLogo: string;
    bankName: string;
}

export default Account;
export interface IPersonInfo {
  name: string;
  phoneNumber: string;
}

export interface INote {
  noteMessage: string;
  amount: number;
  time: Date;
}

export interface IPayable {
  amount: number;
  loanTaker_Info: IPersonInfo;
  loanGiver_Info: IPersonInfo;
  transactionId: string;
  notes: INote[];
  reason: string;
  // status?: string;
}

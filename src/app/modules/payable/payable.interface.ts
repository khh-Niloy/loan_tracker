export interface INote{
    noteMessage: string,
    amount: number,
    time: Date
}

export interface IPayable{
    amount: number,
    loanTaker_Info: String,
    loanGiver_Info: String,
    transactionId: string,
    notes: INote[],
    reason: string
    // status?: string
}
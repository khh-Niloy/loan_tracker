export interface INote{
    noteMessage: string,
    amount: number,
    time: Date
}

export interface IPayable{
    amount: number,
    loanTaker_Info: string,
    loanGiver_Info: string,
    transactionId: string,
    notes: INote[],
    reason: string
    // status?: string
}
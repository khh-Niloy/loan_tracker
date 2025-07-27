export interface IPayable{
    amount: number,
    loanTaker_Info: String,
    loanGiver_Info: String,
    transactionId: string,
    notes: string[],
    reason: string
    // status?: string
}
import { model, Schema } from "mongoose";
import { IPayable } from "./payable.interface";

const loanTakerAndGiver = new Schema({
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true}
})

export const loanTakerAndGiverModel = model("loanTakerAndGiverModel", loanTakerAndGiver)

const payableSchema = new Schema<IPayable>({
    loanTaker_Info: {type: loanTakerAndGiver, required: true},
    loanGiver_Info: {type: loanTakerAndGiver, required: true},
    amount: {type: Number, required: true},
    transactionId: {type: String, required: true},
    // status: {type: String},
    notes: {type: [String], default: []},
    reason: {type: String, required: true},
}, {timestamps: true, versionKey: false}) 

export const Payable = model("Payable", payableSchema)
import { model, Schema } from "mongoose";
import { INote, IPayable } from "./payable.interface";

const loanTaker_Info = new Schema({
    phoneNumber: {type: String}
})

const loanGiver_Info = new Schema({
    name: {type: String},
    phoneNumber: {type: String}
})

const noteSchema = new Schema<INote>({
    noteMessage: {type: String},
    amount: {type: Number},
    time: {type: Date}
})

const payableSchema = new Schema<IPayable>({
    loanTaker_Info: { type: loanTaker_Info, _id: false },
    loanGiver_Info: { type: loanGiver_Info, required: true, _id: false },
    amount: {type: Number, required: true},
    transactionId: {type: String, required: true},
    // status: {type: String},
    notes: {type: [noteSchema], default: []},
    reason: {type: String, required: true},
}, {timestamps: true, versionKey: false}) 

export const Payable = model("Payable", payableSchema)
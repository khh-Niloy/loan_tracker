import { model, Schema } from "mongoose";
import { INote, IPayable } from "./payable.interface";

const loanTakerAndGiver = new Schema({
    name: {type: String},
    phoneNumber: {type: String}
})

export const loanTakerAndGiverModel = model("loanTakerAndGiverModel", loanTakerAndGiver)

const noteSchema = new Schema<INote>({
    noteMessage: {type: String},
    amount: {type: Number},
    time: {type: Date}
})

const payableSchema = new Schema<IPayable>({
    loanTaker_Info: { ...loanTakerAndGiver.obj, required: true, _id: false },
    loanGiver_Info: { ...loanTakerAndGiver.obj, required: true, _id: false },
    amount: {type: Number, required: true},
    transactionId: {type: String, required: true},
    // status: {type: String},
    notes: {type: [noteSchema], default: []},
    reason: {type: String, required: true},
}, {timestamps: true, versionKey: false}) 

export const Payable = model("Payable", payableSchema)
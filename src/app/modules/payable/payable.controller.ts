import { Request, Response } from "express"
import { payableServices } from "./payable.service"

const loan = async(req: Request, res: Response)=>{
    try {
        const newLenden = await payableServices.loanPayableServices(req.body)
        res.status(201).json({
            message: "loan request completed",
            data: newLenden
        })   
    } catch (error) {
        res.status(400).json({
            message: (error as Error).message,
        })
    }
}

const loanList = async(req: Request, res: Response)=>{
    try {
        const phoneNumber = req.params.phoneNumber
        const loanList = await payableServices.loanListServices(phoneNumber)
        res.status(201).json({
            message: "all loan list completed",
            data: loanList
        })
    } catch (error) {
        res.status(400).json({
            message: (error as Error).message,
        })
    }
}

const receivableList = async(req: Request, res: Response)=>{
    try {
        const phoneNumber = req.params.phoneNumber
        const receivableList = await payableServices.receivableListServices(phoneNumber)
        res.status(201).json({
            message: "all receivable list",
            data: receivableList
        })
    } catch (error) {
        res.status(400).json({
            message: (error as Error).message,
        })
    }
}

const updateLoan = async(req: Request, res: Response)=>{
    try {
        const transactionId = req.params.transactionId
        const isFullPay = Boolean(req.query.fullPay)
        const updateLenden = await payableServices.updateLoanServices(req.body, transactionId, isFullPay)
        res.status(201).json({
            message: "loan updated",
            data: updateLenden
        })   
    } catch (error) {
        res.status(400).json({
            message: (error as Error).message,
        })
    }
}

export const payableController = {
    loan,
    loanList,
    receivableList,
    updateLoan
}
import { Router } from "express";
import { payableController } from "./payable.controller";

export const payableRoutes = Router()

payableRoutes.post("/loan", payableController.loan)
payableRoutes.get("/loan-list/:phoneNumber", payableController.loanList)
payableRoutes.get("/receivable-list/:phoneNumber", payableController.receivableList)
payableRoutes.patch("/update-loan/:transactionId", payableController.updateLoan)
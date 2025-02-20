import { ModelWithTenant } from "../../../types/Model";
import { Job } from "../../jobs/types/Job";
import { Passenger } from "../../passengers/types/Passenger";

export enum ExpenseApprovalStatus {
    Approved = "approved",
    Pending = "pending",
    Rejected = "rejected"
}

export interface ExpenseModel {
    name: string
    description: string | null
    amount: number
    jobId: number | null
    job: Job | null
    passengerId: number | null
    passenger: Passenger | null
    tenantApprovalStatus: ExpenseApprovalStatus
    adminApprovalStatus: ExpenseApprovalStatus
    managerApprovalStatus: ExpenseApprovalStatus
    directorApprovalStatus: ExpenseApprovalStatus
}

export type Expense = ModelWithTenant<ExpenseModel>
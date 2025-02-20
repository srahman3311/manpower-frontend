import { Job } from "../../jobs/types/Job";
import { Passenger } from "../../passengers/types/Passenger";
import { Expense } from "./Expense";

export type NewExpenseInfo = {
    name: string
    description: string
    amount: string
}

export type ExpenseRequestBody = Pick<Expense, "name" | "amount"> & {
    description?: string
    jobId?: number
    passengerId?: number
}

export interface ExpenseState {
    searchText: string
    skip: number
    limit: number
    totalExpenseCount: number
    expenseList: Expense[]
    newExpenseInfo: NewExpenseInfo
    selectedJob: Job | null
    selectedPassenger: Passenger | null
    expenseInAction: Expense | null
    isDeleting: boolean
}
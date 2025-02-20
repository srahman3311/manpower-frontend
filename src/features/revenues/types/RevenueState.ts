import { Job } from "../../jobs/types/Job";
import { Passenger } from "../../passengers/types/Passenger";
import { Revenue } from "./Revenue";

export type NewRevenueInfo = {
    name: string
    description: string
    amount: string
}

export type RevenueRequestBody = Pick<Revenue, "name" | "amount"> & {
    description?: string
    jobId?: number
    passengerId?: number
}

export interface RevenueState {
    searchText: string
    skip: number
    limit: number
    totalRevenueCount: number
    revenueList: Revenue[]
    newRevenueInfo: NewRevenueInfo
    selectedJob: Job | null
    selectedPassenger: Passenger | null
    revenueInAction: Revenue | null
    isDeleting: boolean
}
import { ModelWithTenant } from "../../../types/Model";
import { Job } from "../../jobs/types/Job";
import { Passenger } from "../../passengers/types/Passenger";

export enum RevenueApprovalStatus {
    Approved = "approved",
    Pending = "pending",
    Rejected = "rejected"
}

export interface RevenueModel {
    name: string
    description: string | null
    amount: number
    jobId: number | null
    job: Job | null
    passengerId: number | null
    passenger: Passenger | null
    tenantApprovalStatus: RevenueApprovalStatus
    adminApprovalStatus: RevenueApprovalStatus
    managerApprovalStatus: RevenueApprovalStatus
    directorApprovalStatus: RevenueApprovalStatus
}

export type Revenue = ModelWithTenant<RevenueModel>
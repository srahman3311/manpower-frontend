import { ModelWithTenant } from "../../../types/Model";
import { Job } from "../../jobs/types/Job";
import { Passenger } from "../../passengers/types/Passenger";
import { Account } from "../../accounts/types/Account";
import { User } from "../../users/types/User";

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
    creditedToAccountId: number | null
    creditedToAccount: Account | null
    userId: number | null
    user: User | null
    tenantApprovalStatus: RevenueApprovalStatus
    adminApprovalStatus: RevenueApprovalStatus
    managerApprovalStatus: RevenueApprovalStatus
    directorApprovalStatus: RevenueApprovalStatus
}

export type Revenue = ModelWithTenant<RevenueModel>
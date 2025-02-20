import { Job } from "./Job";
import { Company as ICompany } from "../../companies/types/Company";

export type NewJobInfo = Pick<Job, "name" | "visaName"> & {
    visaType: string
    visaQuantity: string
    visaUnitPrice: string
}

export interface JobState {
    searchText: string
    skip: number
    limit: number
    totalJobCount: number
    jobList: Job[]
    visaCompanyList: ICompany[]
    selectedVisaCompany: ICompany | null
    newJobInfo: NewJobInfo
    jobInAction: Job | null
    isDeleting: boolean
}

export type JobRequestBody = Partial<Pick<Job, "name" | "visaName" | "visaQuantity" | "visaUnitPrice">> & {
    visaType: string
    visaCompanyId?: number
}
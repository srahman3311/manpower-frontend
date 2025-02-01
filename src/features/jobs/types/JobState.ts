import { Job as IJob } from "./Job";
import { Company as ICompany } from "../../companies/types/Company";

export type NewJobInfo = Pick<IJob, "name" | "visaName"> & {
    visaQuantity: string
    visaUnitPrice: string
}

export interface JobState {
    searchText: string
    skip: number
    limit: number
    totalJobCount: number
    jobList: IJob[]
    visaCompanyList: ICompany[]
    selectedVisaCompany: ICompany | null
    newJobInfo: NewJobInfo
    jobInAction: IJob | null
    isDeleting: boolean
}

export type JobRequestBody = Partial<Pick<IJob, "name" | "visaName" | "visaQuantity" | "visaUnitPrice">> & {
    visaCompanyId?: number
}
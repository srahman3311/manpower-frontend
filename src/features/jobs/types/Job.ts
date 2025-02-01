import { Model } from "../../../types/Model";
import { Company as ICompany } from "../../companies/types/Company";

export interface JobModel {
    name: string
    visaName: string
    visaCompany: ICompany
    visaQuantity: number
    visaUnitPrice: number
    totalPrice: number
}

export type Job = Model<JobModel>
import { ModelWithTenant } from "../../../types/Model";
import { Company } from "../../companies/types/Company";

export enum VisaType {
    Sale = "sale",
    Processing = "processing"
}

export interface JobModel {
    name: string
    visaName: string
    visaType: VisaType
    visaCompanyId: number
    visaCompany: Company
    visaQuantity: number
    visaUnitPrice: number
    totalPrice: number
    expiryDate: string | null
}

export type Job = ModelWithTenant<JobModel>
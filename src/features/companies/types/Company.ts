import { Model } from "../../../types/Model"

export interface CompanyModel {
    name: string
    email: string
    phone: string | null
    address: string
}

export type Company = Model<CompanyModel>
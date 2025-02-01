import { Model } from "../../../types/Model";

export interface PassportModel {
    number: string | null
    date: string | null
    expiryDate: string | null
    issuingInstitute: string | null
}

export type Passport = Model<PassportModel>
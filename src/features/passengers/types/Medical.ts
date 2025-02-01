import { Model } from "../../../types/Model";

export interface MedicalModel {
    date: string | null
    expiryDate: string | null
    status: string | null
}

export type Medical = Model<MedicalModel>
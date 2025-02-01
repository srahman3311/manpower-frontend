import { Model } from "../../../types/Model";
import { Address as IAddress } from "../../../types/Address";

export enum AgentCategory {
    A = "A",
    B = "B",
    C = "C",
    D = "D"
}

export interface AgentModel {
    category: AgentCategory
    firstName: string
    lastName: string
    email: string | null
    phone: string
    address: IAddress
    imageUrl: string | null
}

export type Agent = Model<AgentModel>
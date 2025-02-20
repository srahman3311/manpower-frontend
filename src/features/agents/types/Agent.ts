import { ModelWithTenant } from "../../../types/Model";
import { Address } from "../../../types/Address";

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
    address: Address
    imageUrl: string | null
}

export type Agent = ModelWithTenant<AgentModel>
import { ModelWithTenant } from "../../../types/Model";
import { Address } from "../../../types/Address";

export interface CompanyModel {
    name: string
    email: string
    phone: string | null
    category: string | null
    address: Address
}

export type Company = ModelWithTenant<CompanyModel>
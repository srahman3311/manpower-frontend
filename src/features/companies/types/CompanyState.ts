import { Company } from "./Company";

export interface NewCompanyInfo {
    name: string
    email: string 
    phone: string
    address: string
}

export interface CompanyState {
    searchText: string
    skip: number
    limit: number
    companyList: Company[]
    newCompanyInfo: NewCompanyInfo
}

import { Company as ICompany } from "./Company";

export interface NewCompanyInfo {
    name: string
    email: string 
    phone: string
    address: string
}

export type CompanyRequestBody = Omit<NewCompanyInfo, "address"> & {
    address: {
        line1: string | null
    }
}

export interface CompanyState {
    searchText: string
    skip: number
    limit: number
    companyList: ICompany[]
    totalCompanyCount: number
    newCompanyInfo: NewCompanyInfo
    companyInAction: ICompany | null
    isDeleting: boolean
}

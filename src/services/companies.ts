import httpClient from "./httpClient";
import { Company as ICompany } from "../features/companies/types/Company";
import { CompanyState, CompanyRequestBody } from "../features/companies/types/CompanyState";

type Params = Pick<CompanyState, "searchText" | "skip" | "limit">

export const fetchCompanies = async(params: Params): Promise<{ companies: ICompany[], total: number }> => {
    const paramString = `searchText=${params.searchText}&skip=${params.skip}&limit=${params.limit}`;
    return httpClient.get(`/companies?${paramString}`);
}

export const createCompany = async(requestBody: CompanyRequestBody): Promise<ICompany> => {
    return httpClient.post("/companies/create", requestBody);
}

export const editCompany = async(companyId: string, requestBody: CompanyRequestBody): Promise<ICompany> => {
    return httpClient.patch(`/companies/${companyId}/edit`, requestBody);
}

export const deleteCompany = async(companyId?: number): Promise<void> => {
    return httpClient.delete(`/companies/${companyId}/delete`);
}

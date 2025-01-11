import httpClient from "./httpClient";
import { Company } from "../features/companies/types/Company";
import { CompanyState } from "../features/companies/types/CompanyState";

type Params = Pick<CompanyState, "searchText" | "skip" | "limit">

export const fetchCompanies = async(params: Params): Promise<Company[]> => {
    const paramString = `searchText=${params.searchText}&skip=${params.skip}&limit=${params.limit}`;
    return httpClient.get(`/companies?${paramString}`);
}
import httpClient from "./httpClient";
import { Revenue } from "../features/revenues/types/Revenue";
import { RevenueRequestBody, RevenueState } from "../features/revenues/types/RevenueState";

type Params = Pick<RevenueState, "searchText" | "skip" | "limit">

export const fetchRevenues = async(params: Params): Promise<{ revenues: Revenue[], total: number }> => {
    const paramString = `searchText=${params.searchText}&skip=${params.skip}&limit=${params.limit}`;
    return httpClient.get(`/revenues?${paramString}`);
}

export const fetchRevenuesByJobId = async(jobId: number): Promise<Revenue[]> => {
    return httpClient.get(`/revenues/job/${jobId}`);
}

export const fetchRevenuesByPassengerId = async(passengerId: number): Promise<Revenue[]> => {
    return httpClient.get(`/revenues/passenger/${passengerId}`);
}

export const createRevenue = async(requestBody: RevenueRequestBody): Promise<Revenue> => {
    return httpClient.post("/revenues/create", requestBody);
}

export const editRevenue = async(revenueId: string, requestBody: RevenueRequestBody): Promise<Revenue> => {
    return httpClient.patch(`/revenues/${revenueId}/edit`, requestBody);
}

export const toggleRevenueApprovalStatus = async(revenueId: number): Promise<Revenue> => {
    return httpClient.patch(`/revenues/${revenueId}/toggle`, {});
}

export const deleteRevenue = async(revenueId?: number): Promise<void> => {
    return httpClient.delete(`/revenues/${revenueId}/delete`);
}


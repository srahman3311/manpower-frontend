import httpClient from "./httpClient";
import { Job as IJob } from "../features/jobs/types/Job";
import { JobState, JobRequestBody } from "../features/jobs/types/JobState";

type Params = Pick<JobState, "searchText" | "skip" | "limit">;

export const fetchJobs = async(params: Params): Promise<{ jobs: IJob[], total: number }> => {
    const paramString = `searchText=${params.searchText}&skip=${params.skip}&limit=${params.limit}`;
    return httpClient.get(`/jobs?${paramString}`);
}

export const createJob = async(requestBody: JobRequestBody): Promise<IJob> => {
    return httpClient.post("/jobs/create", requestBody);
}

export const editJob = async(jobId: string, requestBody: JobRequestBody): Promise<IJob> => {
    return httpClient.patch(`/jobs/${jobId}/edit`, requestBody);
}

export const deleteJob = async(jobId?: number): Promise<void> => {
    return httpClient.delete(`/jobs/${jobId}/delete`);
}


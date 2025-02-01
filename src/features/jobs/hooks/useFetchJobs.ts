import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { JobState } from "../types/JobState";
import { fetchJobs } from "../../../services/jobs";
import { fetchJobData } from "../slices/jobReducer";

type Params = Pick<JobState, "searchText" | "skip" | "limit">

type Return = {
    loading: boolean
    errorMsg: string
    fetchJobList: (params: Params) => Promise<void>
}

export const useFetchJobs = (): Return => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const fetchJobList = useCallback(async(params: Params) => {

        setLoading(true);

        try {

            const { jobs, total } = await fetchJobs(params);

            dispatch(fetchJobData({
                jobs,
                totalJobCount: total
            }));

        } catch(error: any) {
            
            setErrorMsg(error.response?.data || error.message)

        } finally {
            setLoading(false);
        }
        
    }, [])

    return {
        loading,
        errorMsg,
        fetchJobList
    }

}
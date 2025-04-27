import { useState, useEffect } from "react";
import { Job } from "../types/Job";
import { fetchJobs } from "../../../services/jobs";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";

type Return = {
    loading: boolean
    errorMsg: string
    jobList: Job[]
    totalJobCount: number
}

export const useFetchJobsForReports = (): Return => {

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [jobList, setJobList] = useState<Job[]>([]);
    const [totalJobCount, setTotalJobCount] = useState<number>(0)
    
    useEffect(() => {

        const fetchJobList = async () => {

            setLoading(true);

            try {

                const { jobs, total } = await fetchJobs({
                    searchText: "",
                    skip: 0,
                    limit: 10000
                });
                setJobList(jobs);
                setTotalJobCount(total)
            
            } catch(error: any) {
                const { message } = handleApiError(error)
                setErrorMsg(message)
            } finally {
                setLoading(false);
            }
            
        }

        fetchJobList();
        
    }, [])

    return {
        loading,
        errorMsg,
        jobList,
        totalJobCount
    }

}
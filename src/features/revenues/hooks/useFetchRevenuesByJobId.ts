import { useState, useEffect, useCallback } from "react";
import { fetchRevenuesByJobId } from "../../../services/revenues";
import { Revenue } from "../types/Revenue";

type Return = {
    loading: boolean
    errorMsg: string
    revenueList: Revenue[]
}

export const useFetchRevenuesByJobId = (jobId: number): Return => {

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [revenueList, setRevenueList] = useState<Revenue[]>([]);

    const fetchRevenueListByJobId = useCallback(async() => {

        setLoading(true);

        try {
            const revenues = await fetchRevenuesByJobId(jobId);
            setRevenueList(revenues);
        } catch(error: any) {
            setErrorMsg(error.response?.data || error.message)
        } finally {
            setLoading(false);
        }
        
    }, [])

    useEffect(() => {
        if(!jobId) return;
        fetchRevenueListByJobId()
    }, [jobId])

    return {
        loading,
        errorMsg,
        revenueList
    }

}
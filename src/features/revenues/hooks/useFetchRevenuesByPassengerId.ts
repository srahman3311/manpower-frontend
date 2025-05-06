import { useState, useEffect, useCallback } from "react";
import { fetchRevenuesByPassengerId } from "../../../services/revenues";
import { Revenue } from "../types/Revenue";

type Return = {
    loading: boolean
    errorMsg: string
    revenueList: Revenue[]
}

export const useFetchRevenuesByPassengerId = (passengerId: number): Return => {

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [revenueList, setRevenueList] = useState<Revenue[]>([]);

    const fetchRevenueListByPassengerId = useCallback(async() => {

        setLoading(true);

        try {
            const revenues = await fetchRevenuesByPassengerId(passengerId);
            setRevenueList(revenues);
        } catch(error: any) {
            setErrorMsg(error.response?.data || error.message)
        } finally {
            setLoading(false);
        }
        
    }, [])

    useEffect(() => {
        if(!passengerId) return;
        fetchRevenueListByPassengerId()
    }, [passengerId])

    return {
        loading,
        errorMsg,
        revenueList
    }

}
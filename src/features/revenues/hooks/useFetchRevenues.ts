import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { RevenueState } from "../types/RevenueState";
import { fetchRevenues } from "../../../services/revenues";
import { fetchRevenueData } from "../slices/revenueReducer";

type Params = Pick<RevenueState, "searchText" | "skip" | "limit">

type Return = {
    loading: boolean
    errorMsg: string
    fetchRevenueList: (params: Params) => Promise<void>
}

export const useFetchRevenues = (): Return => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const fetchRevenueList = useCallback(async(params: Params) => {

        setLoading(true);

        try {

            const { revenues, total } = await fetchRevenues(params);

            dispatch(fetchRevenueData({
                revenues,
                totalRevenueCount: total
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
        fetchRevenueList
    }

}
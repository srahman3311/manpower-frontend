import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { PassengerState } from "../types/PassengerState";
import { fetchPassengers } from "../../../services/passengers";
import { fetchPassengerData } from "../slices/passengerReducer";

type Params = Pick<PassengerState, "searchText" | "skip" | "limit">

type Return = {
    loading: boolean
    errorMsg: string
    fetchPassengerList: (params: Params) => Promise<void>
}

export const useFetchPassengers = (): Return => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const fetchPassengerList = useCallback(async(params: Params) => {

        setLoading(true);

        try {

            const { passengers, total } = await fetchPassengers(params);

            dispatch(fetchPassengerData({
                passengers,
                totalPassengerCount: total
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
        fetchPassengerList
    }

}
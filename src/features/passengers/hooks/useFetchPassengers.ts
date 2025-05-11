import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Passenger } from "../types/Passenger";
import { PassengerState } from "../types/PassengerState";
import { fetchPassengers } from "../../../services/passengers";
import { fetchPassengerData } from "../slices/passengerReducer";

type Params = Pick<PassengerState, "searchText" | "skip" | "limit">

type Return = {
    loading: boolean
    errorMsg: string
    passengerList: Passenger[]
    fetchPassengerList: (params: Params) => Promise<void>
}

export const useFetchPassengers = (forPassengerPage: boolean = true): Return => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [passengerList, setPassengerList] = useState<Passenger[]>([]);

    const fetchPassengerList = useCallback(async(params: Params) => {

        setLoading(true);

        try {

            const { passengers, total } = await fetchPassengers(params);

            if(forPassengerPage) {
                dispatch(fetchPassengerData({
                    passengers,
                    totalPassengerCount: total
                }));
                return;
            }

            setPassengerList(passengers);

        } catch(error: any) {
            
            setErrorMsg(error.response?.data || error.message)

        } finally {
            setLoading(false);
        }
        
    }, [])

    return {
        loading,
        errorMsg,
        passengerList,
        fetchPassengerList
    }

}
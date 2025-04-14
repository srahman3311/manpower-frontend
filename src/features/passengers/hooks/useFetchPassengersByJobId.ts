import { useState, useEffect, useCallback } from "react";
import { fetchPassengersByJobId } from "../../../services/passengers";
import { Passenger } from "../types/Passenger";

type Return = {
    loading: boolean
    errorMsg: string
    passengerList: Passenger[]
}

export const useFetchPassengersByJobId = (jobId: number): Return => {

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [passengerList, setPassengerList] = useState<Passenger[]>([]);

    const fetchPassengerListByJobId = useCallback(async() => {

        setLoading(true);

        try {
            const passengers = await fetchPassengersByJobId(jobId);
            setPassengerList(passengers);
        } catch(error: any) {
            setErrorMsg(error.response?.data || error.message)
        } finally {
            setLoading(false);
        }
        
    }, [])

    useEffect(() => {
        if(!jobId) return;
        fetchPassengerListByJobId()
    }, [jobId])

    return {
        loading,
        errorMsg,
        passengerList
    }

}
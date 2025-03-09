import { useState, useEffect } from "react";
import { Passenger } from "../types/Passenger";
import { fetchUrgentPassengers } from "../../../services/passengers";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";

type Return = {
    loading: boolean
    errorMsg: string
    passengerList: Passenger[],
    totalPassengerCount: number
}

export const useFetchUrgentPassengers = (limit: number): Return => {

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [passengerList, setPassengerList] = useState<Passenger[]>([]);
    const [totalPassengerCount, setTotalPassengerCount] = useState<number>(0)
    
    useEffect(() => {

        const fetchUrgentPassengerList = async () => {

            setLoading(true);

            try {

                const { passengers, total } = await fetchUrgentPassengers(limit);
                setPassengerList(passengers);
                setTotalPassengerCount(total)
            
            } catch(error: any) {
                const { message } = handleApiError(error)
                setErrorMsg(message)
            } finally {
                setLoading(false);
            }
            
        }

        fetchUrgentPassengerList();
        
    }, [limit])

    return {
        loading,
        errorMsg,
        passengerList,
        totalPassengerCount
    }

}
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TransactionState } from "../types/TransactionState";
import { fetchTransactions } from "../../../services/transactions";
import { fetchTransactionData } from "../slices/transactionReducer";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";

type Params = Pick<TransactionState, "searchText" | "skip" | "limit">

type Return = {
    loading: boolean
    errorMsg: string
    fetchTransactionList: (params: Params) => Promise<void>
}

export const useFetchTransactions = (): Return => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const fetchTransactionList = useCallback(async(params: Params) => {

        setLoading(true);

        try {

            const { transactions, total } = await fetchTransactions(params);

            dispatch(fetchTransactionData({
                transactions,
                totalTransactionCount: total
            }));

        } catch(error: any) {

            const { message } = handleApiError(error);
            setErrorMsg(message)

        } finally {
            setLoading(false);
        }
        
    }, [])

    return {
        loading,
        errorMsg,
        fetchTransactionList
    }

}
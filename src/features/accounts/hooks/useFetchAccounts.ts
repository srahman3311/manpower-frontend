import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AccountState } from "../types/AccountState";
import { fetchAccounts } from "../../../services/accounts";
import { fetchAccountData } from "../slices/accountReducer";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";

type Params = Pick<AccountState, "searchText" | "skip" | "limit">

type Return = {
    loading: boolean
    errorMsg: string
    fetchAccountList: (params: Params) => Promise<void>
}

export const useFetchAccounts = (): Return => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const fetchAccountList = useCallback(async(params: Params) => {

        setLoading(true);

        try {
        
            const { accounts, total } = await fetchAccounts(params);
    
            dispatch(fetchAccountData({
                accounts,
                totalAccountCount: total
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
        fetchAccountList
    }

}
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ExpenseState } from "../types/ExpenseState";
import { fetchExpenses } from "../../../services/expenses";
import { fetchExpenseData } from "../slices/expenseReducer";

type Params = Pick<ExpenseState, "searchText" | "skip" | "limit">

type Return = {
    loading: boolean
    errorMsg: string
    fetchExpenseList: (params: Params) => Promise<void>
}

export const useFetchExpenses = (): Return => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const fetchExpenseList = useCallback(async(params: Params) => {

        setLoading(true);

        try {

            const { expenses, total } = await fetchExpenses(params);

            dispatch(fetchExpenseData({
                expenses,
                totalExpenseCount: total
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
        fetchExpenseList
    }

}
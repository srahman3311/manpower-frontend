import { useState, useEffect, useCallback } from "react";
import { fetchExpensesByJobId } from "../../../services/expenses";
import { Expense } from "../types/Expense";

type Return = {
    loading: boolean
    errorMsg: string
    expenseList: Expense[]
}

export const useFetchExpensesByJobId = (jobId: number): Return => {

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [expenseList, setExpenseList] = useState<Expense[]>([]);

    const fetchExpenseListByJobId = useCallback(async() => {

        setLoading(true);

        try {
            const expenses = await fetchExpensesByJobId(jobId);
            setExpenseList(expenses);
        } catch(error: any) {
            setErrorMsg(error.response?.data || error.message)
        } finally {
            setLoading(false);
        }
        
    }, [])

    useEffect(() => {
        if(!jobId) return;
        fetchExpenseListByJobId()
    }, [jobId])

    return {
        loading,
        errorMsg,
        expenseList
    }

}
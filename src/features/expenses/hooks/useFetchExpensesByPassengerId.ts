import { useState, useEffect, useCallback } from "react";
import { fetchExpensesByPassengerId } from "../../../services/expenses";
import { Expense } from "../types/Expense";

type Return = {
    loading: boolean
    errorMsg: string
    expenseList: Expense[]
}

export const useFetchExpensesByPassengerId = (passengerId: number): Return => {

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [expenseList, setExpenseList] = useState<Expense[]>([]);

    const fetchExpenseListByPassengerId = useCallback(async() => {

        setLoading(true);

        try {
            const expenses = await fetchExpensesByPassengerId(passengerId);
            setExpenseList(expenses);
        } catch(error: any) {
            setErrorMsg(error.response?.data || error.message)
        } finally {
            setLoading(false);
        }
        
    }, [])

    useEffect(() => {
        if(!passengerId) return;
        fetchExpenseListByPassengerId()
    }, [passengerId])

    return {
        loading,
        errorMsg,
        expenseList
    }

}
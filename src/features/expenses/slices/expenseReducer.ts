import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../types/Expense";
import { ExpenseState } from "../types/ExpenseState";

const initialState: ExpenseState = {
    searchText: "",
    skip: 0,
    limit: 10,
    totalExpenseCount: 0,
    expenseList: [],
    newExpenseInfo: {
        name: "",
        description: "",
        amount: ""
    },
    selectedJob: null,
    selectedPassenger: null,
    selectedAccount: null,
    expenseInAction: null,
    isDeleting: false 
}

const expensesSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        },
        fetchExpenseData: (state, action: PayloadAction<{ expenses: Expense[], totalExpenseCount: number }>) => {
            const { expenses, totalExpenseCount } = action.payload;
            return {
                ...state,
                expenseList: expenses,
                totalExpenseCount
            }
        },
        addNewExpenseInfo: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                newExpenseInfo: {
                    ...state.newExpenseInfo,
                    [name]: value
                }
            }
        },
        clearExpenseInfo: (state) => {
            return {
                ...state,
                newRevenueInfo: {
                    name: "",
                    description: "",
                    amount: ""
                },
                selectedJob: null,
                selectedPassenger: null,
                selectedAccount: null,
                expenseInAction: null
            }
        },
        toggleDeleteModal: (state, action: PayloadAction<Expense | null>) => {
            return {
                ...state,
                isDeleting: !state.isDeleting,
                expenseInAction: action.payload
            }
        },
        filterExpenseList: (state, action: PayloadAction<Expense[]>) => {
            return {
                ...state,
                totalExpenseCount: state.totalExpenseCount - 1,
                expenseList: action.payload
            }
        },
    }
})

export const {
    updateState,
    fetchExpenseData,
    addNewExpenseInfo,
    clearExpenseInfo,
    toggleDeleteModal,
    filterExpenseList
} = expensesSlice.actions;

export default expensesSlice.reducer;
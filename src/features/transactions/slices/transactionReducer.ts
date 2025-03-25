import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../types/Transaction";
import { TransactionState } from "../types/TransactionState";

const initialState: TransactionState = {
    searchText: "",
    skip: 0,
    limit: 10,
    totalTransactionCount: 0,
    transactionList: [],
    newTransactionInfo: {
        name: "",
        description: "",
        amount: ""
    },
    selectedDebitedFromItem: null,
    selectedCreditedToItem: null,
    transactionInAction: null,
    isDeleting: false 
}

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        },
        fetchTransactionData: (state, action: PayloadAction<{ transactions: Transaction[], totalTransactionCount: number }>) => {
            const { transactions, totalTransactionCount } = action.payload;
            return {
                ...state,
                transactionList: transactions,
                totalTransactionCount
            }
        },
        addNewTransactionInfo: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                newTransactionInfo: {
                    ...state.newTransactionInfo,
                    [name]: value
                }
            }
        },
        clearTransactionInfo: (state) => {
            return {
                ...state,
                newTransactionInfo: {
                    name: "",
                    description: "",
                    amount: ""
                },
                selectedDebitedFromItem: null,
                selectedCreditedToItem: null,
                transactionInAction: null
            }
        },
        toggleDeleteModal: (state, action: PayloadAction<Transaction | null>) => {
            return {
                ...state,
                isDeleting: !state.isDeleting,
                transactionInAction: action.payload
            }
        },
        filterTransactionList: (state, action: PayloadAction<Transaction[]>) => {
            return {
                ...state,
                totalTransactionCount: state.totalTransactionCount - 1,
                transactionList: action.payload
            }
        },
    }
})

export const {
    updateState,
    fetchTransactionData,
    addNewTransactionInfo,
    clearTransactionInfo,
    toggleDeleteModal,
    filterTransactionList
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountState } from "../types/AccountState";
import { Account } from "../types/Account";

const initialState: AccountState = {
    searchText: "",
    skip: 0, 
    limit: 10,
    accountList: [],
    totalAccountCount: 0,
    newAccountInfo: {
        name: "",
        bankName: "",
        bankBranchName: "",
        bankAccountHolderName: "",
        bankAccountNumber: "",
        balance: "",
    },
    accountInAction: null,
    isDeleting: false
}

const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        },
        fetchAccountData: (state, action: PayloadAction<{ accounts: Account[], totalAccountCount: number }>) => {
            const { accounts, totalAccountCount } = action.payload;
            return {
                ...state,
                accountList: accounts,
                totalAccountCount
            }
        },
        addNewAccountInfo: (state, action: PayloadAction<{ name: string, value: string }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                newAccountInfo: {
                    ...state.newAccountInfo,
                    [name]: value
                }
            }
        },
        toggleDeleteModal: (state, action: PayloadAction<Account | null>) => {
            return {
                ...state,
                isDeleting: !state.isDeleting,
                accountInAction: action.payload
            }
        },
        filterAccountList: (state, action: PayloadAction<Account[]>) => {
            return {
                ...state,
                totalAccountCount: state.totalAccountCount - 1,
                accountList: action.payload
            }
        }
    }
})

export const {
    updateState,
    fetchAccountData,
    addNewAccountInfo,
    toggleDeleteModal,
    filterAccountList
} = accountsSlice.actions;

export default accountsSlice.reducer;
import { Transaction } from "./Transaction";

export interface AccountUserDataItem {
    itemId: number
    id: string
    type: string
    title: string
}

export type NewTransactionInfo = {
    name: string
    description: string
    amount: string
}

export type TransactionRequestBody = Pick<Transaction, "name" | "amount"> & {
    description?: string
    debitedFromAccountId?: number
    debitedFromUserId?: number
    creditedToAccountId?: number
    creditedToUserId?: number
}

export interface TransactionState {
    searchText: string
    skip: number
    limit: number
    totalTransactionCount: number
    transactionList: Transaction[]
    newTransactionInfo: NewTransactionInfo
    selectedDebitedFromItem: AccountUserDataItem | null
    selectedCreditedToItem: AccountUserDataItem | null
    transactionInAction: Transaction | null
    isDeleting: boolean
}
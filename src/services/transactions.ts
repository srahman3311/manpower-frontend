import httpClient from "./httpClient";
import { Transaction } from "../features/transactions/types/Transaction";
import { TransactionRequestBody, TransactionState } from "../features/transactions/types/TransactionState";

type Params = Pick<TransactionState, "searchText" | "skip" | "limit">

export const fetchTransactions = async(params: Params): Promise<{ transactions: Transaction[], total: number }> => {
    const paramString = `searchText=${params.searchText}&skip=${params.skip}&limit=${params.limit}`;
    return httpClient.get(`/transactions?${paramString}`);
}

export const createTransaction = async(requestBody: TransactionRequestBody): Promise<Transaction> => {
    return httpClient.post("/transactions/create", requestBody);
}

export const editTransaction = async(transactionId: string, requestBody: TransactionRequestBody): Promise<Transaction> => {
    return httpClient.patch(`/transactions/${transactionId}/edit`, requestBody);
}

export const deleteTransaction = async(transactionId?: number): Promise<void> => {
    return httpClient.delete(`/transactions/${transactionId}/delete`);
}


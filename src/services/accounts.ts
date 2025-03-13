import httpClient from "./httpClient";
import { Account } from "../features/accounts/types/Account";
import { AccountState, AccountRequestBody } from "../features/accounts/types/AccountState";

type Params = Pick<AccountState, "searchText" | "skip" | "limit">

export const fetchAccounts = async(params: Params): Promise<{ accounts: Account[], total: number }> => {
    const paramString = `searchText=${params.searchText}&skip=${params.skip}&limit=${params.limit}`;
    return httpClient.get(`/accounts?${paramString}`);
}

export const createAccount = async(requestBody: AccountRequestBody): Promise<Account> => {
    return httpClient.post("/accounts/create", requestBody);
}

export const editAccount = async(accountId: string, requestBody: AccountRequestBody): Promise<Account> => {
    return httpClient.patch(`/accounts/${accountId}/edit`, requestBody);
}

export const deleteAccount = async(accountId?: number): Promise<void> => {
    return httpClient.delete(`/accounts/${accountId}/delete`);
}

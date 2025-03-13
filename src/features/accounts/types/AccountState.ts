import { Account, AccountModel } from "./Account";

export type NewAccountInfo = {
    [k in keyof AccountModel]: string
}

export type AccountRequestBody = Partial<Omit<NewAccountInfo, "name" | "balance">> & {
    name: string
    balance?: number
}

export interface AccountState {
    searchText: string
    skip: number
    limit: number
    accountList: Account[]
    totalAccountCount: number
    newAccountInfo: NewAccountInfo
    accountInAction: Account | null
    isDeleting: boolean
}

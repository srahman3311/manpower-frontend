import { ModelWithTenant } from "../../../types/Model";

export interface AccountModel {
    name: string
    bankName: string | null
    bankBranchName: string | null
    bankAccountHolderName: string | null
    bankAccountNumber: string | null
    balance: number
}

export type Account = ModelWithTenant<AccountModel>
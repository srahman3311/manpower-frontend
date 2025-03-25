import { ModelWithTenant } from "../../../types/Model";
import { Account } from "../../accounts/types/Account";
import { User } from "../../users/types/User";

export interface TransactionModel {
    name: string
    description: string | null
    amount: number
    debitedFromAccountId: number | null
    debitedFromAccount: Account | null
    debitedFromUserId: number | null
    debitedFromUser: User | null
    creditedToAccountId: number | null
    creditedToAccount: Account | null
    creditedToUserId: number | null
    creditedToUser: User | null
    userId: number
    user: User
}

export type Transaction = ModelWithTenant<TransactionModel>
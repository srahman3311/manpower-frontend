import { User as IUser } from "./User";

export type NewUserInfo = Pick<IUser, "firstName" | "lastName" | "email" | "password"> & {
    role: string
    phone: string
    password2: string
    balance: string
}

export type UserRequestBody = Pick<IUser, "firstName" | "lastName" | "email" | "password"> & {
    phone?: string
    phone2?: string
    roles: string[]
    permissions: string[]
    balance?: number
    imageUrl?: string
}


export interface UserState {
    searchText: string
    skip: number
    limit: number
    totalUserCount: number
    userList: IUser[]
    newUserInfo: NewUserInfo
    profilePhoto: File | null
    userInAction: IUser | null
    isDeleting: boolean
}
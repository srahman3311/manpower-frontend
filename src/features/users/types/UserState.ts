import { User as IUser } from "./User";

export type NewUserInfo = Pick<IUser, "firstName" | "lastName" | "email" | "role" | "password"> & {
    phone: string
    password2: string
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
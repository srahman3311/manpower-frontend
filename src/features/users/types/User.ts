import { Model } from "../../../types/Model";

export enum UserRole {
    Admin = "admin",
    Director = "director",
    ManagingDirector = "managing_director"
}

export interface UserModel {
    firstName: string
    lastName: string
    email: string
    phone: string | null
    password: string
    role: UserRole
    imageUrl: string | null
}

export type User = Model<UserModel>
import { User as IUser } from "../users/types/User";

export interface AuthState {
    email: string
    password: string
    status: string
    error: string | null
    user: IUser | null
}
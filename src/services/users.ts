import httpClient from "./httpClient";
import { UserState } from "../features/users/types/UserState";
import { User } from "../features/users/types/User";

type LoginPayload = Pick<UserState, "email" | "password">

interface LoginResponse {
    token: string
    user: User
}

export const login = async(payload: LoginPayload): Promise<LoginResponse> => {
    return httpClient.post("/login", payload);
}

export const logout = async(): Promise<void> => {
    return httpClient.post("/logout")
}

export const getCurrentUser = async(): Promise<LoginResponse["user"]> => {
    return httpClient.get("/me")
}
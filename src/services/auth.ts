import httpClient from "./httpClient";
import { AuthState } from "../features/auth/AuthState";

type LoginPayload = Pick<AuthState, "email" | "password">

export const login = async(payload: LoginPayload): Promise<{ token: string }> => {
    return httpClient.post("/auth/login", payload);
}

export const logout = async(): Promise<void> => {
    return httpClient.post("/logout")
}

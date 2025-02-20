import httpClient from "./httpClient";
import { User } from "../features/users/types/User";
import { UserState, UserRequestBody } from "../features/users/types/UserState";

type Params = Pick<UserState, "searchText" | "skip" | "limit">

export const fetchAuthUser = async(): Promise<User> => {
    return httpClient.get("/users/me");
}

export const fetchUsers = async(params: Params): Promise<{ users: User[], total: number }> => {
    const paramString = `searchText=${params.searchText}&skip=${params.skip}&limit=${params.limit}`;
    return httpClient.get(`/users?${paramString}`);
}

export const createUser = async(requestBody: UserRequestBody): Promise<User> => {
    return httpClient.post("/users/create", requestBody);
}

export const editUser = async(userId: string, requestBody: UserRequestBody): Promise<User> => {
    return httpClient.patch(`/users/${userId}/edit`, requestBody);
}

export const deleteUser = async(userId?: number): Promise<void> => {
    return httpClient.delete(`/users/${userId}/delete`);
}


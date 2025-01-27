import httpClient from "./httpClient";
import { User as IUser } from "../features/users/types/User";
import { NewUserInfo, UserState } from "../features/users/types/UserState";

type Params = Pick<UserState, "searchText" | "skip" | "limit">

export const fetchAuthUser = async(): Promise<IUser> => {
    return httpClient.get("/users/me");
}

export const fetchUsers = async(params: Params): Promise<{ users: IUser[], total: number }> => {
    const paramString = `searchText=${params.searchText}&skip=${params.skip}&limit=${params.limit}`;
    return httpClient.get(`/users?${paramString}`);
}

export const createUser = async(requestBody: Partial<NewUserInfo>): Promise<IUser> => {
    return httpClient.post("/users/create", requestBody);
}

export const editUser = async(userId: string, requestBody: Partial<NewUserInfo>): Promise<IUser> => {
    return httpClient.patch(`/users/${userId}/edit`, requestBody);
}

export const deleteUser = async(userId?: number): Promise<void> => {
    return httpClient.delete(`/users/${userId}/delete`);
}


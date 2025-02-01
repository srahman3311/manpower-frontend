import httpClient from "./httpClient";
import { PassengerState } from "../features/passengers/types/PassengerState";
import { Passenger } from "../features/passengers/types/Passenger";

type Params = Pick<PassengerState, "searchText" | "skip" | "limit">;
type RequestBody = Record<string, any> 

export const fetchPassengers = async(params: Params): Promise<{ passengers: Passenger[], total: number }> => {
    const paramString = `searchText=${params.searchText}&skip=${params.skip}&limit=${params.limit}`;
    return httpClient.get(`/passengers?${paramString}`);
}

export const createPassenger = async(requestBody: RequestBody): Promise<Passenger> => {
    return httpClient.post("/passengers/create", requestBody);
}

export const editPassenger = async(passengerId: string, requestBody: RequestBody): Promise<Passenger> => {
    return httpClient.patch(`/passengers/${passengerId}/edit`, requestBody);
}

export const deletePassenger = async(passengerId?: number): Promise<void> => {
    return httpClient.delete(`/passengers/${passengerId}/delete`);
}


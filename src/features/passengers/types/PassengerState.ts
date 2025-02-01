import { Passenger } from "./Passenger";
import { Job } from "../../jobs/types/Job";
import { Agent } from "../../agents/types/Agent";

export type NewPassengerInfo = Pick<Passenger, "name" | "phone"> & {
    email: string
    address: string
    fatherName: string
    motherName: string
    age: string
    occupation: string
    experience: string
    weight: string
    height: string
    nationalId: string
}

export interface PassengerState {
    searchText: string
    skip: number
    limit: number
    totalPassengerCount: number
    passengerList: Passenger[]
    birthDate: Date | null
    selectedJob: Job | null
    selectedAgent: Agent | null
    newPassengerInfo: NewPassengerInfo
    photo: File | null
    passengerInAction: Passenger | null
    isDeleting: boolean
}
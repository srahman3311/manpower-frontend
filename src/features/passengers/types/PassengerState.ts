import { Passenger, PassengerModel } from "./Passenger";
import { Job } from "../../jobs/types/Job";
import { Agent } from "../../agents/types/Agent";
import { _Address } from "../../../types/Address";

export type _Passenger = Omit<
PassengerModel, 
"birthDate" |
"passport" |
"visaExpiryDate" |
"medical" |
"job" |
"agent" |
"address" |
"imageUrl"
>

export type NewPassengerInfo = {
    [K in keyof _Passenger]: string
} & { 
    birthDate: Date | null 
    visaExpiryDate: Date | null
}

export type NewPassportInfo = {
    number: string
    date: Date | null
    expiryDate: Date | null
    issuingInstitute: string
}

export type NewMedicalInfo = {
    date: Date | null
    expiryDate: Date | null
    status: string
}

export interface PassengerState {
    searchText: string
    skip: number
    limit: number
    totalPassengerCount: number
    passengerList: Passenger[]
    selectedJob: Job | null
    selectedAgent: Agent | null
    newPassengerInfo: NewPassengerInfo
    passportInfo: NewPassportInfo
    medicalInfo: NewMedicalInfo
    addressInfo: _Address
    photo: File | null
    passengerInAction: Passenger | null
    isDeleting: boolean
}
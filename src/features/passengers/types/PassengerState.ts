import { Passenger, PassengerModel } from "./Passenger";
import { Job } from "../../jobs/types/Job";
import { Agent } from "../../agents/types/Agent";
import { _Address } from "../../../types/Address";

export enum PassengerStatus {
    Processing = "processing",
    Completed = "completed"
}

export type _Passenger = Omit<
PassengerModel, 
"birthDate" |
"passport" |
"visaExpiryDate" |
"visaIssueDate" |
"visaApplicationDate" |
"visaApplicationFingerDate" |
"visaBMETFingerDate" |
"flights" |
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
    visaIssueDate: Date | null
    visaApplicationDate: Date | null
    visaApplicationFingerDate: Date | null
    visaBMETFingerDate: Date | null
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

export type NewFlightInfo = {
    id?: number 
    date: Date | null   
    airlinesName: string
    number: string  
    departureDate: Date | null
    departurePlaceAndTime: string
    arrivalDate: Date | null
    arrivalPlaceAndTime: string
}

export interface PassengerState {
    searchText: string
    skip: number
    limit: number
    totalPassengerCount: number
    passengerList: Passenger[]
    invoicePassengerList: Passenger[]
    selectedJob: Job | null
    selectedAgent: Agent | null
    newPassengerInfo: NewPassengerInfo
    passportInfo: NewPassportInfo
    medicalInfo: NewMedicalInfo
    newFlightInfo: NewFlightInfo
    flights: Partial<NewFlightInfo>[]
    addressInfo: _Address
    photo: File | null
    passengerInAction: Passenger | null
    isDeleting: boolean
}
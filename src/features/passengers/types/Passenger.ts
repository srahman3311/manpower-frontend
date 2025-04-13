import { ModelWithTenant } from "../../../types/Model";
import { Job } from "../../jobs/types/Job";
import { Agent } from "../../agents/types/Agent";
import { Address } from "../../../types/Address";
import { Passport } from "./Passport";
import { Medical } from "./Medical";
import { Flight } from "./Flight";

export interface PassengerModel {
    name: string
    phone: string
    email: string | null
    birthDate: string | null
    age: number | null
    nationalId: string | null
    fatherName: string | null
    motherName: string | null
    occupation: string | null
    experience: string | null
    weight: string | null
    height: string | null
    passport: Passport
    medical: Medical
    job: Job | null
    agent: Agent
    address: Address
    cost: number
    sale: number
    enjazNumber: string | null
    visaNumber: string | null
    visaApplicationNumber: string | null
    visaApplicationDate: string | null
    visaApplicationFingerDate: string | null
    visaIssueDate: string | null
    visaExpiryDate: string | null
    visaBMATFingerDate: string | null
    idNumber: string | null
    flights: Flight[]
    status: string
    imageUrl: string | null
}

export type Passenger = ModelWithTenant<PassengerModel>
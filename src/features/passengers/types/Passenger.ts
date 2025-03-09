import { ModelWithTenant } from "../../../types/Model";
import { Job } from "../../jobs/types/Job";
import { Agent } from "../../agents/types/Agent";
import { Address } from "../../../types/Address";
import { Passport } from "./Passport";
import { Medical } from "./Medical";

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
    enjazNumber: string
    visaNumber: string
    visaIssueDate: string | null
    visaExpiryDate: string | null
    idNumber: string
    status: string
    imageUrl: string | null
}

export type Passenger = ModelWithTenant<PassengerModel>
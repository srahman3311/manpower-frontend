import { Passenger } from "./Passenger";

export interface Flight {
    id: number
    date: string | null
    airlinesName: string | null
    number: string | null
    departureDate: string | null
    departurePlaceAndTime: string | null
    arrivalDate: string | null
    arrivalPlaceAndTime: string | null
    passengerId: number
    passenger: Passenger
}


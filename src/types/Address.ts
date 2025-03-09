import { Model } from "./Model";

export interface AddressModel {
    line1: string | null
    line2:string | null
    postalCode: string | null
    city: string | null
    state: string | null
    country: string | null
}

export type Address = Model<AddressModel>

export type _Address = {
    [K in keyof AddressModel]: string
}
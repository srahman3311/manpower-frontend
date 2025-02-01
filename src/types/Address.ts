import { Model } from "./Model";

export interface AddressModel {
    line1: string | null
    line2:string | null
    postalCode: string | null
    city: string | null
    state: string | null
    imageUrl: string | null
}

export type Address = Model<AddressModel>
import { Model } from "./Model";

export interface TenantModel {
    name: string
}

export type Tenant = Model<TenantModel>
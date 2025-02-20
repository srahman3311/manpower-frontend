import { Tenant } from "./Tenant";

export interface ModelFields {
    id: number
    createdAt: string
    updatedAt: string
    deleted: boolean
}

export type Model<T> = ModelFields & T

export type ModelWithTenant<T> = {
    tenantId: number
    tenant: Tenant
} & ModelFields & T
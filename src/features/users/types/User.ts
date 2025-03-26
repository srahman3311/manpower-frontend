import { ModelWithTenant } from "../../../types/Model";
import { Address } from "../../../types/Address";
import { Role } from "../../../types/Role";
import { Permission } from "../../../types/Permission";

export enum UserRole {
    Tenant = "tenant",
    Admin = "admin",
    Director = "director",
    Manager = "manager",
    Basic = "basic"
}

export enum UserPermission {
    Read = "read",
    Write = "write",
    Delete = "delete"
}

export interface UserModel {
    firstName: string
    lastName: string
    email: string
    phone: string | null
    phone2: string | null
    password: string
    balance: number
    roles: Role[]
    permissions: Permission[]
    addressId: number
    address: Address
    imageUrl: string | null
}

export type User = ModelWithTenant<UserModel>
import { User, UserRole } from "../types/User";

export const getIsAdminOrTenant = (user: User | null) => {
    const isAdminOrTenant = user?.roles.some(role => {
        return role.name === UserRole.Tenant || role.name === UserRole.Admin
    });
    return isAdminOrTenant;
}
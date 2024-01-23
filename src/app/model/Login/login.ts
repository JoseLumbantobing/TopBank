import { AdminRole } from "./admin-role";

export interface Login {
    adminId: number;
    adminName: string;
    adminEmail: string;
    adminCode: string;
    adminRoleDto: AdminRole;
}
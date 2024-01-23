import { AdminRole } from "../Login/admin-role";

export interface Admin {
    adminId: number;
    adminName: string;
    adminEmail: string;
    adminCode: string;
    adminRoleDto: AdminRole;
}
import { AdminRole } from "../Login/admin-role";

export interface GetDataAdmin {
    adminId: number;
    adminName: string;
    adminEmail: string;
    adminCode: string;
    adminRoleDto: AdminRole;
    createdAt: string
}
import { Admin } from "./admin";

export interface AdminResponse {
    success: boolean;
    message: string;
    errorCode: string;
    data: Admin;
}
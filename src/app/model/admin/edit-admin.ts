import { Admin } from "./admin";

export interface EditAdmin {
    success: boolean;
    message: string;
    errorCode: string;
    data: Admin;
}
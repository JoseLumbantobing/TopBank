import { Login } from "./login";

export interface LoginResponse {
    success: boolean;
    message: string;
    errorCode: string;
    data: Login | null;
}
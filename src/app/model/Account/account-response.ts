import { AccountData } from "./account-data";

export interface AccountResponse {
    success: boolean;
    message: string;
    errorCode: string;
    data: AccountData;
}
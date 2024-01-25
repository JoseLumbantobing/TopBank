import { GetDataAdmin } from "./get-data-admin";

export interface GetAdmin {
    success: boolean;
    message: string;
    errorCode: string;
    data: GetDataAdmin[];
}
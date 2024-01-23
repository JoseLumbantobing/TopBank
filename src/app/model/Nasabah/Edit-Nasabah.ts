import { Nasabah } from "./Nasabah";

export interface EditNasabah {
    success: boolean;
    message: string;
    errorCode: string;
    data: Nasabah | null;
}
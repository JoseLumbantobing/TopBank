import { CustomerCard } from "./Nasabah-Card";

export interface Nasabah {
    customerId: string,
    customerName: string;
    customerAccount: string;
    customerEmail: string;
    customerPhone: string;
    customerCard: CustomerCard;
    customerMotherName: string;
    createdAt: string;
}
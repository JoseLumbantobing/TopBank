import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EditNasabah } from "../model/Nasabah/Edit-Nasabah";
import { Nasabah } from "../model/Nasabah/Nasabah";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) { }

    GetCustomer(): Observable<Nasabah[]>{
        return this.http.get<Nasabah[]>('https://dia.ideaco.co.id:8787/api/v1/customers');
    }

    Savecustomer(data:any){
        return this.http.post("https://dia.ideaco.co.id:8787/api/v1/customers",data);
    }

    GetCustomerbycode(code:any): Observable<Nasabah>{
        return this.http.get<Nasabah>(`https://dia.ideaco.co.id:8787/api/v1/customers/`+code);
    }

    updateCustomer(id:any, data:any){
        return this.http.put(`https://dia.ideaco.co.id:8787/api/v1/customers/${id}`,data);
    }

    editCustomer(
        customerId: string,
        name: string,
        email: string,
        phone: string,
        motherName: string,
        editedBy: string
      ): Observable<EditNasabah> {
        const url = `https://dia.ideaco.co.id:8787/api/v1/customers/${customerId}`;
    
        const formData = new FormData();
        formData.append('customerName', name);
        formData.append('customerEmail', email);
        formData.append('customerPhone', phone);
        formData.append('customerMotherName', motherName);
        formData.append('editedBy', editedBy);
    
        return this.http.put<EditNasabah>(url, formData);
    }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminResponse } from '../model/admin/admin-response';
import { Observable } from 'rxjs';
import { GetAdmin } from '../model/admin/get-admin';
import { EditAdmin } from '../model/admin/edit-admin';
import { DeleteAdmin } from '../model/admin/delete-admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api_url = 'https://dia.ideaco.co.id:8787/api/v1/admins'

  constructor(private http: HttpClient) { }

  getAccountAdmin(adminId: string): Observable<AdminResponse> {
    const url = `${this.api_url}/${adminId}`;

    return this.http.get<AdminResponse>(url);
  }

  getListAdmins(): Observable<GetAdmin> {
    const url = this.api_url;
    return this.http.get<GetAdmin>(url);
  }

  addAdmin(
    name: string,
    email: string,
    password: string,
    role: string,
    createdBy: string
  ): Observable<AdminResponse> {
    const url = this.api_url;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('createdBy', createdBy);

    return this.http.post<AdminResponse>(url, formData);
  }

  editAdmin(
    adminId: string,
    name: string,
    email: string,
    password: string,
    role: string,
    editedBy: string,
  ): Observable<EditAdmin> {
    const url = `${this.api_url}/${adminId}`;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('editedBy', editedBy);

    return this.http.put<EditAdmin>(url, formData);
  }

  deleteAdmin(adminId: string): Observable<DeleteAdmin> {
    const url = `${this.api_url}/${adminId}`;

    return this.http.delete<DeleteAdmin>(url);
  }
}
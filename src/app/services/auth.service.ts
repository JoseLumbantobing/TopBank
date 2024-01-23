import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/Login/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dia.ideaco.co.id:8787/api/v1/admin/auth';
  private readonly SESSION_KEY = 'isLoggedIn';
  private readonly USER_ID = 'id';
  private readonly USER_NAME = 'name';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.apiUrl}?email=${email}&password=${password}`;
    return this.http.get<LoginResponse>(url);
  }

  setLoggedIn(userId: string, name: string): void {
    localStorage.setItem(this.SESSION_KEY, 'true');
    localStorage.setItem(this.USER_ID, userId);
    localStorage.setItem(this.USER_NAME, name);
  }
  
  getLoggedIn(): boolean {
    return localStorage.getItem(this.SESSION_KEY) === 'true';
  }
  
  getUsername(): string {
    return localStorage.getItem(this.USER_NAME) || '';
  }
  
  getId(): string {
    return localStorage.getItem(this.USER_ID) || "";
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.USER_ID);
    localStorage.removeItem(this.USER_NAME);
  }
}

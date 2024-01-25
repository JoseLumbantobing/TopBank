import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountResponse } from '../model/Account/account-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api_url = 'https://dia.ideaco.co.id:8787/api/v1/dashboard/';

  constructor(
    private http: HttpClient
  ) { }

  getAccountPurpose(): Observable<AccountResponse> {
    const url = `${this.api_url}account-purpose-summary`;
    return this.http.get<AccountResponse>(url);
  }
}

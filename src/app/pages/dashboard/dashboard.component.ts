import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/admin/admin';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sidenavOpened = true;
  isDropdownOpen = false;
  isUserLoggedIn = true;
  userData: any;
  adminData: Admin | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService.getAccountAdmin(this.authService.getId()).subscribe({
      next: (res) => {
        if (res.success) {
          this.adminData = res.data;
        }
      },
      error: (e) => {
        console.log('Error',e);
      }
    });
  }

  adminUsername(){
    return this.authService.getUsername();
  }
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

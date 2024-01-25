import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/admin/admin';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ChartOptions, ChartType } from 'chart.js';
import { AccountData } from 'src/app/model/Account/account-data';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sidenavOpened = true;
  isDropdownOpen = false;
  isUserLoggedIn = true;
  adminData: Admin | null = null;
  accountData!: AccountData;
  data: any;
  options: any;

  // public pieChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // public pieChartLabels: string[] = [];
  // public pieChartData: number[] = [];
  // public pieChartType: ChartType = 'pie';

  constructor(
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService,
    private service: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadData();

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

  loadData() {
    this.service.getAccountPurpose().subscribe({
      next: (res) => {
        if(res.success) {
          this.accountData = res.data;
        }
      },
      error: (e) => {
        console.log('Error ', e)
      },
      complete: () => { this.showChart(); }
    })
  }

  showChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: this.accountData.detail.map(item => item.purposeName),
      datasets: [{
        data: this.accountData.detail.map(item => item.count),
        backgroundColor: this.accountData.detail.map(item => item.graphColor)
      }]
    }

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          display: false,
          labels: {
            color: textColor
          }
        }
      }
    }
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

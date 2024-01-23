import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../../popup/edit-dialog/edit-dialog.component';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';
import { MatTable } from '@angular/material/table';
import { Admin } from 'src/app/model/admin/admin';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nasabah',
  templateUrl: './nasabah.component.html',
  styleUrls: ['./nasabah.component.scss']
})
export class NasabahComponent implements OnInit {
  public getJsonValue: any
  public dataSource: any;
  public totalItems: number = 0;
  public serialNumber: number = 0;
  
  public displayColumn: string[] = ['nomor', 'nama', 'rekening', 'email', 'telp', 'debit', 'ibu', 'pembuatan', 'edit'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  sidenavOpened = true;
  isDropdownOpen = false;
  isUserLoggedIn = true;
  adminData: Admin | null = null;

  constructor(
    private router: Router,
    private service: UserService,
    private authService: AuthService,
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMethod();

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

  public getMethod() {
    this.service.GetCustomer().subscribe((res: any) => {
      this.getJsonValue = res.data;
      this.totalItems = res.data.length;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
    })
  }

  calculateSerialNumber(index: number): number {
    return (this.paginator.pageIndex * this.paginator.pageSize) + index + 1;
  }

  onPageChange(): void {
    // this.calculateSerialNumber();
  }

  editCustomer(code: any) {
    this.openPopUp(code, 'Edit Data Nasabah');
  }

  openPopUp(code: any, title: any){
    var _popup = this.dialog.open(EditDialogComponent, {
      width: '40%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.getMethod();
    })
  }

  exportToExcel(): void {
    const data = this.dataSource.data;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'exported-data.xlsx');
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
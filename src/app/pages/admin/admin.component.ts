import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { MatTable } from '@angular/material/table';
import { Admin } from 'src/app/model/admin/admin';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminComponent } from 'src/app/popup/add-admin/add-admin.component';
import { EditAdminComponent } from 'src/app/popup/edit-admin/edit-admin.component';
import { DeleteAdminComponent } from 'src/app/popup/delete-admin/delete-admin.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  sidenavOpened = true;
  isDropdownOpen = false;
  isUserLoggedIn = true;
  adminData: Admin | null = null;

  public getJsonValue: any
  public dataSource: any;
  public totalItems: number = 0;
  public serialNumber: number = 0;
  // items: MenuItem[] | undefined;
  // home: MenuItem | undefined;
  
  public displayColumn: string[] = ['nomor', 'nama', 'email', 'admin', 'role', 'pembuatan', 'edit'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private adminService: AdminService,
    private authService: AuthService,
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
    this.http.get('https://dia.ideaco.co.id:8787/api/v1/admins').subscribe((res: any) => {
      // console.log(res.data);
      this.getJsonValue = res.data;
      this.totalItems = res.data.length;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
    })
  }

  addAdmin(){
    this.openPopUp('Tambah Admin');
  }

  editAdmin(code: any) {
    this.editPopUp(code, 'Edit Admin');
  }

  deleteAdmin(code: any) {
    this.deletePopUp(code);
  }

  openPopUp(title: any){
    var _popup = this.dialog.open(AddAdminComponent, {
      width: '40%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.getMethod();
    })
  }

  editPopUp(code:any, title: any){
    var _popup = this.dialog.open(EditAdminComponent, {
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

  deletePopUp(code:any){
    var _popup = this.dialog.open(DeleteAdminComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.getMethod();
    })
  }

  exportToExcel(){
    const data = this.dataSource.data;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'exported-data.xlsx');
  }

  calculateSerialNumber(index: number): number {
    return (this.paginator.pageIndex * this.paginator.pageSize) + index + 1;
  }

  onPageChange(): void {
    // this.calculateSerialNumber();
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

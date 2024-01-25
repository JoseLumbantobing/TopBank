import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-admin',
  templateUrl: './delete-admin.component.html',
  styleUrls: ['./delete-admin.component.scss']
})
export class DeleteAdminComponent implements OnInit {
  inputdata: any;
  public getJsonValue: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private ref: MatDialogRef<DeleteAdminComponent>,
    private service: AdminService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  public getMethod() {
    this.service.getListAdmins().subscribe((res: any) => {
      this.getJsonValue = res.data;
    })
  }

  closepopup() {
    this.ref.close('Exit pop up');
  }

  deleteAdmin() {
    this.service.deleteAdmin(this.inputdata.code).subscribe({
      next: (res) => {
        if (res.success) {
          this.getMethod();
          this.closepopup();
        } else {
          console.log('Data failed to delete.');
        }
      },
      error: (e) => {
        console.log('Error',e);
      },
      complete: () => console.log('Admin berhasil dihapus.')
    });
  }
}

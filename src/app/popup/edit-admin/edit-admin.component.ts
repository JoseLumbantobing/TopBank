import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {
  inputdata: any;
  editdata: any;
  public getJsonValue: any;

  roles = [
    { value: '1', label: 'Super Admin' },
    { value: '2', label: 'Admin Pusat' },
    { value: '3', label: 'Admin Cabang' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private ref: MatDialogRef<EditAdminComponent>, 
    private buildr: FormBuilder,
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

  isAdminRole(role: string): boolean {
    return this.myform.get('role')?.value === role;
  }

  editAdmin() {
    if(this.myform.valid) {
      if(this.inputdata && this.myform) {
        this.service.editAdmin(
          this.inputdata.code,
          this.myform.value.name!,
          this.myform.value.email!,
          this.myform.value.password!,
          this.myform.value.role!,
          this.authService.getId()
        ).subscribe({
          next: (res) => {
            if (res.success) {
              this.getMethod();
              this.closepopup();
            } else {
              console.log('Data failed to obtain');
            }
          },
          error: (e) => {
            console.log('Error',e);
          },
          complete: () => console.log('Admin berhasil diubah.')
        });
      }
    } else if (this.myform.value.role !== '1') {
      this.myform.get('password')?.clearValidators();
      this.myform.get('password')?.updateValueAndValidity();
    } else if (this.myform.get('name')?.invalid) {
      alert('Harap mengisi kolom Nama.')
    } else if (this.myform.get('email')?.invalid) {
      alert('Harap mengisi kolom Email yang sesuai.')
    } else if (this.myform.get('password')?.invalid) {
      alert('Harap mengisi kolom Password yang sesuai.')
    } else if (this.myform.get('role')?.invalid) {
      alert('Harap mengisi kolom Role.')
    }
    else {
      alert('Harap mengisi semua kolom data.')
    }
  }

  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  myform = this.buildr.group({
    name: this.buildr.control('', Validators.required),
    email: this.buildr.control('', [Validators.required, Validators.email]),
    password: this.buildr.control('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]),
    role: this.buildr.control('', Validators.required)
  });
}

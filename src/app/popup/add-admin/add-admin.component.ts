import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  inputdata: any;
  editdata: any;
  public getJsonValue: any;

  formValues = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  roles = [
    { value: '1', label: 'Super Admin' },
    { value: '2', label: 'Admin Pusat' },
    { value: '3', label: 'Admin Cabang' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private ref: MatDialogRef<AddAdminComponent>, 
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

  addAdmin() {
    if(this.myform.valid) {
      this.service.addAdmin(
        this.myform.value.name!,
        this.myform.value.email!,
        this.myform.value.password!,
        this.myform.value.role!,
        this.authService.getId()
      ).subscribe({
        next: (res) => {
          if (res.success) {
            this.getMethod();
            this.myform.patchValue(this.formValues);
            this.closepopup();
          } else {
            console.log('Data failed to obtain');
          }
        },
        error: (e) => {
          console.log('Error',e);
        },
        complete: () => console.log('Admin berhasil ditambahkan.')
      });
    } else if (this.myform.value.role !== '1') {
      this.myform.get('password')?.clearValidators();
      this.myform.get('password')?.updateValueAndValidity();
    } else if (this.myform.get('name')?.invalid) {
      alert('Harap mengisi kolom Nama.')
    } else if (this.myform.get('email')?.invalid) {
      alert('Harap mengisi kolom Email yang sesuai.')
    } else if (this.myform.get('role')?.invalid) {
      alert('Harap mengisi kolom Role.')
    } else if (this.myform.get('password')?.invalid) {
      alert('Harap mengisi kolom Password yang sesuai.')
    }
    else {
      alert('Harap mengisi semua kolom data.')
    }
  }

  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  myform = this.buildr.group({
    name: this.buildr.control('', Validators.required),
    email: this.buildr.control('', [Validators.required, Validators.email]),
    role: this.buildr.control('', Validators.required),
    password: this.buildr.control('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)])
  });
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Nasabah } from 'src/app/model/Nasabah/Nasabah';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})

export class EditDialogComponent implements OnInit {
  inputdata: any;
  editdata: any;
  public getJsonValue: any;
  // selectedCustomer: Nasabah | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private ref: MatDialogRef<EditDialogComponent>, 
    private buildr: FormBuilder,
    private service: UserService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  editNasabah() {
    if(this.myform.valid) {
      if(this.inputdata && this.myform) {
        this.service.editCustomer(
          this.inputdata.code,
          this.myform.value.name!,
          this.myform.value.email!,
          this.myform.value.phone!,
          this.myform.value.motherName!,
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
          complete: () => console.log('Edit nasabah berhasil')
        });
      } else {
        console.error("Error")
      }
    } else if (this.myform.get('name')?.invalid) {
      alert('Harap mengisi kolom Nama.')
    } else if (this.myform.get('email')?.invalid) {
      alert('Email tidak sesuai.')
    } else if (this.myform.get('phone')?.invalid) {
      alert('Nomor telepon tidak sesuai.')
    } else if (this.myform.get('motherName')?.invalid) {
      alert('Harap mengisi kolom Nama Gadis Ibu Kandung.')
    }
    else {
      alert('Harap mengisi semua kolom data.')
    }
  }

  public getMethod() {
    this.service.GetCustomer().subscribe((res: any) => {
      this.getJsonValue = res.data;
    })
  }

  closepopup() {
    this.ref.close('Exit pop up');
  }

  phoneNumberValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumber = control.value;
    if (phoneNumber && (isNaN(Number(phoneNumber)) || phoneNumber.length < 10 || phoneNumber.length > 13)) {
      return { 'invalidPhoneNumber': true };
    }
    return null;
  };

  myform = this.buildr.group({
    name: this.buildr.control('', Validators.required),
    // account: this.buildr.control(''),
    email: this.buildr.control('', [Validators.required, Validators.email]),
    phone: this.buildr.control('', [Validators.required, this.phoneNumberValidator]),
    // card: this.buildr.control(''),
    motherName: this.buildr.control('', Validators.required)
  });
}

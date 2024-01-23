import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
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
  public getJsonValue: any
  selectedCustomer: Nasabah | null = null;

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
        complete: () => console.info('Update customer commplete')
      });
    } else {
      console.error("Error")
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

  myform = this.buildr.group({
    name: this.buildr.control(''),
    account: this.buildr.control(''),
    email: this.buildr.control(''),
    phone: this.buildr.control(''),
    card: this.buildr.control(''),
    motherName: this.buildr.control('')
  });

  saveUser() {
    this.closepopup();
    // this.service.Savecustomer(this.myform.value).subscribe(res => {
    //   this.closepopup();
    // });
  }
}

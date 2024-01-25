import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { AddAdminComponent } from './add-admin.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AddAdminComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule
  ]
})
export class AddAdminModule { }

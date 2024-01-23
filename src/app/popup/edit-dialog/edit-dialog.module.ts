import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDialogComponent } from './edit-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class EditDialogModule { }

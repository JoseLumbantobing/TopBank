import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NasabahModule } from './pages/nasabah/nasabah.module';
import {MatTableModule} from '@angular/material/table';
import { AdminModule } from './pages/admin/admin.module';
import { EditDialogComponent } from './popup/edit-dialog/edit-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddAdminComponent } from './popup/add-admin/add-admin.component';
import { MatSelectModule } from '@angular/material/select';
import { EditAdminComponent } from './popup/edit-admin/edit-admin.component';
import { DeleteAdminComponent } from './popup/delete-admin/delete-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    EditDialogComponent,
    AddAdminComponent,
    EditAdminComponent,
    DeleteAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    DashboardModule,
    NasabahModule,
    AdminModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

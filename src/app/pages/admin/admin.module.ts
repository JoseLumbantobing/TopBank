import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CardModule } from 'primeng/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    BreadcrumbModule
  ]
})
export class AdminModule { }

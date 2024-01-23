import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NasabahRoutingModule } from './nasabah-routing.module';
import { NasabahComponent } from './nasabah.component';
import { CardModule } from 'primeng/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    NasabahComponent
  ],
  imports: [
    CommonModule,
    NasabahRoutingModule,
    CardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    BreadcrumbModule,
    MatDialogModule
  ]
})
export class NasabahModule { }

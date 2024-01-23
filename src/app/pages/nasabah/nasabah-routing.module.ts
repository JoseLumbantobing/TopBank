import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NasabahComponent } from './nasabah.component';

const routes: Routes = [
  {path: '', component: NasabahComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NasabahRoutingModule { }

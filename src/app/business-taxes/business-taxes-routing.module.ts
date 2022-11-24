import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessTaxesPage } from './business-taxes.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessTaxesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessTaxesPageRoutingModule {}

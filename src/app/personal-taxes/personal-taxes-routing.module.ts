import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalTaxesPage } from './personal-taxes.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalTaxesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalTaxesPageRoutingModule {}

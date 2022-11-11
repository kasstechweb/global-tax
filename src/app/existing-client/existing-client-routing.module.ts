import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExistingClientPage } from './existing-client.page';

const routes: Routes = [
  {
    path: '',
    component: ExistingClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingClientPageRoutingModule {}

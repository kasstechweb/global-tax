import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalTaxesPageRoutingModule } from './personal-taxes-routing.module';

import { PersonalTaxesPage } from './personal-taxes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalTaxesPageRoutingModule
  ],
  declarations: [PersonalTaxesPage]
})
export class PersonalTaxesPageModule {}

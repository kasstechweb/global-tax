import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessTaxesPageRoutingModule } from './business-taxes-routing.module';

import { BusinessTaxesPage } from './business-taxes.page';
import {ComponentsModule} from "../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessTaxesPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [BusinessTaxesPage]
})
export class BusinessTaxesPageModule {}

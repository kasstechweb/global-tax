import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExistingClientPageRoutingModule } from './existing-client-routing.module';

import { ExistingClientPage } from './existing-client.page';
import {ComponentsModule} from "../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ExistingClientPageRoutingModule,
        ReactiveFormsModule,
        ComponentsModule,
    ],
  declarations: [ExistingClientPage]
})
export class ExistingClientPageModule {}

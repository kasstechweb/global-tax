import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MultiFileUploadComponent} from "./multi-file-upload/multi-file-upload.component";
import {IonicModule} from "@ionic/angular";
import {FileUploadModule} from "ng2-file-upload";



@NgModule({
  imports: [CommonModule, IonicModule, FileUploadModule,],
  declarations: [
    MultiFileUploadComponent,
  ],
  exports: [
    MultiFileUploadComponent
  ]
})
export class ComponentsModule { }

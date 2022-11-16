import { Component } from '@angular/core';
import {DataService} from "./services/data.service";
import {StorageService} from "./services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private dataService: DataService,
    private storage: StorageService,
  ) {
    this.dataService.setData('name', 'testName');
    // this.storage.clearStorage();
    // this.storage.setStorageData('name', 'testtttt');
    this.storage.getStorageData('name').then(
      res => {
        if (res){
          this.dataService.setData('name', JSON.parse(res));
          console.log(res);
        }else {
          console.log('error read from storage')
        }
      });
  }
}

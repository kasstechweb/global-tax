import { Component } from '@angular/core';
import {DataService} from "./services/data.service";
import {StorageService} from "./services/storage.service";
import {Platform} from "@ionic/angular";
import {SplashScreen} from "@capacitor/splash-screen";
import {FcmService} from "./services/fcm.service";

import {FCM} from "@capacitor-community/fcm";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private dataService: DataService,
    private storage: StorageService,
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private fcmService: FcmService,
  ) {
    this.initializeApp();
    this.getData();
  }

  initializeApp(){
    this.platform.ready().then(async () => {
      setTimeout(()=>{
        SplashScreen.hide({
          fadeOutDuration: 1000
        });
      }, 2000);
      this.fcmService.initPush();

        // .catch((err) => console.log(err));
    })
  }

  getData(){
    // this.dataService.setData('name', 'testName');
    // this.storage.clearStorage();
    // this.storage.setStorageData('name', 'testtttt');
    this.storage.getStorageData('name').then(
      res => {
        if (res){
          this.dataService.setData('name', JSON.parse(res));
          console.log(res);
        }
      });
  }
}

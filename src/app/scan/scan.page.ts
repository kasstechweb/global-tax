import { Component, OnInit } from '@angular/core';

import {Camera, CameraResultType, CameraSource} from '@capacitor/camera'
import {StorageService} from "../services/storage.service";
import {NavController} from "@ionic/angular";
import {IonLoaderService} from "../services/ion-loader.service";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  friendsList: Array<any>;
  // friends: Array<any>;
  searchQuery = '';
//   friendsList: ;

  friends = [
    {
      "id": 0,
      "image": "./assets/imgs/personal.png",
      "name": "Leo Gill",
      "job": "Ionic Developer",
      "followers": "24",
      "followings": "120",
      "following": true
    },
    {
      "id": 1,
      "image": "./assets/imgs/personal.png",
      "name": "Marie Jensen",
      "job": "Illustrator",
      "followers": "300",
      "followings": "120K",
      "following": false
    },
    {
      "id": 2,
      "image": "./assets/imgs/personal.png",
      "name": "Sasha Ho",
      "job": "UI Designer",
      "followers": "65",
      "followings": "30",
      "following": false
    }
  ];

  constructor(
    private storage: StorageService,
    private navController: NavController,
    private ionLoader: IonLoaderService,
  ) {
    this.ionLoader.showLoader().then(()=> {
      this.storage.getStorageData('scan_logged_in').then(
        res => {
          console.log(res);
          if (res){
            this.ionLoader.dismissLoader();
            if (JSON.parse(res) != 'True'){
              this.navController.navigateRoot(['/login']);
            }
          }else {
            this.ionLoader.dismissLoader();
            this.navController.navigateRoot(['/login']);
          }
        });
    });

  }

  ngOnInit() {


    this.friendsList = this.friends;
  }

  async captureImage() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      console.log('image: ', image);
      // this.image = image.dataUrl;

    }

  searchList(): void {
    const query = (this.searchQuery && this.searchQuery !== null) ? this.searchQuery : '';

    this.friendsList = this.filterList(this.friends, query);
  }

  filterList(list, query): Array<any> {
    return list.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  }
}

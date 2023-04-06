import { Component, OnInit } from '@angular/core';

import {Camera, CameraResultType, CameraSource} from '@capacitor/camera'

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
      "image": "./assets/imgs/personal.png",
      "name": "Leo Gill",
      "job": "Ionic Developer",
      "followers": "24",
      "followings": "120",
      "following": true
    },
    {
      "image": "./assets/imgs/personal.png",
      "name": "Marie Jensen",
      "job": "Illustrator",
      "followers": "300",
      "followings": "120K",
      "following": false
    },
    {
      "image": "./assets/imgs/personal.png",
      "name": "Sasha Ho",
      "job": "UI Designer",
      "followers": "65",
      "followings": "30",
      "following": false
    }
  ];

  constructor() { }

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

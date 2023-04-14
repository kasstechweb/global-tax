import { Component, OnInit } from '@angular/core';

import {Camera, CameraResultType, CameraSource} from '@capacitor/camera'
import {StorageService} from "../services/storage.service";
import {NavController} from "@ionic/angular";
import {IonLoaderService} from "../services/ion-loader.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  // friends: Array<any>;
  site_url = 'https://localhost/gtax_receipt_scanner';
  icon_url = 'https://app.outboundsales.io/api/logo/';
  icon_name: string;
  friendsList: Array<any>;
  friends: Array<any>;
  searchQuery = '';
  user_id: string;
  // test = 'test'
//   friendsList: ;

  // friends = [
  //   {
  //     "id": 0,
  //     "image": "./assets/imgs/personal.png",
  //     "name": "Leo Gill",
  //     "amount_before_tax": "11",
  //     "amount_after_tax": "24",
  //   },
  //   {
  //     "id": 1,
  //     "image": "./assets/imgs/personal.png",
  //     "name": "Mill Ho",
  //     "amount_before_tax": "200",
  //     "amount_after_tax": "300",
  //   },
  //   {
  //     "id": 2,
  //     "image": "./assets/imgs/personal.png",
  //     "name": "Sasha Ho",
  //     "amount_before_tax": "20",
  //     "amount_after_tax": "30",
  //   }
  // ];

  constructor(
    private storage: StorageService,
    private navController: NavController,
    private ionLoader: IonLoaderService,
    public http: HttpClient,
  ) {
    this.ionLoader.showLoader().then(()=> {
      this.storage.getStorageData('scan_logged_in').then(
        res => {
          console.log(res);
          if (res){

            if (JSON.parse(res) != 'True'){
              this.navController.navigateRoot(['/login']);
            }else if (JSON.parse(res) == 'True'){
              // this.navController.navigateRoot(['/scan']);
              this.storage.getStorageData('user_id').then(
                res => {
                  this.user_id = JSON.parse(res)
                  console.log(this.user_id)
                  let formData = new FormData();
                  formData.append('user_id', this.user_id);
                  this.http.post(this.site_url + '/get_receipts.php', formData).subscribe(
                    data => {
                      this.friends = data['data']
                      this.friendsList = this.friends;
                      console.log(data['data'])
                      for (const friend of this.friends) {
                        console.log(friend.name)
                      }

                      //  icon name logic
                      this.get_icon(this.friends)
                      this.ionLoader.dismissLoader();
                    });
                });
            }
          }else {
            this.ionLoader.dismissLoader();
            this.navController.navigateRoot(['/login']);
          }
        });
    });

  }

  ngOnInit() {



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

  get_icon(list) {
    for (let i=0;i<list.length;i++) {
      let small_name = list[i].name.toLowerCase()
      let full_icon_url = this.icon_url + small_name + '.ca'
      // console.log(full_icon_url)
      this.http.get(full_icon_url).subscribe(
          result => {
            console.log('result: ' + result)
          }, (err) => {
            if(err.status == '200'){
              list[i].icon = full_icon_url
            }else if(err.status == '501'){ // error couldn't get image from url
              list[i].icon = this.icon_url + small_name + '.com'
            }
          });
    }
    this.friends = list
    console.log(this.friends)
  }
}

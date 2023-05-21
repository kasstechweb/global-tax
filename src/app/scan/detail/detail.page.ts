import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import {HttpClient} from "@angular/common/http";
import {IonLoaderService} from "../../services/ion-loader.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  // site_url = 'https://localhost/gtax_receipt_scanner';
  site_url = 'https://employerservice.ca/gtax_receipt_scanner';
  // icon_url = 'https://logo.clearbit.com/'
  name: string;
  subtotal_amount: string;
  gst_amount: string;
  total_amount: string;
  receipt_image: string;
  user_id: string;

  receipt_id: string;
  data: Array<any>;

  logo_text: string;
  logo_url: string;

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    public http: HttpClient,
    private ionLoader: IonLoaderService,
    private navController: NavController,
  ) {
    this.receipt_id = this.route.snapshot.paramMap.get('id');

    this.ionLoader.showLoader().then(()=> {
      // this.loadWorker();
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
                  // console.log(this.user_id)

                  let formData = new FormData();
                  formData.append('user_id', this.user_id);
                  formData.append('receipt_id', this.receipt_id);

                  this.http.post(this.site_url + '/get_single_receipt.php', formData).subscribe(
                    data => {

                      this.data = data['data'];
                      this.receipt_image = this.site_url + data['data'].image;
                      // console.log(data['data'])
                      this.logo_text = data['data'].name;
                      // this.get_icon_single();
                      // for (const friend of this.friends) {
                      //   console.log(friend.name)
                      // }

                      //  icon name logic
                      // this.get_icon(this.friends)
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

  // get_icon_single(): any{
  //   let small_name = this.logo_text.toLowerCase();
  //   small_name = small_name.trim();
  //   // console.log('small name: ' + small_name)
  //   let full_icon_url = this.icon_url + small_name + '.ca'
  //   let full_icon_url_com = this.icon_url + small_name + '.com'
  //   // console.log(full_icon_url)
  //   this.http.get(full_icon_url).subscribe(
  //     result => {
  //       // console.log('result: ' + result)
  //     }, (err) => {
  //       // console.log(err)
  //       if(err.status == '200'){
  //         this.logo_url = small_name + '.ca';
  //         // this.friends[0].icon = full_icon_url;
  //         // return full_icon_url;
  //       }else if(err.status == '501'){ // error couldn't get image from url
  //         this.logo_url = small_name + '.com';
  //         // this.friends[0].icon = full_icon_url_com;
  //         // return  this.icon_url + small_name + '.com'
  //       }else if(err.status == '0'){ // error couldn't get image from url
  //         // console.log(small_name + ' 0')
  //         // list[i].icon = false;
  //         // list[i].icon = this.icon_url + small_name + '.com'
  //
  //         this.http.get(full_icon_url_com).subscribe(
  //           result => {
  //             // console.log('result: ' + result)
  //           }, (err) => {
  //             // console.log('err com: ')
  //             // console.log(err)
  //             if(err.status == '200'){
  //               this.logo_url = small_name + '.com';
  //               // console.log('logo url: ' + this.logo_url)
  //               // this.friends[0].icon = full_icon_url_com;
  //               // return full_icon_url_com;
  //             }else if(err.status == '0'){
  //               this.logo_url = '';
  //               // return false;
  //             }
  //           });
  //       }
  //     });
  // }

  ngOnInit() {

  }

}

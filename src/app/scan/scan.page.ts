import { Component, OnInit } from '@angular/core';

import {Camera, CameraResultType, CameraSource} from '@capacitor/camera'
import {StorageService} from "../services/storage.service";
import {NavController} from "@ionic/angular";
import {IonLoaderService} from "../services/ion-loader.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

//reading image import
import {createWorker, PSM} from 'tesseract.js'
import * as Tesseract from "tesseract.js";
import {Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  // friends: Array<any>;
  // employerservice.ca
  site_url = 'https://localhost/gtax_receipt_scanner';
  // icon_url = 'https://app.outboundsales.io/api/logo/';
  icon_url = 'https://logo.clearbit.com/'
  icon_name: string;
  friendsList: Array<any>;
  friends: Array<any>;
  searchQuery = '';
  user_id: string;

  //reading image stuff
  worker: Tesseract.Worker;
  workerReady = false;
  image = 'https://tesseract.projectnaptha.com/img/eng_bw.png'
  ocrResult = '';
  captureProgress = 0;
  show_progress = false;
  result_array: Array<any>;
  subtotal_amount: string;
  gst_amount: string;
  total_amount: string;
  logo_text: string;

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
    private router: Router,
  ) {
    this.ionLoader.showLoader().then(()=> {
      this.loadWorker();
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
                      this.friends = data['data'];
                      this.friends = this.friends.reverse();
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

  // async captureImage() {
  //     const image = await Camera.getPhoto({
  //       quality: 90,
  //       allowEditing: true,
  //       resultType: CameraResultType.DataUrl,
  //       source: CameraSource.Camera
  //     });
  //     console.log('image: ', image);
  //     // this.image = image.dataUrl;
  //
  //   }

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
      let full_icon_url_com = this.icon_url + small_name + '.com'
      // console.log(full_icon_url)
      this.http.get(full_icon_url).subscribe(
          result => {
            console.log('result: ' + result)
          }, (err) => {
          // console.log(err)
            if(err.status == '200'){
              list[i].icon = full_icon_url
            }else if(err.status == '501'){ // error couldn't get image from url
              list[i].icon = this.icon_url + small_name + '.com'
            }else if(err.status == '0'){ // error couldn't get image from url
              // console.log(small_name + ' 0')
              // list[i].icon = false;
              // list[i].icon = this.icon_url + small_name + '.com'

              this.http.get(full_icon_url_com).subscribe(
                result => {
                  console.log('result: ' + result)
                }, (err) => {
                  // console.log('err com: ')
                  // console.log(err)
                  if(err.status == '200'){
                    list[i].icon = full_icon_url_com;
                  }else if(err.status == '0'){
                    list[i].icon = false;
                  }
                });
            }
          });
    }
    this.friends = list
    console.log(this.friends)
    // this.upload_data()
  }

  get_icon_single(): any{
    let small_name = this.logo_text.toLowerCase();
    let full_icon_url = this.icon_url + small_name + '.ca'
    let full_icon_url_com = this.icon_url + small_name + '.com'
    // console.log(full_icon_url)
    this.http.get(full_icon_url).subscribe(
      result => {
        console.log('result: ' + result)
      }, (err) => {
        // console.log(err)
        if(err.status == '200'){
          return full_icon_url
        }else if(err.status == '501'){ // error couldn't get image from url
          return  this.icon_url + small_name + '.com'
        }else if(err.status == '0'){ // error couldn't get image from url
          // console.log(small_name + ' 0')
          // list[i].icon = false;
          // list[i].icon = this.icon_url + small_name + '.com'

          this.http.get(full_icon_url_com).subscribe(
            result => {
              console.log('result: ' + result)
            }, (err) => {
              // console.log('err com: ')
              // console.log(err)
              if(err.status == '200'){
                return  full_icon_url_com;
              }else if(err.status == '0'){
                return false;
              }
            });
        }
      });
  }

  async loadWorker() {
    this.worker = await createWorker({
      logger: progress => {
        console.log(progress);
        if (progress.status == 'recognizing text') {
          // this.captureProgress = parseInt('' + progress.progress * 100);
          this.captureProgress = progress.progress
        }
      }
    });
    await this.worker.load();
    await this.worker.loadLanguage('fin');
    await this.worker.initialize('fin');
    await this.worker.setParameters({
      tessedit_pageseg_mode: PSM.SPARSE_TEXT,
    });

    console.log('Finish')
    this.workerReady = true;
  }

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    console.log('image: ', image);
    this.image = image.dataUrl;
    this.recognizeImage();
  }

  async recognizeImage() {

    this.ionLoader.showLoader().then(()=>{
      this.show_progress = true;
    });
    // this.image = './assets/imgs/0001.jpg' // debug remove later
    this.image = './assets/imgs/0002.jpg' // debug remove later
    // this.image = './assets/imgs/0003.jpeg' // debug remove later
    // this.image = './assets/imgs/0005.jpg' // debug remove later
    // this.image = './assets/imgs/0009.jpg' // debug remove later
    // this.image = './assets/imgs/0007.jpg' // debug remove later
    // this.image = 'https://tesseract.projectnaptha.com/img/eng_bw.png'
    const result = await this.worker.recognize(this.image);

    const result_logo = await this.worker.recognize(this.image,
      {rectangle: { top: 0, left: 0, width: 1000, height: 500 }
      });

    console.log(result);

    this.result_array = result.data.lines
    for (let item of this.result_array) { // loop through the result and remove text that has confidence < 60
      if (item.confidence > 60) {
        console.log(item.text)
        this.ocrResult += item.text
      }
    }

    //get subtotal
    // the pattern
    const regExp = new RegExp('(\\bSubtotal:?\\n\\n\\b)(\\d{1,3}(?:,?\\d{3})*\\.\\d{2})')
    const regExpGST = new RegExp('(\\bGST\\b[\\/]?(\\w.*)?\\n\\n)(\\d{1,3}(?:,?\\d{3})*\\.\\d{2})');
    // pattern for small receipt
    const regExpTotal = new RegExp('(\\bTotal\\n\\n\\$?\\b)(\\d{1,3}(?:,?\\d{3})*\\.\\d{2})');

    if(this.ocrResult.match(regExp)){ // if subtotal word found
      this.subtotal_amount = this.ocrResult.match(regExp)[2];
      if(this.ocrResult.match(regExpGST)){ // check for gst word
        this.gst_amount = this.ocrResult.match(regExpGST)[3]
      }
      this.total_amount = (parseFloat(this.subtotal_amount) + parseFloat(this.gst_amount)).toString();
    }else if(this.ocrResult.match(regExpTotal)){ // if total found means small receipt
      console.log(this.ocrResult.match(regExpTotal)[2]);
      this.total_amount = this.ocrResult.match(regExpTotal)[2];
      // get subtotal from total calculations
      let total_float = parseFloat(this.total_amount);
      let subtotal_float = (total_float) - ((total_float / (1 + 0.05)) * 0.05);
      let gst_float = Math.round(total_float - subtotal_float);
      this.subtotal_amount = subtotal_float.toFixed(2).toString();
      this.gst_amount = gst_float.toFixed(2).toString();
    }

    // get logo text
    let logo_text = result_logo.data.lines[0].text;
    if (logo_text.includes('TRANSACTION RECORD')) { // if this word on logo skip to next line
      let index = 1;
      while(result_logo.data.lines[index].confidence < 60){
        index++;
      }
      logo_text = result_logo.data.lines[index].text;
    }
    logo_text = logo_text.replace('\n', '');
    this.logo_text = logo_text

    // log the results
    console.log('LOGO ==> ' + logo_text)
    console.log('Subtotal ==> ' + this.subtotal_amount)
    console.log('GST ==> ' + this.gst_amount)
    console.log('Total ==> ' + this.total_amount)
    console.log('User id ==> ' + this.user_id)

    this.upload_data()

    this.show_progress = false;
    this.ionLoader.dismissLoader();
    await this.worker.terminate();
    // await this.router.navigateByUrl("/scan", { skipLocationChange: true });
    // window.location.reload();

  }

  upload_data(){
    // console.log(this.friends[this.friends.length - 1].id)
    let formData = new FormData();
    formData.append('logo_text', this.logo_text);
    formData.append('subtotal', this.subtotal_amount);
    formData.append('gst', this.gst_amount);
    formData.append('total', this.total_amount);
    formData.append('user_id', this.user_id);

    this.http.post(this.site_url + '/upload_receipt.php', formData).subscribe(
      data => {
        console.log(data)
        this.friends.reverse();

        this.friends.push(
          {
            "id": data['inserted_id'],
            "icon": this.get_icon_single(),
            "name": this.logo_text,
            "amount_before_tax": this.subtotal_amount,
            "amount_after_tax": this.total_amount,
          });
        this.friends.reverse();

      }, error => {
        console.log(error)
      });

    console.log(this.friends)
  }

}

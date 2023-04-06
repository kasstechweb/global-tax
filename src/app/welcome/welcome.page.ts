import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {Browser} from "@capacitor/browser";
import {StorageService} from "../services/storage.service";

// import {createWorker} from 'tesseract.js'
// import {Camera, CameraResultType, CameraSource} from '@capacitor/camera'

// import * as Tesseract from "tesseract.js";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  // worker: Tesseract.Worker;
  // workerReady = false;
  // image = 'https://tesseract.projectnaptha.com/img/eng_bw.png'
  // ocrResult = '';
  // captureProgress = 0;

  private name: string;
  constructor(
    private dataservice: DataService,
    private storage: StorageService,
  ) {
    // this.name = this.dataservice.getData('name');
    // this.loadWorker();
    this.storage.getStorageData('fname').then(
      res => {
        if (res){
          this.name = JSON.parse(res);
          // console.log(res);
        }
      });
  }

  ngOnInit() {
  }

  async openPayment() {
    await Browser.open({ url: 'https://employerservice.ca/gtaxapp/payment/' });
  }

  async openBooking() {
    await Browser.open({ url: 'https://www.global-tax.ca/' });
  }



  async openPrivacy() {
    await Browser.open({ url: 'https://employerservice.ca/gtaxapp/privacy.html' });
  }

  // async loadWorker() {
  //   this.worker = await createWorker({
  //     logger: progress => {
  //       console.log(progress);
  //       if (progress.status == 'recognizing text') {
  //         this.captureProgress = parseInt('' + progress.progress * 100);
  //       }
  //     }
  //   });
  //   await this.worker.load();
  //   await this.worker.loadLanguage('eng');
  //   await this.worker.initialize('eng');
  //   console.log('Finish')
  //   this.workerReady = true;
  // }
  //
  // async captureImage() {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: CameraResultType.DataUrl,
  //     source: CameraSource.Camera
  //   });
  //   console.log('image: ', image);
  //   this.image = image.dataUrl;
  //
  // }
  //
  // async recognizeImage() {
  //   const result = await this.worker.recognize(this.image);
  //   console.log(result);
  //   this.ocrResult = result.data.text;
  // }

}

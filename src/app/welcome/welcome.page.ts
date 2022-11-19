import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Browser} from "@capacitor/browser";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  private name: string;
  constructor(
    private dataservice: DataService,
    private storage: StorageService,
  ) {
    // this.name = this.dataservice.getData('name');
    this.storage.getStorageData('name').then(
      res => {
        if (res){
          this.name = JSON.parse(res);
          console.log(res);
        }else {
          console.log('error read from storage')
        }
      });
  }

  ngOnInit() {
  }

  async openPayment() {
    await Browser.open({ url: 'https://employerservice.ca/gtaxapp/payment/' });
  }

}

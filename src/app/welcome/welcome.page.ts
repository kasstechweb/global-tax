import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Browser} from "@capacitor/browser";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  private name: string;
  constructor(
    private dataservice: DataService,
  ) {
    this.name = this.dataservice.getData('name');
  }

  ngOnInit() {
  }

  async openPayment() {
    await Browser.open({ url: 'https://employerservice.ca/gtaxapp/payment/' });
  }

}

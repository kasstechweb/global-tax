import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";

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

}

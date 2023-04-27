import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  site_url = 'https://localhost/gtax_receipt_scanner';
  icon_url = 'https://logo.clearbit.com/'
  name: string;
  subtotal_amount: string;
  gst_amount: string;
  total_amount: string;
  receipt_image: string;

  id: string;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}

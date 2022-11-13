import {Component, OnInit} from '@angular/core';

// import {ApiError, Client, Environment} from "square";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastController} from "@ionic/angular";
import {Browser} from "@capacitor/browser";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  //
  // private locationsApi: any;


  constructor(
    public http: HttpClient,
    private toastController: ToastController,
  ) {
    this.testBrowser()
    // this.testSquare()
  }

  ngOnInit() {
  }

  async testSquare() {
    const headers = {
      'Square-Version': '2022-10-19',
      'Authorization': 'Bearer EAAAEIyqk61plvLJcSF-SsC_bbKJAqUfOkGlUN9bbBUSsqjeC80c3qwDEltvZRkc',
    };

    // var headers = new HttpHeaders();
    // headers.append("Content-Type", 'application/json');
    // headers.append("Square-Version", '2022-10-19');
    // headers.append('Authorization', 'Bearer ' + 'EAAAEIyqk61plvLJcSF-SsC_bbKJAqUfOkGlUN9bbBUSsqjeC80c3qwDEltvZRkc' );

    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    let postData = {
      "quick_pay": {
        "name": "payment from api",
        "price_money": {
          "amount": 500,
          "currency": "USD"
        },
        "location_id": "LAR3R0NG128QD"
      }
    }
    this.http.post('https://connect.squareupsandbox.com/v2/online-checkout/payment-links', postData, requestOptions).subscribe(
      data => {
        console.log(data);
        this.presentToast(data['payment_link']['url']);
      }, error => {
        console.log('error');
        this.presentToast('err');

      });
  }

  async testBrowser() {
    await Browser.open({ url: 'http://capacitorjs.com/' });
  }

  // async getLocations() {
  //   try {
  //     let listLocationsResponse = await this.locationsApi.listLocations();
  //
  //     let locations = listLocationsResponse.result.locations;
  //
  //     locations.forEach(function (location) {
  //       console.log(
  //         location.id + ": " +
  //         location.name +", " +
  //         location.address.addressLine1 + ", " +
  //         location.address.locality
  //       );
  //     });
  //   } catch (error) {
  //     if (error instanceof ApiError) {
  //       error.result.errors.forEach(function (e) {
  //         console.log(e.category);
  //         console.log(e.code);
  //         console.log(e.detail);
  //       });
  //     } else {
  //       console.log("Unexpected error occurred: ", error);
  //     }
  //   }
  // };

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

}

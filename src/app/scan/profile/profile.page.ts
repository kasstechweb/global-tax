import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {AlertController, NavController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {IonLoaderService} from "../../services/ion-loader.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  stored_email: string;
  fname: string;
  lname: string;

  // site_url = 'https://localhost/gtax_receipt_scanner';
  site_url = 'https://employerservice.ca/gtax_receipt_scanner';

  constructor(
    public http: HttpClient,
    private ionLoader: IonLoaderService,
    private toast: ToastService,
    private storage: StorageService,
    private alertController:AlertController,
    private navController: NavController,
  ) { }

  ngOnInit() {
    this.storage.getStorageData('email').then(
      res => {
        if (res){
          this.stored_email = JSON.parse(res);
          // console.log(this.stored_email);
        }
      });

    this.storage.getStorageData('fname').then(
      res => {
        if (res){
          this.fname = JSON.parse(res);
          // console.log(this.stored_email);
        }
      });

    this.storage.getStorageData('lname').then(
      res => {
        if (res){
          this.lname = JSON.parse(res);
          // console.log(this.stored_email);
        }
      });
  }

  logout(){
    console.log('test')
    this.storage.removeStorageData('scan_logged_in');
    this.navController.navigateRoot(['/welcome']);
  }

  async delete_user() {

    // If my condition is true.
    if (true) {
      // show the user a confirm alert.
      const confirmation = await this.warn();
      if (confirmation){
        // confirmation logic
        this.ionLoader.showLoader().then(()=> {
          let formData = new FormData();
          // formData.append('password', this.loginForm.value['password']);
          formData.append('test', 'test');
          formData.append('email', this.stored_email);
          console.log(this.stored_email)

          this.http.post(this.site_url + '/delete_user_data.php', formData).subscribe(
            data => {
              this.ionLoader.dismissLoader();
              console.log(data);
              this.toast.presentToast(data['_body']);
              if (data['code'] == '1') {
                // this.loginForm.reset();
                this.storage.removeStorageData('scan_logged_in');
                this.navController.navigateRoot(['/welcome']);
              }
            }, error => {
              console.log(error.error.text);
              // if (error.error.text.includes('Duplicate entry')) {
              //   this.toast.presentToast('An account is already registered with your email address, Please log in.');
              // }
              this.ionLoader.dismissLoader();

              // this.toast.presentToast(error);
              // console.log(error);

            });
        });
        console.log('yes')
      }
      // break out of function since they hit cancel.
      if (!confirmation) return;
    }

    // The user hit Okay, continue with this function.
  }

  async warn() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Are you Sure?',
        message: 'This action will delete all of your data and you will not be able to login again!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: 'Confirm',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }

}

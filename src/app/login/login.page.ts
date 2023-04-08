import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IonLoaderService} from "../services/ion-loader.service";
import {ToastService} from "../services/toast.service";
import {StorageService} from "../services/storage.service";

// import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  stored_email: string;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
  constructor(
    public router: Router,
    public http: HttpClient,
    private ionLoader: IonLoaderService,
    private toast: ToastService,
    private storage: StorageService,
    // public menu: MenuController
  ) {
    // this.storage.getStorageData('scan_logged_in').then(
    // res => {
    //   if (res){
    //     if (JSON.parse(res) == 'True'){
    //       this.router.navigate(['/scan']);
    //     }
    //     // this.stored_email = JSON.parse(res);
    //     // console.log(this.stored_email);
    //     // this.loginForm.controls['email'].setValue(this.stored_email);
    //   }
    // });
    this.storage.getStorageData('email').then(
      res => {
        if (res){
          this.stored_email = JSON.parse(res);
          console.log(this.stored_email);
          this.loginForm.controls['email'].setValue(this.stored_email);
        }
      });
    console.log(this.stored_email);
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('12345', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  ngOnInit() {

  }

  doLogin(): void {
    // console.log('do Log In');
    // this.router.navigate(['app/categories']);
    this.ionLoader.showLoader().then(()=> {
      let formData = new FormData();
      formData.append('password', this.loginForm.value['password']);
      formData.append('email', this.loginForm.value['email']);
      // console.log(this.loginForm.value['password'])

      this.http.post('https://localhost/gtax_receipt_scanner/login.php', formData).subscribe(
        data => {
          this.ionLoader.dismissLoader();
          console.log(data);
          this.toast.presentToast(data['_body']);
          if(data['_body'] == 'Login success.'){
            this.loginForm.reset();
            this.storage.setStorageData('scan_logged_in', 'True');
            this.storage.setStorageData('email', data['email']);

            this.router.navigate(['/scan']);
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
  }

  // goToForgotPassword(): void {
  //   console.log('redirect to forgot-password page');
  // }
  // checkStorage(key){
  //   this.storage.getStorageData(key).then(
  //     res => {
  //       if (res){
  //         this.loginForm.controls[key].setValue(JSON.parse(res));
  //         // console.log(res.key);
  //         // console.log(res);
  //       }
  //     });
  // }
}

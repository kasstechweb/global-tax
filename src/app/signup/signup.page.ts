import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PasswordValidator} from "../validators/password.validator";
import {HttpClient} from "@angular/common/http";
import {IonLoaderService} from "../services/ion-loader.service";
import {ToastService} from "../services/toast.service";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  // site_url = 'https://employerservice.ca/gtax_receipt_scanner';
  site_url = 'https://localhost/gtax_receipt_scanner';
  signupForm: FormGroup;
  matching_passwords_group: FormGroup;
  stored_email: string;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'Password mismatch' }
    ],
    'verify_client_id': [
      { type: 'required', message: 'Verify Client ID is required.' },
    ],
    'verify_auth_username': [
      { type: 'required', message: 'Verify Auth Username id is required.' },
    ],
    'verify_auth_apikey': [
      { type: 'required', message: 'Verify Auth API Key is required.' },
    ],
  };
  constructor(
    public router: Router,
    public http: HttpClient,
    private ionLoader: IonLoaderService,
    private toast: ToastService,
    private storage: StorageService,
    // public modalController: ModalController,
  ) {
    this.storage.getStorageData('email').then(
      res => {
        if (res){
          this.stored_email = JSON.parse(res);
          console.log(this.stored_email);
          this.signupForm.controls['email'].setValue(this.stored_email);
        }
      });

    this.matching_passwords_group = new FormGroup({
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      'confirm_password': new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areNotEqual(formGroup);
    });

    this.signupForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'verify_client_id': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'verify_auth_username': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'verify_auth_apikey': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'matching_passwords': this.matching_passwords_group
    });
  }

  ngOnInit() {
  }

  doSignup(): void {
    // console.log('do sign up');
    // this.router.navigate(['app/categories']);
    this.ionLoader.showLoader().then(()=> {
      let formData = new FormData();
      formData.append('email', this.signupForm.value['email']);
      formData.append('password', this.matching_passwords_group.value['password']);

      formData.append('verify_client_id', this.signupForm.value['verify_client_id']);
      formData.append('verify_auth_username', this.signupForm.value['verify_auth_username']);
      formData.append('verify_auth_apikey', this.signupForm.value['verify_auth_apikey']);
      // console.log(this.matching_passwords_group.value['password'])
      // files.forEach((file) => {
      //   formData.append('files[]', file.rawFile, file.name);
      // });

      // store user data locally
      // this.storage.setStorageData('fname', this.signupForm.value['fname']);
      // this.storage.setStorageData('lname', this.signupForm.value['lname']);
      // this.storage.setStorageData('email', this.signupForm.value['email']);
      // this.storage.setStorageData('phone', this.signupForm.value['phone']);
      // this.storage.setStorageData('company', this.signupForm.value['company']);
      // this.storage.setStorageData('gstnumber', this.signupForm.value['gstnumber']);
      // POST formData to Server

      // console.log(formData.getAll('files[]'));
      // console.log(formData.getAll('email'));

      this.http.post(this.site_url +'/registration.php', formData).subscribe(
        data => {
          this.ionLoader.dismissLoader();
          console.log(data);
          this.toast.presentToast(data['_body']);
          if(data['_body'] == 'You are registered successfully.'){
            this.signupForm.reset();
            this.router.navigate(['/login']);
            // this.fileField.clearQueue();
          }
        }, error => {
          // console.log(error);
          if (error.error.text.includes('Duplicate entry')) {
            this.toast.presentToast('An account is already registered with your email address, Please log in.');
          }
          this.ionLoader.dismissLoader();

          // this.toast.presentToast(error);
          // console.log(error);

        });
    });

  }

}

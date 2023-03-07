import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MultiFileUploadComponent} from "../components/multi-file-upload/multi-file-upload.component";
import {IonLoaderService} from "../services/ion-loader.service";
import {ToastService} from "../services/toast.service";

import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-business-taxes',
  templateUrl: './business-taxes.page.html',
  styleUrls: ['./business-taxes.page.scss'],
})
export class BusinessTaxesPage implements OnInit {
  @ViewChild(MultiFileUploadComponent) fileField: MultiFileUploadComponent;
  signupForm: FormGroup;
  matching_passwords_group: FormGroup;
  email: string;

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
    'phone': [
      {type: 'required', message: 'Phone is required.'},
      { type: 'pattern', message: 'Enter a valid Phone number.' }
    ],
    'fname': [
      {type: 'required', message: 'First name is required.'},
      { type: 'pattern', message: 'Enter a valid first name.' }
    ],
    'lname': [
      {type: 'required', message: 'Last name is required.'},
      { type: 'pattern', message: 'Enter a valid last name.' }
    ],
    'company': [
      {type: 'required', message: 'Company is required.'},
    ],
    'bnumber': [
      {type: 'required', message: 'Business number is required.'},
      { type: 'NotEqual', message: 'Business number must be 9 numbers.' },
      { type: 'pattern', message: 'Enter a valid Business number.' }
      // { type: 'maxLength', message: 'SIN must be 9 numbers.' }
    ],
    'msg': [
      { type: 'required', message: 'Message is required.' }
    ],
  };

  constructor(
    public router: Router,
    private toast: ToastService,
    public http: HttpClient,
    private ionLoader: IonLoaderService,
    private storage: StorageService,
  ) {
    this.signupForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'phone': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9_.+-]+$'),
      ])),
      'company': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'msg': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'fname': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]+$')
      ])),
      'lname': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]+$')
      ])),
      'bnumber': new FormControl('', Validators.compose([

        // Validators.maxLength(9),
        // Validators.minLength(9),
        Validators.required,
        this.isValidSINNumber.bind(this),
        Validators.pattern('^[0-9]+$'),
      ])),
      // 'matching_passwords': this.matching_passwords_group
    });
  }

  isValidSINNumber(fieldControl: FormControl) {
    if(this.signupForm) {
      if (fieldControl.value != null){
        return fieldControl.value.toString().length >= 9 && fieldControl.value.toString().length <= 9 || fieldControl.value.toString().length == 0 ? null : {
          NotEqual: true
        };
      }
    }
  }

  ngOnInit() {
    //check if values in storage
    this.checkStorage('fname');
    this.checkStorage('lname');
    this.checkStorage('email');
    this.checkStorage('phone');
    this.checkStorage('company');
    this.checkStorage('bnumber');
    // this.signupForm.controls['name'].setValue('test');
  }

  sendMessage(): void {
    if(!this.signupForm.valid){
      this.signupForm.controls['fname'].markAsTouched();
      this.signupForm.controls['lname'].markAsTouched();
      this.signupForm.controls['email'].markAsTouched();
      this.signupForm.controls['phone'].markAsTouched();
      this.signupForm.controls['msg'].markAsTouched();
      this.signupForm.controls['company'].markAsTouched();
      this.signupForm.controls['bnumber'].markAsTouched();
      // console.log('test');
      this.toast.presentToast('Please add the missing data and try again.');
    }else {
      this.ionLoader.showLoader();
      let files = this.fileField.getFiles();

      let formData = new FormData();
      formData.append('fname', this.signupForm.value['fname']);
      formData.append('lname', this.signupForm.value['lname']);
      formData.append('email', this.signupForm.value['email']);
      formData.append('phone', this.signupForm.value['phone']);
      formData.append('company', this.signupForm.value['company']);
      formData.append('bnumber', this.signupForm.value['bnumber']);
      formData.append('msg', this.signupForm.value['msg']);

      files.forEach((file) => {
        formData.append('files[]', file.rawFile, file.name);
      });

      // store user data locally
      this.storage.setStorageData('fname', this.signupForm.value['fname']);
      this.storage.setStorageData('lname', this.signupForm.value['lname']);
      this.storage.setStorageData('email', this.signupForm.value['email']);
      this.storage.setStorageData('phone', this.signupForm.value['phone']);
      this.storage.setStorageData('company', this.signupForm.value['company']);
      this.storage.setStorageData('bnumber', this.signupForm.value['bnumber']);
      // POST formData to Server

      // console.log(formData.getAll('files[]'));
      // console.log(formData.getAll('email'));

      this.http.post('https://employerservice.ca/gtaxapp/send_business.php', formData).subscribe(
        data => {
          this.ionLoader.dismissLoader();
          // console.log(data['_body']);
          this.toast.presentToast(data['_body']);
          if(data['_body'] == 'Message has been sent'){
            // this.signupForm.reset();
            this.fileField.clearQueue();
          }
        }, error => {
          // console.log('error');
          this.ionLoader.dismissLoader();
          this.toast.presentToast('Unable to send message, please try again later.');
          // console.log(error);

        });
    }
  }

  checkStorage(key){
    this.storage.getStorageData(key).then(
      res => {
        if (res){
          this.signupForm.controls[key].setValue(JSON.parse(res));
          // console.log(res.key);
          // console.log(res);
        }
      });
  }

}

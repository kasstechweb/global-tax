import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {MultiFileUploadComponent} from "../components/multi-file-upload/multi-file-upload.component";
import {IonLoaderService} from "../services/ion-loader.service";

@Component({
  selector: 'app-existing-client',
  templateUrl: './existing-client.page.html',
  styleUrls: ['./existing-client.page.scss'],
})
export class ExistingClientPage implements OnInit {
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
    'name': [

    ],
    'company': [

    ],
    'msg': [
      { type: 'required', message: 'Message is required.' }
    ],
  };

  constructor(
    public router: Router,
    private toastController: ToastController,
    public http: HttpClient,
    private ionLoader: IonLoaderService,
  ) {
    this.signupForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'phone': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'company': new FormControl('', Validators.compose([

      ])),
      'msg': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'name': new FormControl('', Validators.compose([

      ])),
      // 'matching_passwords': this.matching_passwords_group
    });
  }

  ngOnInit() {
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  sendMessage(): void {
    if(!this.signupForm.valid){
      this.signupForm.controls['email'].markAsTouched();
      this.signupForm.controls['phone'].markAsTouched();
      this.signupForm.controls['msg'].markAsTouched();
      console.log('test');
      this.presentToast('Please add the missing data and try again.');
    }else {
      this.ionLoader.showLoader();
      let files = this.fileField.getFiles();

      let formData = new FormData();
      formData.append('name', this.signupForm.value['name']);
      formData.append('email', this.signupForm.value['email']);
      formData.append('phone', this.signupForm.value['phone']);
      formData.append('company', this.signupForm.value['company']);
      formData.append('msg', this.signupForm.value['msg']);

      files.forEach((file) => {
        formData.append('files[]', file.rawFile, file.name);
      });
      // POST formData to Server

      // console.log(formData.getAll('files[]'));
      // console.log(formData.getAll('email'));

      this.http.post('https://employerservice.ca/gtaxapp/send.php', formData).subscribe(
        data => {
          this.ionLoader.dismissLoader();
          console.log(data['_body']);
          this.presentToast(data['_body']);
          if(data['_body'] == 'Message has been sent'){
            this.signupForm.reset();
            this.fileField.clearQueue();
          }
        }, error => {
          // console.log('error');
          this.ionLoader.dismissLoader();
          this.presentToast('Unable to send message, please try again later.');
          console.log(error);

        });
    }
  }

}

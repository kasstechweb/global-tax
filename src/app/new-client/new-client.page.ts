import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonModal, ToastController} from "@ionic/angular";
import {MultiFileUploadComponent} from "../components/multi-file-upload/multi-file-upload.component";
import { OverlayEventDetail } from '@ionic/core/components';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IonLoaderService} from "../ion-loader.service";

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.page.html',
  styleUrls: ['./new-client.page.scss'],
})
export class NewClientPage implements OnInit{

  @ViewChild(MultiFileUploadComponent) fileField: MultiFileUploadComponent;
  @ViewChild(IonModal) modal: IonModal;
  newClientForm: FormGroup;
  // matching_passwords_group: FormGroup;
  email:string;
  check_marriage = false;
  maritalStatus:string;

  children:any=[];
  moreIndex1:any=0;
  children_names:any=[];
  // doc_add:any=[];
  children_dob:any=[];

  marital_status: Array<string>;

  validation_messages = {
    'email': [
    { type: 'required', message: 'Email is required.' },
    { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'phone': [
    {type: 'required', message: 'Phone is required.'},
    { type: 'pattern', message: 'Enter a valid Phone number.' }
    ],
    'name': [
    { type: 'required', message: 'Name is required.' },
    ],
    'company': [

    ],
    'msg': [
    { type: 'required', message: 'Message is required.' }
    ],
    'marital_status': [
    {type: 'required', message: 'Marital status is required.'}
    ],
    'spouse_dob': [
    { type: 'required', message: 'Spouse date of birth is required.' }
    ],
    'spouse_name': [
    { type: 'required', message: 'Spouse name is required.'},
    { type: 'pattern', message: 'Enter a valid name.' }
    ],
    'spouse_sin': [
    {type: 'required', message: 'Spouse SIN # is required.'},
    { type: 'NotEqual', message: 'SIN must be 9 numbers.' },
      // { type: 'maxLength', message: 'SIN must be 9 numbers.' }
    ],
    'address': [
    { type: 'required', message: 'Address is required.' }
    ],
    'sin': [
    { type: 'required', message: 'SIN # is required.' },
    { type: 'NotEqual', message: 'SIN # must be 9 numbers.' },
    ],
    'dob': [
    { type: 'required', message: 'Date of birth is required.' }
    ],
  };

  constructor(
    private alertController: AlertController,
    public router: Router,
    private toastController: ToastController,
    public http: HttpClient,
    private ionLoader: IonLoaderService,
  ) {
    this.newClientForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    'phone': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
    ])),
    'company': new FormControl('', Validators.compose([

    ])),
    'msg': new FormControl('', Validators.compose([
      Validators.required,
    ])),
    'name': new FormControl('', Validators.compose([
      Validators.required,
    ])),
    'spouse_dob': new FormControl('', Validators.compose([
      Validators.required,
    ])),
    'marital_status': new FormControl('', Validators.compose([
      Validators.required,
    ])),
    'spouse_name': new FormControl('', Validators.compose([
      Validators.required,
    ])),
    'spouse_sin': new FormControl('', Validators.compose([

      // Validators.maxLength(9),
      // Validators.minLength(9),
      this.isValidSINNumber.bind(this),
        Validators.required,
    ])),
    'address': new FormControl('', Validators.compose([
      Validators.required,
    ])),
    'sin': new FormControl('', Validators.compose([
      Validators.required,
        this.isValidSINNumber.bind(this),
    ])),
    'dob': new FormControl('', Validators.compose([
      Validators.required,
    ])),
      // 'matching_passwords': this.matching_passwords_group
    });
  }

  isValidSINNumber(fieldControl: FormControl) {
    if(this.newClientForm) {
      if (fieldControl.value != null){
        return fieldControl.value.toString().length >= 9 && fieldControl.value.toString().length <= 9 ? null : {
          NotEqual: true
        };
      }
    }
  }

  ngOnInit() {
    this.marital_status = [
      'Married',
      'Widowed',
      'Separated',
      'Divorced',
      'Single'
  ];
    // this.validationsForm = new FormGroup({

    //   'gender': new FormControl(this.genders[0]),
    // });
  }

  checkMarriage(value){
    // console.log(value);
    if (value == 'Married') {
    // console.log('married');
    this.check_marriage = true;
    }else {
      this.check_marriage = false;
    }
    this.maritalStatus = value;
  }

  async check_kids() {
    const alert = await this.alertController.create({
      header: 'How many children?',
      inputs: [{
        name: 'children_num',
        type: 'number',
        placeholder: 'Children number*',
        min: 1,
          max: 20,
          handler: () => {
          console.log()
        }
    }],
      buttons: [
        {
          text: 'Confirm',
          handler: (alertData) => { //takes the data
            // console.log(alertData.children_num);
            for(let i = 1; i <= alertData.children_num; i++){
              this.add_delete_children(1);
            }
            // this.add_delete_children(1);
          }},
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          // this.handlerMessage = 'Alert canceled';
          // this.modal.dismiss(null, 'cancel');
          // this.cancelModal();

        }}
      ],
    });

    await alert.present();
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
    // console.log(this.check_marriage);
    if (this.check_marriage == false){
      this.newClientForm.get('spouse_name').clearValidators();
      this.newClientForm.get('spouse_name').updateValueAndValidity();
      this.newClientForm.get('spouse_sin').clearValidators();
      this.newClientForm.get('spouse_sin').updateValueAndValidity();
      this.newClientForm.get('spouse_dob').clearValidators();
      this.newClientForm.get('spouse_dob').updateValueAndValidity();
    }
    if(!this.newClientForm.valid){
      this.newClientForm.controls['name'].markAsTouched();
      this.newClientForm.controls['email'].markAsTouched();
      this.newClientForm.controls['phone'].markAsTouched();
      this.newClientForm.controls['msg'].markAsTouched();
      this.newClientForm.controls['marital_status'].markAsTouched();
      this.newClientForm.controls['spouse_name'].markAsTouched();
      this.newClientForm.controls['spouse_sin'].markAsTouched();
      this.newClientForm.controls['spouse_dob'].markAsTouched();
      this.newClientForm.controls['address'].markAsTouched();
      this.newClientForm.controls['sin'].markAsTouched();
      this.newClientForm.controls['dob'].markAsTouched();
      // console.log('test');
      this.presentToast('Please add the missing data and try again.');
    }else {
      this.ionLoader.showLoader();
      let files = this.fileField.getFiles();

      let formData = new FormData();
      formData.append('name', this.newClientForm.value['name']);
      formData.append('email', this.newClientForm.value['email']);
      formData.append('phone', this.newClientForm.value['phone']);
      formData.append('company', this.newClientForm.value['company']);
      formData.append('msg', this.newClientForm.value['msg']);
      formData.append('marital_status', this.maritalStatus);
      formData.append('spouse_name', this.newClientForm.value['spouse_name']);
      formData.append('spouse_sin', this.newClientForm.value['spouse_sin']);
      formData.append('spouse_dob', this.newClientForm.value['spouse_dob']);
      formData.append('address', this.newClientForm.value['address']);
      formData.append('sin', this.newClientForm.value['sin']);
      formData.append('dob', this.newClientForm.value['dob']);

      // for (let i = 0; i < this.children_names.length; i++) {
      // this.children_names = this.children_names.shift();
      formData.append('children_names', JSON.stringify(this.children_names));
      // }
      // formData.append('children_names', this.children_names);
      formData.append('children_dob', JSON.stringify(this.children_dob));

      files.forEach((file) => {
        formData.append('files[]', file.rawFile, file.name);
      });
      // POST formData to Server

      console.log(this.children_names);
      console.log(formData.getAll('children_names'));

      this.http.post('https://employerservice.ca/gtaxapp/send_new.php', formData).subscribe(
      data => {
        this.ionLoader.dismissLoader();
        console.log(data['_body']);
        this.presentToast(data['_body']);
        if(data['_body'] == 'Message has been sent'){
          this.newClientForm.reset();
          this.fileField.clearQueue();
        }
      }, error => {
        // console.log('error');
        this.ionLoader.dismissLoader();
        this.presentToast('Unable to send message, please try again later.');
        // console.log(error);

      });

    }
    // console.log(this.children);
    // console.log(this.children_names);
    // console.log(this.children_dob);
    // console.log(this.newClientForm.getError('dob'));
  }

  // //////////////////////////////////// add delete cards ////////////////////////////////////


  add_delete_children(val1){
    if(val1==1)
    {
      this.children.push(this.moreIndex1);
      this.moreIndex1++;
    }
    else{
      this.children.pop(this.moreIndex1);
      this.moreIndex1--;
    }
  }
  // //////////////////////////////////// add delete cards ////////////////////////////////////
  /////////////////////////////////// Modal ///////////////////////
  cancelModal() {
    this.modal.dismiss(null, 'cancel');
    // this.moreIndex1 = 0;
    // this.add_delete_children(0);
  }

  confirmModal() {
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    // this.message = `Hello, ${ev.detail.data}!`;
  }
}
///////////////////////////////////// End modal ///////////////////////////


}
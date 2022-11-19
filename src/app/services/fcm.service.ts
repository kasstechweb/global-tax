import { Injectable } from '@angular/core';


import {Capacitor} from "@capacitor/core";

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import {ToastService} from "./toast.service";
import {StorageService} from "./storage.service";
import {FCM} from "@capacitor-community/fcm";

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    private toast: ToastService,
    private storage: StorageService,
  ) { }

  initPush() {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    if (isPushNotificationsAvailable) {
      this.registerPush();
      // now you can subscribe to a specific topic
      FCM.subscribeTo({ topic: "all" });
    }
  }

  private registerPush() {
    // console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
        // this.storage.setStorageData('notifications', token.value);

      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        // alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // alert('Push received: ' + JSON.stringify(notification));
        // this.toast.presentToast(JSON.stringify(notification.id));
        // this.toast.presentToast(JSON.stringify(notification));
        // this.storage.setStorageData('notifications', JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }


}

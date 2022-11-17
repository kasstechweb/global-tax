import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { PushNotifications } from '@capacitor/push-notifications';
import {Capacitor} from "@capacitor/core";

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    private router: Router
  ) { }

  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive) {
    //     // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
        console.log('No permission for push granted');
      }
    })



    PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
    });

    PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
    // PushNotifications.addListener('registration', token => {
    //   console.info('Registration token: ', token.value);
    // });
    // const addListeners = async () => {
    //   await PushNotifications.addListener('registration', token => {
    //     console.info('Registration token: ', token.value);
    //   });
    //
    //   await PushNotifications.addListener('registrationError', err => {
    //     console.error('Registration error: ', err.error);
    //   });
    //
    //   await PushNotifications.addListener('pushNotificationReceived', notification => {
    //     console.log('Push notification received: ', notification);
    //   });
    //
    //   await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    //     console.log('Push notification action performed', notification.actionId, notification.inputValue);
    //   });
    // }

    // const registerNotifications = async () => {
    //   let permStatus = await PushNotifications.checkPermissions();
    //
    //   if (permStatus.receive === 'prompt') {
    //     permStatus = await PushNotifications.requestPermissions();
    //   }
    //
    //   if (permStatus.receive !== 'granted') {
    //     throw new Error('User denied permissions!');
    //   }
    //
    //   await PushNotifications.register();
    // }

    // const getDeliveredNotifications = async () => {
    //   const notificationList = await PushNotifications.getDeliveredNotifications();
    //   console.log('delivered notifications', notificationList);
    // }
  }


}

import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { Notification, NotificationOpen } from 'react-native-firebase/notifications';
import { NavigationContainerComponent } from 'react-navigation';
import CentralServerProvider from '../provider/CentralServerProvider';

export default class NotificationManager {
  private static notificationManager: NotificationManager;
  private token: string;
  private navigation: NavigationContainerComponent;
  private removeNotificationDisplayedListener: () => any;
  private removeNotificationListener: () => any;
  private removeNotificationOpenedListener: () => any;
  private removeTokenRefreshListener: () => any;
  private centralServerProvider: CentralServerProvider;

  public static getInstance(): NotificationManager {
    if (!this.notificationManager) {
      this.notificationManager = new NotificationManager();
    }
    return this.notificationManager;
  }

  public setCentralServerProvider(centralServerProvider: CentralServerProvider) {
    this.centralServerProvider = centralServerProvider;
  }

  public async initialize(navigation: NavigationContainerComponent) {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions
      console.log('====================================');
      console.log('NOTIF: USER HAS PERMISSION');
      console.log('====================================');
    } else {
      // user doesn't have permission
      console.log('====================================');
      console.log('NOTIF: USER HAS NO PERMISSION!!!!');
      console.log('====================================');
      // Request permission
      try {
        await firebase.messaging().requestPermission();
        // User has authorised
      } catch (error) {
        // User has rejected permissions
      }
    }
    // // Keep    console.log("NOTIF TOKEN");
    // console.log("INIT NOTIFICATION");
    // this.navigation = navigation;
    // // PushNotificationIOS.addEventListener('register', (token: string) => {
    // //   console.log("NOTIF TOKEN IOS");
    // //   console.log(token);
    // //   this.token = token;
    // // });
    // // Init
    // PushNotification.configure({
    //   // (optional) Called when Token is generated (iOS and Android)
    //   onRegister: this.onRegister,
    //   // (required) Called when a remote or local notification is opened or received
    //   onNotification: this.onNotification,
    //   // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    //   senderID: "49073993741",
    //   // IOS ONLY (optional): default: all - Permissions to register.
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true
    //   },
    //   // Should the initial notification be popped automatically
    //   popInitialNotification: true,
    //   /**
    //    * (optional) default: true
    //    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    //    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    //    */
    //   requestPermissions: true
    // });
  }

  public async start() {
    this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      console.log('====================================');
      console.log('NOTIFICATION: onNotificationDisplayed');
      console.log(notification);
      console.log('====================================');
    });
    this.removeNotificationListener = firebase.notifications().onNotification((notification: Notification) => {
      // Process your notification as required
      console.log('====================================');
      console.log('NOTIFICATION: onNotification');
      console.log(notification);
      console.log('====================================');
    });
    this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
      console.log('====================================');
      console.log('NOTIFICATION: onNotificationOpened');
      console.log(action);
      console.log(notification);
      console.log('====================================');
    });
    this.removeTokenRefreshListener = firebase.messaging().onTokenRefresh(async (newFcmToken) => {
      // Process your token as required
      console.log('====================================');
      console.log('NOTIFICATION: onTokenRefresh');
      console.log(newFcmToken);
      this.token = newFcmToken;
      console.log('====================================');
      try {
        // Save the User's token
        if (this.centralServerProvider.isUserConnected()) {
          console.log('====================================');
          console.log('Save TOKEN');
          console.log('====================================');
          await this.centralServerProvider.saveUserMobileToken({
            id: this.centralServerProvider.getUserInfo().id,
            mobileToken: this.getToken(),
            mobileOS: this.getOs()
          });
        }
      } catch (error) {
        // tslint:disable-next-line: no-console
        console.log('Error saving Mobile Token:', error);
      }
    });
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      // user has a device token
      console.log('====================================');
      console.log('NOTIFICATION: Initial Token');
      console.log(fcmToken);
      console.log('====================================');
      this.token = fcmToken;
    }
  }

  public async stop() {
    this.removeNotificationDisplayedListener();
    this.removeNotificationListener();
    this.removeNotificationOpenedListener();
    this.removeTokenRefreshListener();
  }

  public getToken(): string {
    return this.token;
  }

  public getOs(): string {
    return Platform.OS;
  }

  public async processNotification() {
    // let notification;
    // console.log("processNotification");
    // // Check if active
    // if (this.isActive()) {
    //   console.log("processNotification - active");
    //   // Process the notifications
    //   while ((notification = notifications.splice(0, 1)[0]) !== undefined) {
    //     console.log("processNotification - notification");
    //     console.log(notification);
    //     // Check if the app was opened
    //     if (notification.foreground) {
    //       console.log("Send Local Notif");
    //       // Yes: meaning user didn't get the notif, then show a local one
    //       this.sendLocalNotification(notification);
    //     } else {
    //       console.log("Remote Notif: Navigate");
    //       // No: meaning the user got the notif and clicked on it, then navigate to the right screen
    //       // User must be logged and Navigation available
    //       if (!(await _provider.isUserConnectionValid()) || !this.navigation) {
    //         return;
    //       }
    //       // Text?
    //       if (typeof notification.extraData === "string") {
    //         // Convert ot JSon
    //         notification.extraData = JSON.parse(notification.extraData);
    //       }
    //       // Check the type of notification
    //       if (notification.extraData) {
    //         // Check
    //         switch (notification.extraData.sourceDescr) {
    //           // End of Transaction
    //           case "NotifyEndOfTransaction":
    //           case "NotifyEndOfCharge":
    //           case "NotifyOptimalChargeReached":
    //           case "NotifyChargingStationStatusError":
    //             // Navigate
    //             if (notification.extraData.data && notification.extraData.data.connectorId) {
    //               // Navigate
    //               if (this.navigation) {
    //                 this.navigation.navigate("ChargerDetailsTabs", {
    //                   chargerID: notification.extraData.chargeBoxID,
    //                   connectorID: notification.extraData.data.connectorId
    //                 });
    //               }
    //             }
    //             break;
    //           // Charger just connected
    //           case "NotifyChargingStationRegistered":
    //             // Navigate
    //             if (notification.extraData.data) {
    //               // Navigate
    //               if (this.navigation) {
    //                 this.navigation.navigate("ChargerDetailsTabs", {
    //                   chargerID: notification.extraData.chargeBoxID,
    //                   connectorID: 1
    //                 });
    //               }
    //             }
    //             break;
    //           // Unknown user
    //           case "NotifyUnknownUserBadged":
    //             break;
    //         }
    //       }
    //     }
    //   }
    // }
  }
}

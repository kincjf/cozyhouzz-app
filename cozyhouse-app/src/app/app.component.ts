import { Component } from '@angular/core';
import { Platform, AlertController, App } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

// Authenticator
import { Storage } from '@ionic/storage';

// Root pages to be used based on authentication
import { Menu } from '../pages/menu/menu';
import { UserService } from "../services/user-service";
@Component({
  template: `<ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>`
})
export class MyApp {
    rootPage: any;
    platform: Platform;
    jwt: string;
    logined: boolean;
    alertController:AlertController;
    app:App;

    constructor(
    platform: Platform,
    private events: Events,
    private App:App,
    private storage: Storage,
    private userService:UserService,
    private AlertController:AlertController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.platform = platform;
      this.alertController = AlertController;
      this.app = App;

      let user = this.storage.get("id_token").then(jwt => {
        if(jwt) {
          console.log("스토리지에 저장된 데이터 있음");
          this.userService.setUserInfo(jwt);
        }
      });
      this.rootPage = Menu; //로그인 할꺼면 LoginPage, 안할꺼면 Menu 로 바로...
      this.registerBackButtonListener();
      /*
      storage.get('roomSettingInformation').then((val) => {
        if(val) {
           console.log("데이터가 있습니다.");
           console.log(val);
        } else {
           let roomSettingInformation = {
              "deposit": {
                  "upper": this.roomSettingRange.deposit.upper,
                  "lower": this.roomSettingRange.deposit.lower
              },
              "monthly": {
                  "upper": this.roomSettingRange.monthly.upper,
                  "lower": this.roomSettingRange.monthly.lower
              },
             "isCharter" : false,
             "isOneRoomOpen" : true,
             "isOneRoomDuplex" : true,
             "isOneRoomSeperation" : true,
             "isTwoRoom" : true,
             "isThreeRoom" : true
           };
          storage.set('roomSettingInformation', roomSettingInformation);

        }
      });
      */
      /*
      platform.registerBackButtonAction(function () {
        if(this.menu.isOpen())
        {
          this.menu.close();
        }
        else
        {
          this.nav.pop();
        }

      }, 100);
      */


      // Available events for Authentication
      this.events.subscribe('user:login', user => {
        console.info("This was trigger by the user:login event.");
      });

      this.events.subscribe('user:create', user => {
        console.info("This was trigger by the user:create event.");
      });

      this.events.subscribe('user:resetPassword', user => {
        console.info("This was trigger by the user:resetPassword event.");
      });
    });

  }
    registerBackButtonListener() {
        document.addEventListener('backbutton', () => {
            /*var nav = this.app.getRootNav();
            if (nav.canGoBack()) {
                nav.pop();
            }
            else {
                let confirm = this.alertController.create({
                    title: 'Confirm Exit',
                    message: 'Really exit app?',
                    buttons: [
                        {
                            text: 'Cancel',
                            handler: () => {
                                console.log('Disagree clicked');
                            }
                        },
                        {
                            text: 'Exit',
                            handler: () => {

                            }
                        }
                    ]
                });
            }*/
        });
    }
    setHeaderUserMenu() {
        this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
        if (this.jwt) {
            this.logined = true;
        } else {
            this.logined = false;
        }
    }
    confirmExitApp(nav) {
        /*
        let confirm = this.alertController.create({
            title: 'Confirm Exit',
            message: 'Really exit app?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Exit',
                    handler: () => {
                        navigator.app.exitApp();
                    }
                }
            ]
        });
        nav.present(confirm);
        */
    }
    getNav() {
        /*
        return this.app.getComponent('nav');
        */
    }

}

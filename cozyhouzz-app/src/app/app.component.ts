import {Component} from '@angular/core';
import {Platform, AlertController, App} from 'ionic-angular';
import {Events} from 'ionic-angular';
import {StatusBar, Keyboard} from 'ionic-native';
import {TabsPage} from '../pages/tabs/tabs';
import * as firebase from 'firebase';

// Authenticator
import {Storage} from '@ionic/storage';
import {LoginPage} from '../pages/authentication/login/login';
import {RegistrationPage} from '../pages/authentication/registration/registration';

// Root pages to be used based on authentication
import {Menu} from '../pages/menu/menu';
import {UserService} from "../services/user-service";
import * as moment from 'moment';
@Component({
  template: `<ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>`
})
export class AppComponent {
  rootPage: any;
  platform: Platform;
  jwt: string;
  logined: boolean;

  constructor(platform: Platform,
              private events: Events,
              private app: App,
              private storage: Storage,
              private userService: UserService,
              private alertController: AlertController) {
    var config = {
      apiKey: "AIzaSyBERdRJbsk-p6pSX8Ohx6Jftevr3Fkp9bU",
      authDomain: "cozyhouzz-app.firebaseapp.com",
      databaseURL: "https://cozyhouzz-app.firebaseio.com",
      storageBucket: "cozyhouzz-app.appspot.com",
      messagingSenderId: "680149394878"
    };
    firebase.initializeApp(config);

    moment.locale('en', {
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "%d sec",
        m: "a min",
        mm: "%d min",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      }
    });

    platform.ready().then(() => {
      StatusBar.styleDefault();

      /*
       * 앱이 처음 실행되는 부분으로 로그인 정보가 있는지 확인.
       * storage에 id_token을 key로 하는 데이터가 있으면 로그인 상태임을 의미.
       * userService의 setUserInfo함수를 통해서
       * 로그인 정보를 세팅한다.
       * */
      let user = this.storage.get("id_token").then(jwt => {
        if (jwt) {
          console.log("스토리지에 저장된 데이터 있음");
          this.userService.setUserInfo(jwt);
        }
      });
      Keyboard.disableScroll(true);

      this.rootPage = Menu; //TabsPage //Menu
      this.registerBackButtonListener();
    });

  }

  /*
   * 솔직히 안드로이드 back Button 처리하려고 한건데..
   * 아무것도 안적으니까 되게 잘됨.
   * 특별히 아는 지식이 없다면 건드리지 말 것...ㅋㅋ
   * */
  registerBackButtonListener() {
    document.addEventListener('backbutton', () => {

       /* let confirm = this.alertController.create({
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
        });*/
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

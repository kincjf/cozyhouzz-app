import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

// Authenticator
import { AuthenticatorService } from '../providers/authenticator';
import { Storage } from '@ionic/storage';

// Root pages to be used based on authentication
import { Menu } from '../pages/menu/menu';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/authentication/login/login';
import { STATIC_VALUE } from "./common/config/staticValue";
import { UserService } from "../services/user-service";
import { User } from '../providers/user';
import { RoomService } from "../services/room-service";
import { Room } from '../providers/room';
@Component({
  template: `<ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>`,
  providers: [AuthenticatorService]
})
export class MyApp {
  rootPage: any;
  platform: Platform;
  roomSettingRange = STATIC_VALUE.ROOM_SETTING_RANGE;
  constructor(
    platform: Platform,
    private events: Events,
    private storage: Storage,
    private userService:UserService,
    private roomService:RoomService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.platform = platform;


      let user = this.storage.get("user").then(val => {
        if(val) {
          console.log("스토리지에 저장된 데이터 있음");
          this.userService.setUserInfo(new User(val));
        }
      });
      this.rootPage = Menu; //로그인 할꺼면 LoginPage, 안할꺼면 Menu 로 바로...

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
}

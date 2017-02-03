"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var firebase = require('firebase');
// Root pages to be used based on authentication
var menu_1 = require('../pages/menu/menu');
var moment = require('moment');
var AppComponent = (function () {
    function AppComponent(platform, storage, userService) {
        var _this = this;
        this.storage = storage;
        this.userService = userService;
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
        platform.ready().then(function () {
            ionic_native_1.StatusBar.styleDefault();
            /*
             * 앱이 처음 실행되는 부분으로 로그인 정보가 있는지 확인.
             * storage에 id_token을 key로 하는 데이터가 있으면 로그인 상태임을 의미.
             * userService의 setUserInfo함수를 통해서
             * 로그인 정보를 세팅한다.
             * */
            var user = _this.storage.get("id_token").then(function (jwt) {
                if (jwt) {
                    console.log("스토리지에 저장된 데이터 있음");
                    _this.userService.setUserInfo(jwt);
                }
            });
            ionic_native_1.Keyboard.disableScroll(true);
            _this.rootPage = menu_1.Menu; //TabsPage //Menu
            _this.registerBackButtonListener();
        });
    }
    /*
     * 솔직히 안드로이드 back Button 처리하려고 한건데..
     * 아무것도 안적으니까 되게 잘됨.
     * 특별히 아는 지식이 없다면 건드리지 말 것...ㅋㅋ
     * */
    AppComponent.prototype.registerBackButtonListener = function () {
        document.addEventListener('backbutton', function () {
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
    };
    AppComponent.prototype.setHeaderUserMenu = function () {
        this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
        if (this.jwt) {
            this.logined = true;
        }
        else {
            this.logined = false;
        }
    };
    AppComponent.prototype.confirmExitApp = function (nav) {
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
    };
    AppComponent.prototype.getNav = function () {
        /*
         return this.app.getComponent('nav');
         */
    };
    AppComponent = __decorate([
        core_1.Component({
            template: "<ion-nav [root]=\"rootPage\" swipeBackEnabled=\"false\"></ion-nav>"
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

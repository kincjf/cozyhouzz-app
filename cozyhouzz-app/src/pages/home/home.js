"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var HomePage = (function () {
    function HomePage(nav, menu) {
        this.nav = nav;
        this.menu = menu;
    }
    /**
     *
     * @param index 0, 1, 2에 따라 전주, 익산, 군산으로 나뉨.
     * 해당 페이지로 이동하는 함수
     */
    //this.navCtrl.parent.select(2);
    HomePage.prototype.region_button_click = function (index) {
        this.nav.parent.select(1);
        /*
        switch(index) {
          case 0: this.nav.push(RoomListPage, {region:"전주"}); break;
          case 1: this.nav.push(RoomListPage, {region:"익산"}); break;
          default: this.nav.push(RoomListPage, {region:"군산"});
        }*/
    };
    /**
    * 다른 페이지에서 사이드메뉴를 허용하지 않기 위해서
    * home을 떠날 때 menu를 사용하지 못하도록 해준다.
    * 만약 menu를 사용하고 싶은 페이지가 있다면
    * 해당 페이지의 생성자 부분에서 enable을 true로 설정해준다. */
    HomePage.prototype.ionViewWillLeave = function () {
    };
    /**
    * 다시 home 페이지로 돌아올 경우, 메뉴를 사용할 수 있도록
    * enable을 true로 설정.
    * */
    HomePage.prototype.ionViewDidEnter = function () {
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;

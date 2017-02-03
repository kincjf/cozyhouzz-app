"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/*
* 1) 현재 탭으로 재구성했기 때문에 페이지가 나갈때가 아니라......
* 2) 설정 변경 될 때마다 저장하는 걸로 변경해야 할 것 같음.
* */
/*
 Generated class for the Setting page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var RoomSettingPage = (function () {
    function RoomSettingPage(navCtrl, events, storage, roomService) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.storage = storage;
        this.roomService = roomService;
        /*
        * 처음 페이지 생성될 때 방정보를 가져온다.
        * */
        this.loadroomInformation();
    }
    RoomSettingPage.prototype.ionViewWillEnter = function () {
        /*
        * 페이지를 다시 접속할 때마다
        * 데이터를 가져온다.
        * 정보가 바뀌었을 수도 있으므로..
        * */
        this.loadroomInformation();
    };
    /**
     * 저장하는 방식과 range 에서 사용하는 방식이 달라서
     * 해당 형식에 맞게 값을 넣어주는 함수.
     *
     * range는 특정 변수의 멤버변수인 lower, upper을 사용한다.
     * 그렇기 때문에 해당 형식에 맞게 넣어줘야 함.
     */
    RoomSettingPage.prototype.loadroomInformation = function () {
        this.room = this.roomService.room;
        this.deposit = {
            lower: this.room.deposit_lower,
            upper: this.room.deposit_upper
        };
        this.monthly = {
            lower: this.room.monthly_lower,
            upper: this.room.monthly_upper
        };
        console.log(this.deposit);
    };
    RoomSettingPage.prototype.ionViewDidLoad = function () {
        console.log('Hello SettingPage Page');
    };
    RoomSettingPage.prototype.ionViewWillLeave = function () {
        /*
        * 방 검색 조건 페이지를 벗어날 때 발생하는 이벤트.
        * 현재 데이터들을 storage에 저장해야 한다.
        * 그리고 방 검색 조건이 바뀌었음을 알리는 이벤트를 발생시킨다.
        * 해당 이벤트는 roomInfoList 부분에서 처리하도록 구현해놓았다. */
        this.storage.set('roomSettingInformation', this.room);
        this.events.publish('room:change', '');
    };
    /**
    * change_monthly() 함수와  change_deposit() 함수는
    * range 의 값이 바뀌었을 때 호출되는 함수.
    * */
    RoomSettingPage.prototype.change_monthly = function () {
        this.room.monthly_lower = this.monthly.lower;
        this.room.monthly_upper = this.monthly.upper;
    };
    /**
     * change_monthly() 함수와  change_deposit() 함수는
     * range 의 값이 바뀌었을 때 호출되는 함수.
     * */
    RoomSettingPage.prototype.change_deposit = function () {
        this.room.deposit_lower = this.deposit.lower;
        this.room.deposit_upper = this.deposit.upper;
    };
    RoomSettingPage = __decorate([
        core_1.Component({
            selector: 'page-setting',
            templateUrl: 'room-setting.html'
        })
    ], RoomSettingPage);
    return RoomSettingPage;
}());
exports.RoomSettingPage = RoomSettingPage;

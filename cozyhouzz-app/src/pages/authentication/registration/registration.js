"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var registration_1 = require('./general-user/registration');
var registration_2 = require('./buisnessman-user/registration');
var RegistrationPage = (function () {
    function RegistrationPage(navCtrl, menu) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.delimiter = 0; // delimiter 1이면 사업자, 0이면 기본 유저
        this.menu.close();
    }
    /**
     *
     * @param delimiter 구분자
     * 일반사용자 회원가입을 할 것인가,
     * 사업주 사용자 회원가입을 할 것인가는 delimiter을 가지고 구분함.
     *
     * selectRegistrationType(0) -> 일반 사용자
     * selectRegistrationType(1) -> 사업주 사용자
     * 아래 if문에서 서로 다른 페이지를 push해주면 됨.
     * */
    RegistrationPage.prototype.selectRegistrationType = function (delimiter) {
        if (delimiter == 0) {
            this.navCtrl.push(registration_1.GeneralRegistrationPage);
        }
        else {
            this.navCtrl.push(registration_2.BussinessManRegistrationPage);
        }
    };
    RegistrationPage = __decorate([
        core_1.Component({
            selector: 'page-registration',
            templateUrl: 'registration.html'
        })
    ], RegistrationPage);
    return RegistrationPage;
}());
exports.RegistrationPage = RegistrationPage;

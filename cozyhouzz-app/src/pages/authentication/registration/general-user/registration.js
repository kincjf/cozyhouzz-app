"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
/*
 Generated class for the Registration page.
 */
var GeneralRegistrationPage = (function () {
    function GeneralRegistrationPage(navCtrl, formBuilder, loader, alertCtrl, menu, userService) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loader = loader;
        this.alertCtrl = alertCtrl;
        this.menu = menu;
        this.userService = userService;
        this.delimiter = 0; // delimiter 1이면 사업자, 0이면 기본 유저
        this.menu.close();
    }
    GeneralRegistrationPage.prototype.ionViewWillLoad = function () {
        // Validate user registration form
        this.user = this.formBuilder.group({
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6)])],
            passwordConfirmation: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6)])]
        });
    };
    // Create user using form builder controls
    GeneralRegistrationPage.prototype.createUser = function () {
        var _this = this;
        var email = this.user.controls.email.value;
        var password = this.user.controls.password.value;
        var passwordConfirmation = this.user.controls.passwordConfirmation.value;
        if (password != passwordConfirmation) {
            this.alertCtrl.create({
                title: 'Error',
                message: '비밀번호가 일치하지 않습니다.',
                buttons: [{ text: 'Ok' }]
            }).present();
            return 0;
        }
        var url = 'http://npus.kr:3000/api/register';
        var user = {
            email: email,
            password: password,
            member_type: 'PUBLIC'
        };
        /*
         * 회원가입 요청하는 부분.
         * userService의 createUser 함수가 담당하고 있음.
         * 회원가입이 완료되면 바로 로그인 수행함.
         * */
        this.loader.show("회원 가입 중입니다.");
        this.userService.createUser(url, user).subscribe(function (response) {
            _this.userService.setUserInfo(response.id_token);
            _this.loader.hide();
            _this.navCtrl.parent.select(3);
        }, function (error) {
            _this.loader.hide();
            /*
            console.log(error);
             console.log(JSON.parse(error._body).errorMsg);
             */
            var errorMsg = JSON.parse(error._body).errorMsg;
            _this.alertCtrl.create({
                title: 'Error',
                message: errorMsg,
                buttons: [{ text: 'Ok' }]
            }).present();
        });
    };
    GeneralRegistrationPage = __decorate([
        core_1.Component({
            selector: 'page-registration',
            templateUrl: 'registration.html'
        })
    ], GeneralRegistrationPage);
    return GeneralRegistrationPage;
}());
exports.GeneralRegistrationPage = GeneralRegistrationPage;

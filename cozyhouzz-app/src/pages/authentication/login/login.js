"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var registration_1 = require('../registration/general-user/registration');
var config_1 = require('../../../app/common/config');
/*
* 1) 새로 만드는 서버에서 로그인 시 토근을 보내주지 않아 설정하지 못함. common/comfing/index.ts 부분에 가서 url 수정해줘야 함.
* 2) 로그인 실패 이유와 관련되서 사용자들에게 정보 뿌려줘야 함.
* */
var LoginPage = (function () {
    function LoginPage(navCtrl, formBuilder, alertCtrl, menu, userService) {
        /*
         * 로그인 페이지로 이동하기 때문에 사이드 메뉴를 닫는다.
         * 또한 메인페이지와 RoomListPage를 제외한 나머지 페이지에서는 사이드 메뉴를 허용하지 않기 때문에
         * menu의 enable을 false로 설정해준다. */
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.menu = menu;
        this.userService = userService;
    }
    LoginPage.prototype.ionViewWillLoad = function () {
        this.userFormBuilder = this.formBuilder.group({
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    /**
     * formBuilder 따로 설명 필요 없음. login.html 부분 보면 됨.
     * */
    LoginPage.prototype.ionViewDidLoad = function () {
    };
    /**
     * 사용자가 로그인 버튼을 클릭했을 때 호출되는 함수.
     * eamil과 password를 가져오고 이를 통해 서버와 통신한다.
     * */
    LoginPage.prototype.login = function () {
        var _this = this;
        var email = this.userFormBuilder.controls.email.value, password = this.userFormBuilder.controls.password.value;
        var title = '';
        /*
         * service/user-service.ts 부분에 함수가 작성되어 있음.
         * url를 보내면 userService는 해당 url에 같이 보낸 파라미터를 가지고 request를 하고
         * 해당 request의 response 를 반환한다.
         * 이후 .toPromise()를 통해 해당 데이터를 조회.
         * */
        var URL = [config_1.config.serverHost, config_1.config.path.login].join('/'); //"http://api.cozyhouzz.co.kr/api/auth/login"
        var user = this.userService.login(URL, {
            email: email,
            password: password
        }).subscribe(function (response) {
            /*
            * 로그인이 되었을 경우 데이터가 존재한다.
            * 1) id_token을 storage에 저장한다.
            * 2) userService에 해당 유저 정보를 저장한다. userService에서 해당 토큰을 decode하고 해당 정보를 가지고 있는다.
            * 3) 로그인이 완료되었으므로 원래 페이지로 돌아가야 함. pop()
            * */
            /*
            {
               id_token: "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
               eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.
               TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
               user: { "idx":1,
                  "email":"pastelbook89@gmail.com",
                  "password":"$2a$05$Ak0Z3z7ntwuAAGwr75XoiO2aYO.d1CRbkT37tOYamWXtflgk4TPO6",
                  "memberType":1,"iat":1471445433
               },
               statusCode: 1
             }
             */
            _this.userService.setUserInfo(response.id_token);
            _this.navCtrl.pop();
        }, function (err) {
            /*
            * 로그인이 제대로 되지 않은 경우.
            * 400대 status code가 오므로 err부분에서 처리해줘야함..
            * 서버에서 그리 구현하였음.
            * */
            /*
            * - HTTP Response Code : 201(로그인 성공)
            * { id_token: JWT 인증 토큰(String), statusCode: 1 }
            * - HTTP Response Code : 400(로그인 실패 - 입력정보 누락)
            * { errorMsg: 에러 메시지(String), statusCode: -1 }
            * - HTTP Response Code : 401(로그인 실패 - 회원정보 없음)
            * { errorMsg: 에러 메시지(String), statusCode: 0 }
            *  - HTTP Response Code : 401(로그인 실패 - 패스워드 틀림)
            * { errorMsg: 에러 메시지(String), statusCode: 2 }
            * - HTTP Response Code : 500(DB 에러)
            * { errorMsg: 에러 메시지(String), statusCode: 9 }
            * */
            console.log(err);
            switch (err.status) {
                case 400:
                    title = '입력 정보 누락';
                    break;
                case 401:
                    title = '회원 정보 없음';
                    break;
                case 500:
                    title = '패스워드 틀림';
                    break;
                default: title = '기타';
            }
            _this.alertCtrl.create({
                title: 'Error',
                message: 'Failed to login ' + title,
                buttons: [{ text: 'Ok' }]
            }).present();
        });
    };
    /**
     * 회원가입 버튼을 누르면 해당 페이지로 이동해주는 함수.
     * 현재 로그인 페이지에서 회원가입 버튼 없애버림.
     */
    LoginPage.prototype.signUp = function () {
        this.navCtrl.push(registration_1.GeneralRegistrationPage);
    };
    LoginPage.prototype.resetPassword = function () {
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;

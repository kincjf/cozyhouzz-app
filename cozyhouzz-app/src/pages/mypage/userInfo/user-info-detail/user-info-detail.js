"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var headers_1 = require('../../../../app/common/headers');
/*
 Generated class for the UserInfoDetail page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var UserInfoDetailPage = (function () {
    function UserInfoDetailPage(navCtrl, menu, userService, formBuilder, alertCtrl, loader, events) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loader = loader;
        this.events = events;
        this.userDetails = null;
        this.isLogined = false;
        this.bussinessUserFormBuilder = this.formBuilder.group({
            email: ['', forms_1.Validators.required],
            display_name: ['', null],
            /* businessName: ['', Validators.required],
             businessAddress: ['', Validators.required],
       */ telephone: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            new_password: ['', null]
        });
        this.userFormBuilder = this.formBuilder.group({
            email: ['', forms_1.Validators.required],
            display_name: ['', null],
            telephone: ['', null],
            password: ['', forms_1.Validators.required],
            new_password: ['', null]
        });
    }
    UserInfoDetailPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.isLogined = this.userService.getIsLogind();
        if (this.isLogined) {
            this.user = this.userService.getUserInfo();
            headers_1.contentHeaders.set('Authorization', this.userService.getJwtToken()); //Header에 jwt값 추가하기
            /*
             * memberType에 따라서 입력해야 하는 것들이 달라짐.
             * ionViewDidLoad에서 처리하면 이미 늦음.
             * 반드시 생성자에서 처리해주어야 함.
             *
             * user.memberType에 따라서 나중에 request할때 파라미터도 달라져야 함.
             * */
            console.log(this.userService.getJwtToken());
            this.userDetails = this.user;
            this.userService.getUserDetailInfo(this.user, headers_1.contentHeaders).toPromise()
                .then(function (response) {
                //this.userDetails = response.user_info[0];
                console.log(_this.userDetails);
            }, function (error) {
                console.log(error);
            });
        }
    };
    /**
     * 정보 수정 버튼을 클릭했을 경우 수행되는 함수.
     * 수정 페이지로 이동하도록 함.
     *
     * 아마도 여기서 정보다 보내줘야 할 듯. 두번 리퀘스트 할 수는 없으니까..
     */
    UserInfoDetailPage.prototype.userInfoModify = function () {
    };
    /**
     * 로그아웃 버튼을 클릭했을 경우.
     * userService.logout() 함수를 호출하고
     * 페이지를 pop()한다.
     */
    UserInfoDetailPage.prototype.logout = function () {
        this.userService.logout();
        this.navCtrl.pop();
    };
    UserInfoDetailPage.prototype.updateUserSettings = function () {
        var _this = this;
        this.loader.show("정보를 수정하고 있습니다.");
        var member_type = this.user.member_type;
        var display_name = this.userFormBuilder.value.display_name;
        var telephone = this.userFormBuilder.value.telephone;
        var email = this.userFormBuilder.value.email;
        var password = this.userFormBuilder.value.password;
        var new_password = this.userFormBuilder.value.new_password;
        var user_info = {};
        console.log(user_info);
        if (member_type == 'PUBLIC') {
            user_info = {
                display_name: display_name,
                email: email,
                password: password,
                telephone: telephone,
                member_type: 'PUBLIC',
                new_password: new_password
            };
        }
        else if ('BUSINESS') {
            user_info = {
                display_name: display_name,
                email: email,
                password: password,
                telephone: telephone,
                member_type: 'BUSINESS',
                new_password: new_password
            };
        }
        this.userService.modifyUserDetailInfo(user_info, headers_1.contentHeaders).toPromise()
            .then(function (response) {
            //this.userDetails = response.user_info[0];
            console.log(response);
            var statusCode = response.statusCode;
            if (statusCode == 1) {
                _this.loader.hide();
                _this.userService.removeUserInfo();
                _this.userService.setUserInfo(response.id_token);
                _this.navCtrl.pop();
            }
        }, function (error) {
            _this.loader.hide();
            var status = error.status;
            if (status == 401) {
                _this.alertCtrl.create({
                    title: 'Error',
                    message: '이전 비밀번호가<br>일치하지 않습니다.',
                    buttons: [{ text: 'Ok' }]
                }).present();
            }
        });
    };
    UserInfoDetailPage = __decorate([
        core_1.Component({
            selector: 'page-user-info-detail',
            templateUrl: 'user-info-detail.html'
        })
    ], UserInfoDetailPage);
    return UserInfoDetailPage;
}());
exports.UserInfoDetailPage = UserInfoDetailPage;

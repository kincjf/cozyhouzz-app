"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var zip_code_1 = require('../../function/zip-code/zip-code');
var ionic_native_1 = require('ionic-native');
var is_cordova_available_1 = require('../../../services/is-cordova-available');
var RoomInputPage = (function () {
    function RoomInputPage(navCtrl, events, formBuilder) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.events = events;
        this.formBuilder = formBuilder;
        this.options = {};
        /*
         * getImagePicture(?) 에서 사용한다.
         * 나중에 options 필요하면 적절하게 넣으면 됨.
         * */
        this.options = {};
        /*
         * 사용자가 zip-code page에서 주소를 선택했을 때 발생하는 이벤트를 처리하는 리스너
         * address에는 사용자가 입력한 주소의 우편번호와 지번 주소가 담겨있다.
         * 이를 현재 페이지 클래스(RoomInputPage)의 formBilder인 post의 address에 값을 가공하여 넣어준다.
         * post:any의 address에 값을 넣어주는 부분.
         * 당연히 이벤트는 page/function/zip-code/zip-code.ts 에서 발생한다. */
        events.subscribe('address:choiced', function (address) {
            _this.post.patchValue({
                address: address.zipNo + ' - ' + address.jibunAddr
            });
        });
    }
    RoomInputPage.prototype.ionViewWillLoad = function () {
        // Validate user registration form
        this.post = this.formBuilder.group({
            title: ['', forms_1.Validators.required],
            content: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required],
            zip_code: ['', forms_1.Validators.required]
        });
    };
    /**
     * 우편번호 찾는 페이지로 이동하는 부분
     * */
    RoomInputPage.prototype.addressInputClick = function () {
        this.navCtrl.push(zip_code_1.ZipCodePage);
    };
    /**
     * 현재 테스트 중으로 imagePicker을 이용하는 부분.
     * 이또한 native 기능으로써 isCordovaAvailable함수를 통해서
     * 핸드폰인지 아닌지 확인한다. */
    RoomInputPage.prototype.test = function () {
        if (!is_cordova_available_1.isCordovaAvailable()) {
            return false;
        }
        ionic_native_1.ImagePicker.getPictures(this.options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, function (err) {
        });
    };
    RoomInputPage = __decorate([
        core_1.Component({
            selector: 'page-build-case-input',
            templateUrl: 'room-input.html'
        })
    ], RoomInputPage);
    return RoomInputPage;
}());
exports.RoomInputPage = RoomInputPage;

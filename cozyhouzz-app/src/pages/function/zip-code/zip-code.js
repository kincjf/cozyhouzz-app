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
 Generated class for the ZipCode page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var ZipCodePage = (function () {
    function ZipCodePage(navCtrl, menu, zipcode, alertCtrl, formBuilder, events, loader) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.zipcode = zipcode;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.events = events;
        this.loader = loader;
        this.juso_list = null;
        this.countPerPage = 10;
        this.addButton = false;
    }
    ZipCodePage.prototype.ionViewWillLoad = function () {
        // Validate user registration form
        this.zip_code = this.formBuilder.group({
            juso: ['', forms_1.Validators.required]
        });
    };
    /**
     * 사용자가 주소를 입력했을 경우, 해당 주소를 파라미터로 하는 api를 호출하는 부분.
     */
    ZipCodePage.prototype.getAddressList = function () {
        var _this = this;
        this.loader.show("정보를 불러오고 있습니다.");
        this.current_page = 1;
        this.countPerPage = 10;
        this.addButton = false;
        if (this.zip_code.controls.juso.value.length > 0) {
            this.zipcode.getAddressList(this.current_page, this.countPerPage, this.zip_code.controls.juso.value).toPromise()
                .then(function (response) {
                _this.juso_list = response.results.juso;
                if (response.results.errorCode != "0") {
                }
                if (_this.juso_list.length >= 10) {
                    _this.addButton = true;
                }
                _this.loader.hide();
            }, function (err) {
                _this.loader.hide();
                _this.alertCtrl.create({
                    title: 'Error',
                    message: 'Failed to login ' + err,
                    buttons: [{ text: 'Ok' }]
                }).present();
            });
        }
    };
    /**
     *
     * @param infiniteScroll infiniteScroll 객체
     * 사용자가 입력한 주소로 하여금 주소의 리스트를 추가로 받아오는 부분.
     */
    ZipCodePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log("doInfinite");
        if (this.juso_list != null) {
            this.current_page += 1;
            this.zipcode.getAddressList(this.current_page, this.countPerPage, this.zip_code.controls.juso.value).toPromise()
                .then(function (response) {
                if (response.results.juso.length == 0) {
                    _this.addButton = false;
                    infiniteScroll.enable(false);
                }
                for (var v in response.results.juso)
                    _this.juso_list.push(response.results.juso[v]);
                infiniteScroll.complete();
            }, function (err) {
                _this.alertCtrl.create({
                    title: 'Error',
                    message: 'Failed to get address list ' + err,
                    buttons: [{ text: 'Ok' }]
                }).present();
                infiniteScroll.enable(false);
                infiniteScroll.complete();
            });
        }
    };
    /**
     *
     * @param p 사용자가 선택한 주소의 정보를 담고 있다.
     * 이때 주소가 바뀌었으므로 주소가 선택되었다는 이벤트를 발생시킨다.
     *
     * 이는 RoomInputPage에서 처리하도록 구현되어 있다.
     * 또한 페이지를 pop 시킨다.
     */
    ZipCodePage.prototype.selectAddress = function (p) {
        this.events.publish('address:choiced', p);
        this.navCtrl.pop(p);
    };
    ZipCodePage = __decorate([
        core_1.Component({
            selector: 'page-zip-code',
            templateUrl: 'zip-code.html'
        })
    ], ZipCodePage);
    return ZipCodePage;
}());
exports.ZipCodePage = ZipCodePage;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
/*
* 우편번호 관련 API를 호출하는 부분.
* */
var ZipCodeService = (function () {
    function ZipCodeService(http, storage, events, platform) {
        this.http = http;
        this.storage = storage;
        this.events = events;
        this.platform = platform;
    }
    ZipCodeService.prototype.getAddressList = function (current_page, countPerPage, keyword) {
        console.log("getAddressList()");
        var url = '/api';
        if (this.platform.is('cordova')) {
            url = 'http://npus.kr:4000';
        }
        console.log(url);
        ///api and ip
        return this.http.post(url, {
            current_page: current_page,
            keyword: keyword,
            countPerPage: countPerPage
        }, {})
            .map(function (x) {
            return JSON.parse(x.json());
        });
    };
    ZipCodeService = __decorate([
        core_1.Injectable()
    ], ZipCodeService);
    return ZipCodeService;
}());
exports.ZipCodeService = ZipCodeService;

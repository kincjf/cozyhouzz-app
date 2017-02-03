"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/*
  Generated class for the ConsultingList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ConsultingListPage = (function () {
    function ConsultingListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ConsultingListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConsultingListPage');
    };
    ConsultingListPage = __decorate([
        core_1.Component({
            selector: 'page-consulting-list',
            templateUrl: 'consulting-list.html'
        })
    ], ConsultingListPage);
    return ConsultingListPage;
}());
exports.ConsultingListPage = ConsultingListPage;

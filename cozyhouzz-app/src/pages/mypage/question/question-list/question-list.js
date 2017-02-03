"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var firebase = require('firebase');
var question_detail_1 = require('../question-detail/question-detail');
var md5_1 = require("ts-md5/dist/md5");
var QuestionListPage = (function () {
    function QuestionListPage(navCtrl, loader, GlobalVars, params, userService) {
        this.navCtrl = navCtrl;
        this.loader = loader;
        this.GlobalVars = GlobalVars;
        this.params = params;
        this.userService = userService;
        this.isLogined = false;
        loader.show("1:1 대화 목록을 불러오고 있습니다.");
        this.recentChats = [];
        var testing = this.recentChats;
        this.isLogined = userService.getIsLogind();
        if (this.isLogined) {
            this.user = userService.getUserInfo();
            this.user_delimiter = md5_1.Md5.hashStr(this.user.email);
            this._chats = firebase.database().ref('chats');
            this._lastChats = firebase.database().ref('lastchat');
            this._lastChats.child(this.user_delimiter).once('value').then(function (data) {
                var tempArray = data.val();
                for (var temp in tempArray) {
                    if (tempArray[temp].chatId == null || tempArray[temp].chatId == undefined) {
                    }
                    else {
                        testing.push(tempArray[temp]);
                    }
                    console.log(tempArray[temp]);
                }
                loader.hide();
                //console.log(tempArray);
                //this.recentChats.push(tempArray);
            });
        }
    }
    QuestionListPage.prototype.chatSelect = function (receiver) {
        var user = {
            userData: this.user.email,
            md5UserData: md5_1.Md5.hashStr(this.user.email),
            toUserData: receiver,
            toMd5UserData: md5_1.Md5.hashStr(receiver)
        };
        this.navCtrl.push(question_detail_1.QuestionDetailPage, {
            user: user
        });
    };
    QuestionListPage = __decorate([
        core_1.Component({
            selector: 'page-question-list',
            templateUrl: 'question-list.html'
        })
    ], QuestionListPage);
    return QuestionListPage;
}());
exports.QuestionListPage = QuestionListPage;

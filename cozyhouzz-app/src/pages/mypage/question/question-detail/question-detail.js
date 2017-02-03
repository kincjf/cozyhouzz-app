"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var firebase = require('firebase');
var ionic_native_1 = require('ionic-native');
/*
 Generated class for the Chatting page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var QuestionDetailPage = (function () {
    function QuestionDetailPage(navCtrl, params, zone, loader, GlobalVars, actionSheetCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.zone = zone;
        this.loader = loader;
        this.GlobalVars = GlobalVars;
        this.actionSheetCtrl = actionSheetCtrl;
        this.msecond = 0;
        this.user = this.params.get('user');
        this.userData = this.user.userData;
        this.toUserData = this.user.toUserData;
        this.toMd5UserData = this.user.toMd5UserData;
        this.md5UserData = this.user.md5UserData;
        this._chats = firebase.database().ref('chats');
        this._lastChats = firebase.database().ref('lastchat');
        this.messages = [];
        this.chatId = this.md5UserData;
        this.getChats();
        this._lastChats.child(this.md5UserData).child(this.toMd5UserData).child('isRead').set('1');
        setTimeout(function () {
            _this.content.scrollToBottom();
            _this.msecond = 0;
        }, 0);
    }
    QuestionDetailPage.prototype.ionViewWillEnter = function () {
    };
    QuestionDetailPage.prototype.getChats = function () {
        var _this = this;
        console.log(this.md5UserData + this.chatId);
        this._chats.child(this.md5UserData).orderByChild('chatId').equalTo(this.toMd5UserData).limitToLast(15).on('child_added', function (data) {
            _this.zone.run(function () {
                var tempArray = data.val();
                _this.messages.push(tempArray);
                setTimeout(function () {
                    _this.content.scrollToBottom();
                }, _this.msecond);
            });
        });
    };
    QuestionDetailPage.prototype.ionViewWillLeave = function () {
        console.log('Hello ChattingPage Page');
        this.GlobalVars.setToUserKey('null');
    };
    QuestionDetailPage.prototype.scrollToTop = function () {
        this.content.scrollToTop();
    };
    QuestionDetailPage.prototype.onBlur = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 0);
    };
    QuestionDetailPage.prototype.sendMessage = function (message, isType, textarea) {
        if (textarea) {
            textarea.setFocus();
        }
        var currentDate = new Date().toString();
        var messageArrayForUser = {
            senderKey: this.userData,
            receiverKey: this.toUserData,
            message: message,
            loginUserKey: this.userData,
            isType: isType,
            isRead: '0',
            dateTime: currentDate,
            chatId: this.toMd5UserData,
            realChatId: this.toUserData
        };
        var messageArrayForToUser = {
            senderKey: this.userData,
            receiverKey: this.toUserData,
            message: message,
            loginUserKey: this.userData,
            isType: isType,
            isRead: '0',
            dateTime: new Date().toString(),
            chatId: this.md5UserData,
            realChatId: this.userData
        };
        ionic_native_1.NativeAudio.play('sendmessage', function () { return console.log('uniqueId1 is done playing'); });
        console.log(messageArrayForUser);
        console.log(messageArrayForToUser);
        var resUser = this._chats.child(this.md5UserData).push(messageArrayForUser);
        if (resUser) {
            this._lastChats.child(this.md5UserData).child(this.toMd5UserData).set(messageArrayForUser);
        }
        var resToUser = this._chats.child(this.toMd5UserData).push(messageArrayForToUser);
        if (resToUser) {
            this._lastChats.child(this.toMd5UserData).child(this.md5UserData).set(messageArrayForToUser);
        }
        this.messageText = '';
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Content)
    ], QuestionDetailPage.prototype, "content", void 0);
    QuestionDetailPage = __decorate([
        core_1.Component({
            selector: 'page-question-detail',
            templateUrl: 'question-detail.html'
        })
    ], QuestionDetailPage);
    return QuestionDetailPage;
}());
exports.QuestionDetailPage = QuestionDetailPage;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var room_1 = require("../providers/room");
/*
* 이부분은 다시 짜는게 좋을 수도....
* 일부로 private로 했는데, 그리고 getter setter도 만들었었는데
* storage만 넣었다 하면 해당 getter, setter가 유지가 안됨.. ㅡㅡ
* provider/room.ts도 마찬가지.
* 코드 거지같음.
* */
var RoomService = (function () {
    function RoomService(storage, events) {
        var _this = this;
        this.storage = storage;
        this.events = events;
        this._room = new room_1.Room();
        this.storage.get('roomSettingInformation').then(function (val) {
            if (val) {
                // this._room = val as Room 이 안됨;
                // 하나하나 넣어줘야 타입 유지 됨.
                // 아마도 저장될 때 private, public , getter, setter등의 정보가 정부다 없어지는 듯.
                // 그렇기 때문에 가져온 것은 전부 public
                _this._room.deposit_max = val._deposit_max;
                _this._room.deposit_lower = val._deposit_lower;
                _this._room.filter = val._filter;
                _this._room.deposit_upper = val._deposit_upper;
                _this._room.isCharter = val._isCharter;
                _this._room.isOneRoomDuplex = val._isOneRoomDuplex;
                _this._room.isOneRoomOpen = val._isOneRoomOpen;
                _this._room.isThreeRoom = val._isThreeRoom;
                _this._room.isOneRoomSeperation = val._isOneRoomSeperation;
                _this._room.isTwoRoom = val._isTwoRoom;
                _this._room.monthly_lower = val._monthly_lower;
                _this._room.monthly_max = val._monthly_max;
                _this._room.monthly_upper = val._monthly_upper;
            }
            console.log(_this._room);
        });
    }
    Object.defineProperty(RoomService.prototype, "room", {
        get: function () {
            return this._room;
        },
        set: function (value) {
            this._room = value;
        },
        enumerable: true,
        configurable: true
    });
    RoomService = __decorate([
        core_1.Injectable()
    ], RoomService);
    return RoomService;
}());
exports.RoomService = RoomService;

"use strict";
var Room = (function () {
    function Room() {
        this._deposit_max = 10000;
        this._monthly_max = 1000;
        this._deposit_upper = this._deposit_max; //보증금 최대값
        this._deposit_lower = 0;
        this._monthly_upper = this._monthly_max; //월세 최대값
        this._monthly_lower = 0;
        this._isCharter = true;
        this._isOneRoomDuplex = true;
        this._isOneRoomOpen = true;
        this._isThreeRoom = true;
        this._isTwoRoom = true;
        this._isOneRoomSeperation = true;
        this._filter = ["1", "2", "3", "4", "5", "6"];
    }
    Object.defineProperty(Room.prototype, "filter", {
        get: function () {
            this._filter = [];
            if (this._isCharter)
                this._filter.push("1");
            if (this._isOneRoomOpen)
                this._filter.push("2");
            if (this._isOneRoomDuplex)
                this._filter.push("3");
            if (this._isOneRoomSeperation)
                this._filter.push("4");
            if (this._isTwoRoom)
                this._filter.push("5");
            if (this._isThreeRoom)
                this._filter.push("6");
            return this._filter;
        },
        set: function (value) {
            var filter_length = value.length, i = filter_length - 1;
            this._isCharter = false;
            this._isOneRoomOpen = false;
            this._isOneRoomDuplex = false;
            this._isOneRoomSeperation = false;
            this._isTwoRoom = false;
            this._isThreeRoom = false;
            for (; i >= 0; i--) {
                switch (parseInt(value[i])) {
                    case 1:
                        this._isCharter = true;
                        break;
                    case 2:
                        this._isOneRoomOpen = true;
                        break;
                    case 3:
                        this._isOneRoomDuplex = true;
                        break;
                    case 4:
                        this._isOneRoomSeperation = true;
                        break;
                    case 5:
                        this._isTwoRoom = true;
                        break;
                    case 6:
                        this._isThreeRoom = true;
                        break;
                    default: break;
                }
            }
            this._filter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "deposit_lower", {
        get: function () {
            return this._deposit_lower;
        },
        set: function (value) {
            this._deposit_lower = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "deposit_upper", {
        get: function () {
            return this._deposit_upper;
        },
        set: function (value) {
            this._deposit_upper = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "monthly_lower", {
        get: function () {
            return this._monthly_lower;
        },
        set: function (value) {
            this._monthly_lower = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "monthly_upper", {
        get: function () {
            return this._monthly_upper;
        },
        set: function (value) {
            this._monthly_upper = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "isCharter", {
        get: function () {
            return this._isCharter;
        },
        set: function (value) {
            console.log("isCharter set");
            this._isCharter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "isOneRoomOpen", {
        get: function () {
            return this._isOneRoomOpen;
        },
        set: function (value) {
            this._isOneRoomOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "isOneRoomDuplex", {
        get: function () {
            return this._isOneRoomDuplex;
        },
        set: function (value) {
            this._isOneRoomDuplex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "isOneRoomSeperation", {
        get: function () {
            return this._isOneRoomSeperation;
        },
        set: function (value) {
            this._isOneRoomSeperation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "isTwoRoom", {
        get: function () {
            return this._isTwoRoom;
        },
        set: function (value) {
            this._isTwoRoom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "isThreeRoom", {
        get: function () {
            return this._isThreeRoom;
        },
        set: function (value) {
            this._isThreeRoom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "deposit_max", {
        get: function () {
            return this._deposit_max;
        },
        set: function (value) {
            this._deposit_max = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "monthly_max", {
        get: function () {
            return this._monthly_max;
        },
        set: function (value) {
            this._monthly_max = value;
        },
        enumerable: true,
        configurable: true
    });
    return Room;
}());
exports.Room = Room;

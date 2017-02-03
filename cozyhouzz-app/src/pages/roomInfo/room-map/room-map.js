"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var is_cordova_available_1 = require('../../../services/is-cordova-available');
var RoomMapPage = (function () {
    function RoomMapPage(navCtrl, platform, params) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.params = params;
        platform.ready().then(function () {
            _this.address = params.get("address");
            if (is_cordova_available_1.isCordovaAvailable()) {
                _this.loadMap(_this.address);
            }
        });
    }
    /**
     *
     * @param address marker를 추가하기 위한 주소를 입력 받음.
     * 17.01.19 몇개의 파라미터 추가하고 업데이트 할 예정.
     * 위도, 경도, title까지 전부다 받아와야 함.
     *
     * 실제 지도를 띄우는 부분.
     */
    RoomMapPage.prototype.loadMap = function (address) {
        // make sure to create following structure in your view.html file
        // <ion-content>
        //  <div #map id="map"></div>
        // </ion-content>
        var _this = this;
        // create a new map by passing HTMLElement
        var element = document.getElementById('roomInfoMap');
        this.map = new ionic_native_1.GoogleMap(element);
        // controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // listen to MAP_READY event
        this.map.one(ionic_native_1.GoogleMapsEvent.MAP_READY).then(function () {
            console.log('Map is ready!');
            // create LatLng object
            var ionic = new ionic_native_1.GoogleMapsLatLng(35.8441820, 127.1292780);
            // create CameraPosition
            var position = {
                target: ionic,
                zoom: 16
            };
            // move the map's camera to position
            _this.map.moveCamera(position);
            // create new marker
            var markerOptions = {
                position: ionic,
                title: address
            };
            _this.map.addMarker(markerOptions)
                .then(function (marker) {
                marker.showInfoWindow();
            });
        });
    };
    RoomMapPage = __decorate([
        core_1.Component({
            selector: 'page-build-case-map',
            templateUrl: 'room-map.html'
        })
    ], RoomMapPage);
    return RoomMapPage;
}());
exports.RoomMapPage = RoomMapPage;
